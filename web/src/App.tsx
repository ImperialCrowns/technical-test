import * as React from "react"
import { useEffect, useState } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useGetCustomersQuery } from "./Services/api"
import { AuthProvider, useAuthContext } from "./Context/AuthContext"
import Dashboard from "./Views/Dashboard"
import Auth from "./Views/Auth"
import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider, Routes, createBrowserRouter, Route } from "react-router-dom"
import Sales from "./Views/Sales"
import { Customer } from "./Models/Customer"

function App() {
    const infos = useAuthContext();
    infos.isAuthenticated = true;
    //return <>{infos.isAuthenticated ? <Dashboard /> : <Auth />}</>
    const [element, setElement] = useState<JSX.Element>(<Auth />);
    useEffect(() => {
        if (infos.isAuthenticated) {
            setElement(
                <>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/customers" element={<Dashboard />} />
                        <Route path="/customers/:id" element={<Sales/>}/>
                    </Routes>
                </>
            );
        } else {
            setElement(<Auth />);
        }
    }, [infos]);
    return <>{element}</>
}

const appPaths = [
    {
        path: "/",
        children: [
            {
                index: true,
                path: "*",
                element: <App />
            }
        ]
    }

];


const appRouter = createBrowserRouter(appPaths);

function RootApp() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Provider store={store}>
                    <RouterProvider router={appRouter}/>
                </Provider>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default RootApp;
