import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.bookrouter import book_router

app = FastAPI()

origins = [
    os.environ.get("FRONTEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(book_router, prefix="/api/v1")
