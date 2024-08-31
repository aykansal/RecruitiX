import supabaseClient from "@/utils/supabase";

// Fetch Jobs
export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);
    let query = await supabase
        .from("jobs")
        .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");
    console.log(query);
    if (location) {
        query = query.eq("location", location);
    }
    if (company_id) {
        query = query.eq("company_id", company_id);
    }
    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching Jobs:", error);
        return null;
    }
    return data;
}

// Read Saved Jobs
export async function getSavedJobs(token, { alreadySaved }, savedData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        const { data, error } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("job_id", savedData.job_id);
        if (error) {
            console.error("Error fetching Saved Jobs:", error);
            return null;
        }
        return data;
    } else {
        const { data, error } = await supabase
            .from("saved_jobs")
            .insert([savedData]);
        if (error) {
            console.error("Error fetching Saved Jobs:", error);
            return null;
        }
        return data;
    }
}
