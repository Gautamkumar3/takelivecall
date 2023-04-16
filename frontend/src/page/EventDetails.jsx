import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEvenDetailstData } from "../store/eventDetails/eventdetails.action";

const EventDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.eventDetailsData);
  const navigate = useNavigate();

  function checkEnrolledPlayer(arr) {
    let filteredData = arr?.filter((el) => el.status === "accepted").length;
    return filteredData;
  }

  function handleRequest(id) {
    axios
      .post(
        `https://takelivecall-api-production.up.railway.app/event/request/${id}`,
        {},
        {
          headers: {
            token: userData.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
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
    dispatch(getEvenDetailstData(id));
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
          <b>Location :</b> {data.location}
        </Text>
        <Link to={`/enrolled_player/${data._id}`}>
          <Text color={"blue"}>
            <b>Enrolled Players :</b> {checkEnrolledPlayer(data?.players)}
          </Text>
        </Link>

        <Text>
          <b>Waitlisted Players :</b>{" "}
          {data?.players?.length - checkEnrolledPlayer(data?.players)}
        </Text>

        <Flex justify={"space-between"} my={3}>
          <Button
            colorScheme="blue"
            onClick={() => navigate(`/all_player/${id}`)}
          >
            Go to see all players
          </Button>
          <Button colorScheme="whatsapp" onClick={() => handleRequest(id)}>
            Request to join
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default EventDetails;
