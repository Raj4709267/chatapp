import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatContainer from "../Components/ChatContainer";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { loginSuccess } from "../Redux/AuthReducer/action";
import style from "./Chat.module.css";

function Chat() {
  const state = useSelector((store) => store.AuthReducer);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loginSuccess(JSON.parse(localStorage.getItem("userDetails"))));
  // }, []);
  return (
    <div className={style.chatmain}>
      <Box display={"flex"} justifyContent="space-between" 
      width={"70%"}
      borderRadius="8px"
      >
        <Sidebar />
        <ChatContainer />
      </Box>
    </div>
  );
}

export default Chat;
