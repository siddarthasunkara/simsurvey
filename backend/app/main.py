from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.survey import router as survey_router  # survey routes
from app.api import personas  # personas routes

app = FastAPI(title="SimSurvey Backend")

# Include the personas routes
app.include_router(personas.router, prefix="/api", tags=["personas"])

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the survey routes
app.include_router(survey_router, prefix="/survey", tags=["survey"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
