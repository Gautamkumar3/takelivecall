import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Center,
  useToast,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventData } from "../store/event/event.action";
import EventTableData from "../components/EventTableData";
import SearchBox from "../components/SearchBox";

const Dashboard = () => {
  const { data } = useSelector((store) => store.eventData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventData());
  }, []);

 

  return (
    <Box bg={"gray.100"}>
      <SearchBox />
      <Box w="80%" m="auto">
        <TableContainer>
          <Table variant="striped" colorScheme="">
            <Thead bg={"gray.400"} height={"60px"}>
              <Tr>
                <Th>Sports name</Th>
                <Th>Description</Th>
                <Th>Event date</Th>
                <Th>Event Time</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((event) => (
                <EventTableData key={event._id} {...event} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
