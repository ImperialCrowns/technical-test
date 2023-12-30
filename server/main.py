from fastapi import FastAPI
import httpx
from httpx._auth import BasicAuth
from src.controllers.customerController import CustomerRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Test API",
    description="Test API for the customer service",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
)

app.include_router(CustomerRouter)