# backend/app/api/__init__.py
"""
API package initializer.
This will group all FastAPI route modules.
"""
from fastapi import APIRouter

# Create a single router for the API
router = APIRouter()

# Import routes from submodules
from . import survey

# Include their routers
router.include_router(survey.router, prefix="/survey", tags=["survey"])
