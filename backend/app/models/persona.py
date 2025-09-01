from pydantic import BaseModel
from typing import Dict, Any

class Persona(BaseModel):
    id: str                # uuid from Supabase
    name: str
    description: str
    traits: Dict[str, Any] # JSONB column from Supabase
