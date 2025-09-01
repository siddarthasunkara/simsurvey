# backend/app/db.py
from supabase import create_client
import os

# Load your Supabase credentials (better to use environment variables)
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://apaqtejbwdtwuhpujzfm.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwYXF0ZWpid2R0d3VocHVqemZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI1NDYyMywiZXhwIjoyMDcwODMwNjIzfQ.tUSkL7Gf9PHVNMFBL8jbfHtnhCHCoqLzsPB2srmq3lE")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
