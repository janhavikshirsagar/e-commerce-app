from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product
from schemas import ProductCreate
from auth import verify_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    p = Product(name=product.name, price=product.price)
    db.add(p)
    db.commit()
    return p

@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()