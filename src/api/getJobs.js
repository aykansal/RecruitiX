import supabaseClient from "@/utils/supabase"

export const getJobs = async (token, { location, company_id, searchQuery }) => {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from('jobs').select('*')

    if (error) {
        throw error
    }
    return data;
}