from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import UserCreate
from auth import create_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    return {"msg": "User created"}

@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
       raise HTTPException(status_code=400, detail="Invalid email") 
    if db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid password")

    token = create_token({"user_id": db_user.id})
    return {"access_token": token}