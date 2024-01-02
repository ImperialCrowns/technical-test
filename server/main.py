from fastapi import FastAPI
from src.controllers.customerController import CustomerRouter
from fastapi.middleware.cors import CORSMiddleware
from src.controllers.authController import AuthRouter


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
    allow_headers=["*"],
)

app.include_router(CustomerRouter)
app.include_router(AuthRouter)