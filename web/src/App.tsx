import * as React from "react"
import { useEffect, useState } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useGetCustomersQuery } from "./Services/api"
import { AuthProvider, useAuthContext } from "./Context/AuthContext"
import Dashboard from "./Views/Dashboard"
import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider, Routes, BrowserRouter, Route, Navigate, Link } from "react-router-dom"
import Sales from "./Views/Sales"
import { Customer } from "./Models/Customer"
import Login from "./Views/Login"
import Register from "./Views/Register"

function NoMatch() {
    return (
        <VStack>
            <Text> 404 Page not found</Text>
            <Button as={Link} to="/customers">Back to customers</Button>
        </VStack>
    );
}

function Redirect() {
    const infos = useAuthContext();

    return (
        <>
            {infos.isAuthenticated === true ? <Navigate to="/customers" /> : <Navigate to="/login" />}
        </>
    )
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/redirect"/>} />
                <Route path="/redirect" element={<Redirect/>} />
                <Route path="/customers" element={<Dashboard/>} />
                <Route path="/customers/:id" element={<Sales />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    )
}

function RootApp() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default RootApp;
