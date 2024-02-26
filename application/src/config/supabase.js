import { createClient } from "@supabase/supabase-js";

const supabaseConexion = createClient(
  "https://mynmamoycdmvyfbyrecg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bm1hbW95Y2RtdnlmYnlyZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5ODYwNzEsImV4cCI6MjAyMjU2MjA3MX0.dekTa6l-PBoyiJWpYUwYl2ahOxELCmtVgms_J8eRqAo"
);

export { supabaseConexion };