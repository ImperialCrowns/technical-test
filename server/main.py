from fastapi import FastAPI, HTTPException, status, Depends
import httpx
from httpx._auth import BasicAuth
from src.controllers.customerController import CustomerRouter
from fastapi.middleware.cors import CORSMiddleware
from src.models import Users
from src.config.database import SessionLocal, engine, Base
from src.tools.tools import hash_password, verify_password, create_access_token, create_refresh_token
from sqlalchemy.orm import Session
from src.tools.auth_bearer import JWTBearer
import jwt
from src.config.config import get_config
import datetime
from functools import wraps

env = get_config()

Base.metadata.create_all(engine)
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

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

@app.post("/register", tags=["Users"])
def register_user(user: Users.UserCreate, db: Session = Depends(get_session)):
    already_exists = db.query(Users.User).filter_by(email=user.email).first()
    if already_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    hashed_password = hash_password(user.password)
    new_user = Users.User(username=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    created_user = db.query(Users.User).filter_by(email=user.email).first()
    new_token = Users.TokenTable(user_id=created_user.id, access_token=create_access_token(created_user.id), refresh_token=create_refresh_token(created_user.id), status=True)
    db.add(new_token)
    db.commit()
    db.refresh(new_token)
    return new_token

@app.post("/login", dependencies=[Depends(JWTBearer())], tags=["Users"])
def login_user(request: Users.UserRequest, db: Session = Depends(get_session)):
    user = db.query(Users.User).filter(Users.User.email == request.email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email")
    hashed_password = user.password
    if not verify_password(request.password, hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    
    if db.query(Users.TokenTable).filter(Users.TokenTable.user_id == user.id).first():
        existing_token = db.query(Users.TokenTable).filter(Users.TokenTable.user_id == user.id).first()
        existing_token.access_token = access_token
        existing_token.refresh_token = refresh_token
        existing_token.status = True
        db.add(existing_token)
        db.commit()
        db.refresh(existing_token)
        return {"access_token": access_token, "refresh_token": refresh_token}
    
    token = Users.TokenTable(user_id=user.id, access_token=access_token, refresh_token=refresh_token, status=True)
    db.add(token)
    db.commit()
    db.refresh(token)
    return {"access_token": access_token, "refresh_token": refresh_token}

@app.post("/logout", dependencies=[Depends(JWTBearer())], tags=["Users"])
def logout_user(dependencies=Depends(JWTBearer()), db: Session = Depends(get_session)):
    token = dependencies
    payload = jwt.decode(token, env.JWT_SECRET, algorithms=["HS256"])
    user_id: int = payload.get("sub")
    test = db.query(Users.TokenTable).filter(Users.TokenTable.user_id == user_id).delete()
    db.commit()
    return {"message": "Logout successful"}

