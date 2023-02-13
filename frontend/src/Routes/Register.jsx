import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../Components/Register/Login";
import Signup from "../Components/Register/Signup";
function Register() {
  return (
    <Box display={"flex"} flexDirection="column" alignItems={"center"}>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="300px"
        m="40px 0 -35px 0"
        height={"130px"}
        borderRadius="20px"
        borderWidth="1px"
        backgroundColor={"#43c651"}
        color="white"
      >
        <Text fontSize="4xl" fontWeight={"bold"} marginTop={"15px"}>
          BuddyTalk
        </Text>
      </Box>
      <Box
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px "
        bg="white"
        w="300px"
        p={4}
        borderRadius="24px"
        borderWidth="1px"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default Register;
