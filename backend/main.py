from fastapi import FastAPI
from database import Base, engine
from routes import user, product
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router, prefix="/auth")
app.include_router(product.router, prefix="/products")

@app.get("/")
def root():
    return {"msg": "E-commerce API running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)