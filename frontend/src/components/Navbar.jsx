import { Box, Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const data = JSON.parse(localStorage.getItem("user_data"));

  const navigate = useNavigate();
  async function handleLogout() {
    localStorage.removeItem("user_data");
    navigate("/login");
  }

  return (
    <Flex
      justify={"space-around"}
      align="center"
      height={"70px"}
      fontSize="20px"
      color={"white"}
      bg="blue.500"
      position={"sticky"}
      zIndex={"500"}
      top="0px"
    >
      <Link to="/">Dashboard</Link>
      <Link to="/create_event">Event Form</Link>
      <Link to="/user/allevent">All Events</Link>

      {!data ? (
        <>
          {" "}
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <HStack spacing={5}>
          <Text color={"fff"}>Welcome , {data.name}</Text>
          <Button colorScheme={"red"} onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default Navbar;
