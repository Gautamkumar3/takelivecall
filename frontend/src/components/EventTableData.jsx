import { Badge, Button, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EventTableData = ({ _id, sport_name, start_time, date, description }) => {
  const navigate = useNavigate();

  function convertAMPM(time) {
    let h = time.split(":")[0];
    let k =
      +h >= 12
        ? `${24 -h}:${time.split(":")[1]}PM`
        : `${h}:${time.split(":")[1]}AM`;
    return k;
  }
  return (
    <Tr>
      <Td>{sport_name}</Td>
      <Td maxWidth={"150px"}>
        <Text noOfLines={1}>{description}</Text>
      </Td>
      <Td>
        <Badge colorScheme="blue">{date?.split("T")[0]}</Badge>
      </Td>
      <Td>
        <Badge colorScheme="blue">{convertAMPM(start_time)}</Badge>
      </Td>
      <Td>
        <Button
          colorScheme="whatsapp"
          onClick={() => navigate(`/event_details/${_id}`)}
        >
          View Details
        </Button>
      </Td>
    </Tr>
  );
};

export default EventTableData;
