import os
from src.config.config import get_config
from passlib.context import CryptContext
from typing import Union, Any
from datetime import datetime, timedelta
from jose import jwt

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

pass_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

env = get_config()

def hash_password(password) -> str:
    return pass_context.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return pass_context.verify(plain_password, hashed_password)

def create_access_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expire = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
    encode = { "exp": expires_delta, "sub": str(subject) }
    return jwt.encode(encode, env.JWT_SECRET, algorithm="HS256")

def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expire = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
        
    encode = { "exp": expires_delta, "sub": str(subject) }
    return jwt.encode(encode, env.JWT_REFRESH_SECRET, algorithm="HS256")