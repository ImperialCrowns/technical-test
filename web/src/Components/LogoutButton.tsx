import React, { useEffect } from "react"
import { useLogoutMutation } from "../Services/api"
import { Button, IconButtonProps } from "@chakra-ui/react";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

type LogoutButtonProps = Omit<IconButtonProps, "aria-label">

const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
    const [logout, {data}] = useLogoutMutation();
    const infos = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.message == "Logout successful") {
            infos.setIsAuthenticated(false);
            localStorage.removeItem("token");
            console.log(localStorage.getItem("token"));
            console.log(infos);
            navigate("/login");
        }
    }, [data]);

    async function onLogout() {
        await logout();
    }
    return (
        <Button aria-label="Logout" onClick={onLogout} {...props}>Logout</Button>
    )
}

export default LogoutButton