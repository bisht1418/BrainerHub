import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = "https://brainerhub-backend.onrender.com/api/auth/register";
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}`, user);
      setIsLoading(false);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error: any) {
      if (user.username == "" || user.email == "" || user.password == "") {
        toast({
          title: "Please fill all the inputs.",
          description: "Please fill all the inputs",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }
      if (error.response.data.status == 0) {
        toast({
          title: "Username or email already exists.",
          description: "Username or email already exists",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast({
          title: "Please fill all the inputs.",
          description: "Please fill all the inputs",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleCancel = async () => {
    setUser({ ...user, username: "", email: "", password: "" });
  };

  return (
    <Flex
      id="register"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Register
        </Heading>

        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleClick}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
