from pydantic import BaseModel

class Customer(BaseModel) :
    customer_id: int
    last_name: str
    first_name: str
    email: str
    phone: str
    vat: str
    country: str
    date_of_birth: str
    validity: str
    loyalty_points: int
    initial_loyalty_points: int
    prepaid_purchase: str
    store_credit: str
    customer_ref_exit: str
    last_order_date: str
    customers_code: str
