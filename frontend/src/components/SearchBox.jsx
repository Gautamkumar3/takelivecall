import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchedEventData } from "../store/event/event.action";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  function handleSearch() {
    dispatch(getSearchedEventData(query));
  }
  return (
    <Flex justify="center" py={8}>
      <InputGroup w={["80%", "60%", "60%", "40%"]} bg={"#fff"}>
        <Input
          border={"2px solid red"}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          borderColor="black"
          placeholder="Search post by title"
        />
        <InputRightElement
          bg={"green"}
          onClick={handleSearch}
          children={
            <Button
              colorScheme={"whatsapp"}
              borderRadius="0"
              padding={"0 40px"}
              borderRightRadius="5px"
            >
              <SearchIcon boxSize={5} />
            </Button>
          }
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBox;
