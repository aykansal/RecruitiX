import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = (supabaseAccessToken) => {
    const supabase = createClient(supabaseUrl, supabaseKey, {
        headers: {
            Authorization: `Bearer ${supabaseAccessToken}`
        },
    });
    // or

    //     const supabase = createClient(supabaseUrl, supabaseKey);
    //     if (supabaseAccessToken) {
    //         supabase.auth.setAuth(supabaseAccessToken);
    //     }
    return supabase;
};

export default supabaseClient;
