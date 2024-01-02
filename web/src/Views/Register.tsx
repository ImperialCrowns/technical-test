import { EmailIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Stack, Heading, Box, FormControl, Input, InputGroup, InputLeftElement, chakra, InputRightElement, Button } from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { UserRegister } from "../Models/User";
import { useRegisterMutation } from "../Services/api";

const CFaLock = chakra(FaLock);
const CFaUser = chakra(FaUserAlt);

function Register() {
    const [showPassword , setShowPassword] = useState(false);
    const [showKey , setShowKey] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [magicKey, setMagicKey] = useState<string>("");
    const infos = useAuthContext();
    const [register, {data, error, isLoading}] = useRegisterMutation();

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
        const request : UserRegister = {
            email: email,
            password: password,
            username: username,
            magicKey: magicKey
        };
        await register({user: request})
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
                            <FormControl id="username">
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaUser color="gray.300" />} />
                                    <Input type="username" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="email">
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300" />} />
                                    <Input type="email" placeholder="Email address" onChange={(event) => setEmail(event.target.value)} />
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
                            <FormControl id="passwordConfirmation">
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                                    <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(event) => setPasswordConfirmation(event.target.value)}/>
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="magicKey">
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                                    <Input type={showKey ? "text" : "password"} placeholder="Auth key" onChange={(event) => setMagicKey(event.target.value)} />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={() => setShowKey(!showKey)}>
                                            {showKey ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button type="button" colorScheme="blue" variant="solid" onClick={onSubmit}>
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already register ?{" "}
                <Button variant="link" colorScheme="blue" as={Link} to="/login">
                    Login
                </Button>
            </Box>
        </Flex>
    )
}

export default Register;