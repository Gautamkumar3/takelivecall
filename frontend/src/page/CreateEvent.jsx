import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createEventData } from "../store/event/event.action";

const CreateEvent = () => {
  const [data, setData] = useState({
    sport_name: "",
    description: "",
    date: "",
    start_time: "",
    max_players: "",
    location: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setData({ ...data, [name]: type === "number" ? +value : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createEventData(data)).then((res) => {
      if (res.status === "success") {
        toast({
          title: `${res.message}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      } else {
        toast({
          title: `Something went wrong.`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
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
        Create Event Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Sports name</FormLabel>
          <Input
            type={"text"}
            name="sport_name"
            placeholder="sport name"
            onChange={handleChange}
          />

          <FormLabel mt={2}>Description</FormLabel>
          <Textarea
            type={"text"}
            name="description"
            placeholder="Write description about the event"
            onChange={handleChange}
          />
          <FormLabel>Maximum Players</FormLabel>
          <Input
            type={"number"}
            name="max_players"
            placeholder="maximum players"
            onChange={handleChange}
          />
          <FormLabel>Location</FormLabel>
          <Input
            type={"text"}
            name="location"
            placeholder="city/area/pincode"
            onChange={handleChange}
          />
          <Flex my={2} justify={"space-between"}>
            <Box>
              <FormLabel>Event date</FormLabel>
              <Input
                type={"date"}
                name="date"
                placeholder="event date"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel>Event start time</FormLabel>
              <Input
                type={"time"}
                name="start_time"
                placeholder="start time"
                onChange={handleChange}
              />
            </Box>
          </Flex>

          <Button mt={4} type="submit" colorScheme={"whatsapp"} w="full">
            Create Event
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CreateEvent;
