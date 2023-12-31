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
import Auth from "./Views/Auth"
import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider, Routes, BrowserRouter, Route, Navigate, Link } from "react-router-dom"
import Sales from "./Views/Sales"
import { Customer } from "./Models/Customer"

function NoMatch() {
    return (
        <VStack>
            <Text> 404 Page not found</Text>
            <Button as={Link} to="/customers">Back to customers</Button>
        </VStack>
    );
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/customers"/>} />
                <Route path="/customers" element={<Dashboard/>} />
                <Route path="/customers/:id" element={<Sales />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    )
}

function RootApp() {
    const infos = useAuthContext();
    infos.isAuthenticated = true;
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        {infos?.isAuthenticated ? <App /> : <Auth />}
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default RootApp;
