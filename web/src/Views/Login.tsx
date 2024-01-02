import { EmailIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Stack, Heading, Box, FormControl, Input, InputGroup, InputLeftElement, chakra, InputRightElement, Button } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import { FaLock } from "react-icons/fa";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { UserLogin } from "../Models/User";
import { useLoginMutation } from "../Services/api";
import { info } from "console";

const CFaLock = chakra(FaLock);

function Login() {
    const [showPassword , setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const infos = useAuthContext();
    const [login, {data, error, isLoading}] = useLoginMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (data?.token) {
            infos.setIsAuthenticated(true);
            localStorage.setItem("token", data?.token)
            navigate("/customers");
        }
        if (localStorage.getItem("token")) {
            navigate("/customers")
        }
    }, [data]);

    async function onSubmit() {
        const request : UserLogin = {
            email: email,
            password: password
        };
        await login({user: request})
    }

    return (
        <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
            <ColorModeSwitcher justifySelf="flex-end" position="absolute" top="1rem" right="1rem" />
            <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                <Avatar bg="blue.500"/>
                <Heading colorScheme="blue">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack spacing={4} p="1rem" boxShadow="md">
                            <FormControl id="email">
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300" />} />
                                    <Input type="email" placeholder="Email address" onChange={(event) => setEmail(event.target.value)}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password">
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                                    <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button type="button" colorScheme="blue" variant="solid" onClick={onSubmit}>
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us ?{" "}
                <Button variant="link" colorScheme="blue" as={Link} to="/register">
                    Sign Up
                </Button>
            </Box>
        </Flex>
    )
}

export default Login;