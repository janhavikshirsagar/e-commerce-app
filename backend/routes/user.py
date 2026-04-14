from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import UserCreate
from auth import create_token
from pydantic import BaseModel

router = APIRouter()

users = {
    "test@gmail.com": "1234"
}
class LoginData(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RegisterData(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(data: RegisterData):
    if data.email in users:
        return {
            "success": False,
            "message": "User already exists"
        }

    users[data.email] = data.password

    return {
        "success": True,
        "message": "User registered successfully"
    }

@router.post("/login")
def login(data: LoginData):
    if data.email in users and users[data.email] == data.password:
        return {
            "success": True,
            "user": data.email
        }
    return {
        "success": False,
        "message": "Invalid credentials"
    }
