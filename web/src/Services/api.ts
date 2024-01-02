// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Customer } from '../Models/Customer'
import { Sale } from '../Models/Sale'
import { UserLogin, UserRegister } from '../Models/User'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000'}),
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], {lastname : string, page?: number}>({
        query: ({lastname, page}) => {
            return {
                url: `customer/${lastname}`,
                params: {page},
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
        }
    }),
    getSalesByCustomer: builder.query<Sale[], {id : number, page?: number}>({
        query: ({id, page}) => {
            return {
                url: `customer/sales/${id}`,
                params: {page},
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }
        }
    }),
    login: builder.mutation<{token: string}, {user: UserLogin}>({
        query: ({user}) => {
            return {
                url: `login`,
                method: 'POST',
                body: {"email": user.email, "password": user.password},
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        }
    }),
    register: builder.mutation<{token: string}, {user: UserRegister}>({
        query: ({user}) => {
            return {
                url: `register`,
                method: 'POST',
                body: {email: user.email, password: user.password, username: user.username, magicKey: user.magicKey},
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        }
    }),
    logout: builder.mutation<{message: string}, void>({
        query: () => {
            return {
                url: `logout`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }
        }
    }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCustomersQuery, useGetSalesByCustomerQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = baseApi