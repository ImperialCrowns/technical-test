type Sale = {
    sale_id: number;
    created_at: string;
    completed_at: string;
    date_z: number;
    store_id: number;
    vendor_id: number;
    unique_sale_id: string;
    customer_id: number;
    currency: string;
    total: string;
    billing_address: number;
    shipping_address: number;
}

export type { Sale };