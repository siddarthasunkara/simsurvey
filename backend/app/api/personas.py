# backend/app/api/personas.py
'''from fastapi import APIRouter, HTTPException
from app.db import supabase

router = APIRouter()

@router.get("/personas")
async def get_personas():
    try:
        response = supabase.table("personas").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
'''

import csv
from fastapi import APIRouter

router = APIRouter()

@router.get("/personas")
def get_personas():
    personas = []
    with open("backend/data/personas.csv", newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            personas.append(row)
    return {"personas": personas}
