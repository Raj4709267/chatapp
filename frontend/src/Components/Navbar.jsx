import { Box, Text } from "@chakra-ui/react";
import React from "react";

function Navbar() {
  return (
    <Box
      bg="#43c651"
      color={"white"}
      height="60px"
    //   borderRadius={"20px 20px"}
    >
      <Text fontSize="4xl" fontWeight={"bold"} textAlign="left" marginLeft={"5%"}>
          BuddyTalk
        </Text>
    </Box>
  );
}

export default Navbar;
