from pydantic import BaseModel

class Customer(BaseModel) :
    customers_id: int
    last_name: str
    first_name: str
    email: str
    phone: str
    vat: str
    country: str
    date_of_birth: str
    validity: str
    loyalty_points: int
    intial_loyalty_points: int
    prepaid_purchases: str
    store_credit: str
    customers_ref_ext: str
    last_order_date: str
    customers_code: str
