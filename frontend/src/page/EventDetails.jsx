import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const getEventDetails = async (id) => {
  let res = await axios.get(`http://localhost:8080/event/${id}`);
  return res.data;
};

const EventDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const toast = useToast();
  const userData = JSON.parse(localStorage.getItem("user_data"));

  function checkEnrolledPlayer(arr) {
    let filteredData = arr?.filter((el) => el.status === "accepted").length;
    return filteredData;
  }

  function handleRequest(id) {
    axios
      .post(
        `http://localhost:8080/event/request/${id}`,
        {},
        {
          headers: {
            token: userData.token,
          },
        }
      )
        .then((res) => {
          console.log(res.data)
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

  useEffect(() => {
    getEventDetails(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Box bg={"gray.100"} h="100vh" py={"5%"}>
      <Box
        boxShadow="md"
        p="6"
        rounded="md"
        bg="white"
        m="auto"
        w={["90%", "50%", "30%"]}
      >
        <Heading fontWeight={"400"} textAlign={"center"} my={3}>
          Event Details
        </Heading>
        <Text>
          <b>Sports Name :</b> {data.sport_name}
        </Text>
        <Text>
          <b>Description :</b> {data.description}
        </Text>
        <Text>
          <b>Event Date :</b>
          <Badge colorScheme="green">{data.date?.split("T")[0]}</Badge>
        </Text>
        <Text>
          <b>Event Start Time :</b>{" "}
          <Badge colorScheme="green">{data.start_time}</Badge>
        </Text>
        <Text>
          <b>Max Players :</b> {data.max_players}
        </Text>
        <Text>
          <b>Enrolled Players :</b> {checkEnrolledPlayer(data?.players)}
        </Text>
        <Text>
          <b>Location :</b> {data.location}
        </Text>
        <Center>
          <Button
            colorScheme="whatsapp"
            my={3}
            onClick={() => handleRequest(id)}
          >
            Request to join
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default EventDetails;
