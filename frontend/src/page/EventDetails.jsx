import { Box, Heading, Text } from "@chakra-ui/react";
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
  console.log(data);

  useEffect(() => {
    getEventDetails(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Box>
      <Heading fontWeight={"400"}>Event Details</Heading>
      <Text>
        <b>Sports Name :</b> {data.sport_name}
      </Text>
      <Text>
        <b>Description :</b> {data.description}
      </Text>
      <Text>
        <b>Event Date :</b> {data.date?.split("T")[0]}
      </Text>
      <Text>
        <b>Event Time :</b> {data.start_time}
      </Text>
      <Text>
        <b>Max Players :</b> {data.max_players}
      </Text>
      <Text>
        <b>Location :</b> {data.location}
      </Text>
    </Box>
  );
};

export default EventDetails;
