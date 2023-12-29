import * as React from "react"
import { useEffect } from "react"
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

function App() {
    //const infos = useAuthContext();
    //return <>{infos.isAuthenticated ? <Dashboard /> : <Auth />}</>
    const info = true;
    return <>{info ? <Dashboard /> : <Auth />}</>
}

function RootApp() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default RootApp;
