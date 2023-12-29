from fastapi import FastAPI
import httpx
from httpx._auth import BasicAuth
from src.controllers.customerController import CustomerRouter

app = FastAPI(
    title="Test API",
    description="Test API for the customer service",
    version="0.0.1",
)

app.include_router(CustomerRouter)