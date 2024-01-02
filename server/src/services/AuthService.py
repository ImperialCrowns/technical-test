from src.models import Users
from src.tools.tools import hash_password, create_access_token, create_refresh_token
from sqlalchemy.orm import Session
from src.tools.auth_bearer import JWTBearer
import jwt
from src.config.config import get_config

env = get_config()


def register_user_service(user: Users.UserCreate, db: Session):
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
    return {"token": new_token.access_token}

def login_user_service(user: Users.User, db: Session):
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    
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
        return {"token": access_token}
    
    token = Users.TokenTable(user_id=user.id, access_token=access_token, refresh_token=refresh_token, status=True)
    db.add(token)
    db.commit()
    db.refresh(token)
    return Users.TokenSolo(token=access_token)

def logout_user_service(dependencies: JWTBearer, db: Session):
    token = dependencies
    payload = jwt.decode(token, env.JWT_SECRET, algorithms=["HS256"])
    user_id: int = payload.get("sub")
    db.query(Users.TokenTable).filter(Users.TokenTable.user_id == user_id).delete()
    db.commit()
    return {"message": "Logout successful"} 