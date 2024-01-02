from fastapi import APIRouter, HTTPException, status, Depends
from src.models import Users
from src.tools.tools import verify_password
from sqlalchemy.orm import Session
from src.tools.auth_bearer import JWTBearer
from src.config.config import get_config
from src.config.database import get_session
from src.services.AuthService import register_user_service, login_user_service, logout_user_service

AuthRouter = APIRouter(
    tags = ["users"]
)

env = get_config()


@AuthRouter.post("/register", tags=["users"])
def register_user(user: Users.UserCreate, db: Session = Depends(get_session)):
    if user.magicKey != env.MAGIC_KEY:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect magic key")
    already_exists = db.query(Users.User).filter_by(email=user.email).first()
    if already_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    return register_user_service(user, db)

@AuthRouter.post("/login", tags=["users"], response_model=Users.TokenSolo)
def login_user(request: Users.UserRequest, db: Session = Depends(get_session)):
    user = db.query(Users.User).filter(Users.User.email == request.email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email")
    hashed_password = user.password
    if not verify_password(request.password, hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")
    return login_user_service(user, db)

@AuthRouter.post("/logout", dependencies=[Depends(JWTBearer())], tags=["users"])
def logout_user(dependencies=Depends(JWTBearer()), db: Session = Depends(get_session)):
    return logout_user_service(dependencies, db)

