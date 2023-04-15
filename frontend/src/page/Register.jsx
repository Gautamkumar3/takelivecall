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

const Register = () => {

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
     await axios
       .post("http://localhost:8080/user/register", data)
       .then((res) => {
         toast({
           title: `Status code ${res.status}`,
           description: `${res.data.message}`,
           status: "success",
           duration: 4000,
           isClosable: true,
           position: "top",
         });
         navigate("/login");
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
        Register Form
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
            Register
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Register;
