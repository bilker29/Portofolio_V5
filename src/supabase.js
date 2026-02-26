import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://znpfecdqomqvjedbqzjc.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpucGZlY2Rxb21xdmplZGJxempjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMDE5NTcsImV4cCI6MjA4NzY3Nzk1N30.Pv3oQedpVZO-2dpHTY4sysQAQHbHaRFP4AVvh5geq3g";

export const supabase = createClient(supabaseUrl, supabaseKey);