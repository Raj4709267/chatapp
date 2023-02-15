import { Box, Img, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ChatContainer from "../Components/ChatContainer";
import Sidebar from "../Components/Sidebar";
import style from "./Chat.module.css";

function Chat() {
  const { currentChat } = useSelector((store) => store.AppReducer);

  return (
    <div className={style.chatmain}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        width={"70%"}
        borderRadius="8px"
        gap={"2px"}
        boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
      >
        <Sidebar />
        {currentChat !== "" ? (
          <ChatContainer />
        ) : (
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            flexDirection="column"
            padding="24px"
            bgColor={"white"}
            width="100%"
            borderRadius={"0 16px 0 0"}
          >
            <Img
              height={"40vh"}
              src="https://media.tenor.com/QpTLQALtdskAAAAi/hii-wave.gif"
            />
            <Text color={"#545658"} fontSize="40px" fontWeight={"bold"}>
              Welcome to BuddyTalk
            </Text>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Chat;
