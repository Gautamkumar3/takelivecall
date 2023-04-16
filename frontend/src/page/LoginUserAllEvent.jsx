import { Badge, Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useEffect, useState } from "react";

const allEvent = async (token) => {
  let res = await axios.get(`http://localhost:8080/event/user/alldata`, {
    headers: { token },
  });
  return res.data;
};

const LoginUserAllEvent = () => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const [data, setData] = useState([]);

  useEffect(() => {
    allEvent(user_data.token).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Box mt={"5%"}>
      <Heading
        textAlign={"center"}
        fontWeight={"400"}
        borderBottom={"2px solid black"}
        my={5}
      >
        All events of login user
      </Heading>

      <SimpleGrid columns={4} spacing={"20px"} w="80%" m="auto">
        {data?.map((el) => (
          <Box key={el._id} boxShadow="md" p="6" rounded="md" bg="white">
            <Text>
              <b>Sports Name : </b>
              {el.sport_name}
            </Text>
            <Text>
              <b>Event Date : </b>
              {el.date.split("T")[0]}
            </Text>
            <Text>
              <b>Time : </b>
              <Badge colorScheme={"blue"}> {el.start_time}</Badge>
            </Text>
            <Text>
              <b>Location : </b>
              {el.location}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LoginUserAllEvent;