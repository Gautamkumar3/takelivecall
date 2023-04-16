import { Badge, Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const getAllPlayers = async (id, token) => {
  let res = await axios.get(`http://localhost:8080/event/allplayer/${id}`, {
    headers: { token },
  });
  return res.data;
};

const EnrolledPlayer = () => {
  const { id } = useParams();

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPlayers(id, user_data.token).then((res) => {
      setData(res.data);
    });
  }, []);

  if (data?.length === 0) {
    return (
      <Heading textAlign={"center"} fontWeight={"500"} my={"5%"}>
        No players are in waitlist
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
        All accepted players of this event
      </Heading>

      <SimpleGrid columns={4} spacing={"20px"} w="80%" m="auto">
        {data?.map((el) => (
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
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EnrolledPlayer;
