# backend/app/core/pdf_parser.py
import re
import fitz  # PyMuPDF

def extract_questions(file_bytes: bytes) -> list[str]:
    """
    Extracts survey-style questions from a PDF file.
    Returns a list of questions.
    """
    questions = []

    # Open PDF from memory
    doc = fitz.open(stream=file_bytes, filetype="pdf")

    for page in doc:
        text = page.get_text("text")
        # Split by lines
        for line in text.splitlines():
            line = line.strip()
            # Match lines starting with number or question word
            if re.match(r"^\d+[\.\)]\s+.+", line) or re.match(r"^(How|What|Why|Would|Do|Did|Are|Is|Can)", line, re.I):
                questions.append(line)

    doc.close()

    # Remove duplicates
    questions = list(dict.fromkeys(questions))

    return questions
