# backend/app/api/survey.py
from fastapi import APIRouter, UploadFile, File
from fastapi import Body
from app.core import pdf_parser

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    """Extract questions from uploaded PDF."""
    questions = pdf_parser.extract_questions(await file.read())
    return {"questions": questions}

@router.post("/manual")
async def manual_questions(payload: dict = Body(...)):
    """
    Accept manual survey questions as JSON input.
    Input: {"questions": ["Q1", "Q2", "Q3"]}
    Output: {"questions": ["Q1", "Q2", "Q3"]}
    """
    questions = payload.get("questions", [])
    return {"questions": questions}
