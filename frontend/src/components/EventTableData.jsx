import { Badge, Button, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EventTableData = ({ _id, sport_name, start_time, date, description }) => {
  const navigate = useNavigate();
  return (
    <Tr>
      <Td>{sport_name}</Td>
      <Td>{description}</Td>
      <Td>
        <Badge colorScheme="blue">{date?.split("T")[0]}</Badge>
      </Td>
      <Td>
        <Badge colorScheme="blue">{start_time}</Badge>
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
