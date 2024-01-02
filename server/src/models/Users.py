from sqlalchemy import Column, Integer, String, DateTime, Boolean
from src.config.database import Base
import datetime
from pydantic import BaseModel

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    
class TokenTable(Base):
    __tablename__ = 'tokens'
    user_id = Column(Integer, nullable=False, unique=True)
    access_token = Column(String(450), primary_key=True, unique=True, nullable=False)
    refresh_token = Column(String(450), unique=True, nullable=False)
    status = Column(Boolean, nullable=False)
    creation_date = Column(DateTime, default=datetime.datetime.utcnow)
    
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    magicKey: str
    
class UserRequest(BaseModel):
    email: str
    password: str
    
class changePassword(BaseModel):
    email: str
    old_password: str
    new_password: str
    
class Token(BaseModel):
    access_token: str
    refresh_token: str
    
class TokenSolo(BaseModel):
    token: str
    
class TokenCreate(BaseModel):
    user_id: int
    access_token: str
    refresh_token: str
    status: bool
    creation_date: datetime.datetime
    