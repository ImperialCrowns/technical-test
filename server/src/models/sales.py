from pydantic import BaseModel

class Sale(BaseModel) :
    sale_id: int
    created_at: str
    completed_at: str
    date_z: int
    store_id: int
    vendor_id: int
    unique_sale_id: str
    customer_id: int
    currency: str
    total: str
    billing_address: int
    shipping_address: int