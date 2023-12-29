from src.models.custosmers import Customer
from src.models.sales import Sale
from src.config.config import get_config
from httpx._auth import BasicAuth
import httpx
from typing import List

async def get_customers_from_lastname(last_name: str, page: int = 1) -> List[Customer]:
    env = get_config()
    auth = BasicAuth(env.EMAIL, env.API_KEY)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{env.API_URL}/customers/search/?last_name={last_name}&p={page}",
            auth=auth
        )
        response.raise_for_status()
        data = response.json()
        formated_data : List[Customer] = [Customer.parse_obj(customer) for customer in data]
        return formated_data
    
async def get_customer_sales(customer_id: int, page: int = 1):
    page_request = max(1, page * 5 // 250)
    env = get_config()
    auth = BasicAuth(env.EMAIL, env.API_KEY)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{env.API_URL}/customer/{customer_id}/sales/?p={page_request}",
                auth=auth
            )
            response.raise_for_status()
            data = response.json()
            formated_data : List[Sale] = [Sale.parse_obj(sale) for sale in data]
            formated_data = formated_data[5*(page-1):5*page]
            return formated_data
    except httpx.HTTPStatusError as e:
        return {"error": e.response.json()}