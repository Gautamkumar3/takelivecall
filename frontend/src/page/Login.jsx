import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    user_name: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await axios
      .post(
        "https://takelivecall-api-production.up.railway.app/user/login",
        data
      )
      .then((res) => {
        toast({
          title: `Status code ${res.status}`,
          description: `${res.data.message}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem(
          "user_data",
          JSON.stringify({ name: res.data.name, token: res.data.token })
        );
        navigate("/");
      })
      .catch((er) => {
        toast({
          title: `Status code ${er.response.status}`,
          description: `${er.response.data.message || "Something went wrong"}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Box
      w={["90%", "50%", "30%"]}
      m={"auto"}
      boxShadow="md"
      p="6"
      rounded="md"
      bg="white"
      mt={"5%"}
    >
      <Heading textAlign={"center"} color={"tomato"} mb={5}>
        Login Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            type={"text"}
            name="user_name"
            placeholder="user name"
            onChange={handleChange}
          />

          <FormLabel mt={2}>Password</FormLabel>
          <Input
            type={"password"}
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Button mt={4} type="submit" colorScheme={"whatsapp"} w="full">
            Login
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Login;
