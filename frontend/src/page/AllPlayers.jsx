import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvenDetailstData } from "../store/eventDetails/eventdetails.action";
import axios from "axios";

const AllPlayers = () => {
  const { data } = useSelector((store) => store.eventDetailsData);
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const user_data = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    dispatch(getEvenDetailstData(id));
  }, []);

  function handleRequest(status, eventId, id) {
    axios
      .post(`http://localhost:8080/event/request/${eventId}/${id}`, status, {
        headers: { token: user_data.token },
      })

      .then((res) => {
        dispatch(getEvenDetailstData(eventId));
        toast({
          title: `Status code ${res.status}`,
          description: `${res.data.message}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
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
  }

  if (data?.players?.length === 0) {
    return (
      <Heading textAlign={"center"} fontWeight={"500"} my={"5%"}>
        No players are in this event
      </Heading>
    );
  }

  return (
    <Box mt={"5%"}>
      <Heading
        textAlign={"center"}
        fontWeight={"400"}
        borderBottom={"2px solid black"}
        my={5}
      >
        All players of this event
      </Heading>

      <SimpleGrid columns={4} spacing={"20px"} w="80%" m="auto">
        {data?.players?.map((el) => (
          <Box key={el._id} boxShadow="md" p="6" rounded="md" bg="white">
            <Text>
              <b>Event Name : </b>
              {data.sport_name}
            </Text>
            <Text>
              <b>User Name : </b>
              {el.name}
            </Text>
            <Text>
              <b>Status : </b>
              <Badge colorScheme={el.status === "rejected" ? "red" : "blue"}>
                {" "}
                {el.status}
              </Badge>
            </Text>
            <HStack my={3}>
              <Button
                colorScheme="whatsapp"
                onClick={() =>
                  handleRequest({ status: "accepted" }, id, el._id)
                }
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                onClick={() =>
                  handleRequest({ status: "rejected" }, id, el._id)
                }
              >
                Reject
              </Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllPlayers;
