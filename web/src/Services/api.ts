// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Customer } from '../Models/Customer'
import { Sale } from '../Models/Sale'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], {lastname : string, page?: number}>({
        query: ({lastname, page}) => {
            return {
                url: `customer/${lastname}`,
                params: {page}
            }
        }
    }),
    getSalesByCustomer: builder.query<Sale[], {id : number, page?: number}>({
        query: ({id, page}) => {
            return {
                url: `customer/sales/${id}`,
                params: {page}
            }
        }
    }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCustomersQuery, useGetSalesByCustomerQuery } = baseApi