import httpx
from fastapi import APIRouter, HTTPException, Depends
from httpx._auth import BasicAuth
from src.config.config import get_config
from src.models.custosmers import Customer
from src.models.sales import Sale
from typing import List
from src.services.customerService import get_customers_from_lastname, get_customer_sales
from src.tools.auth_bearer import JWTBearer

CustomerRouter = APIRouter(
    tags = ["customer"]
)


@CustomerRouter.get("/customer/{last_name}", dependencies=[Depends(JWTBearer())],  response_model=List[Customer])
async def get_customers(last_name: str, page: int = 1):
    try :
        if len(last_name) < 3:
            raise HTTPException(status_code=400, detail="Last name must be at least 3 characters")
        return await get_customers_from_lastname(last_name, page)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.json())
    
@CustomerRouter.get("/customer/sales/{customer_id}", dependencies=[Depends(JWTBearer())], response_model=List[Sale])
async def get_sales(customer_id: int, page: int = 1):
    try:
        return await get_customer_sales(customer_id, page)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.json())

