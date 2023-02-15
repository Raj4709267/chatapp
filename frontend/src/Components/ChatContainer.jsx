import { Box, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./ChatContainer.module.css";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { setCurrentMessages } from "../Redux/AppReducer/action";

const server = "http://localhost:8000/";
let socket,selectedChatCompare;

function ChatContainer() {
  const [message, setMessage] = useState("");
  const { currentChat } = useSelector((store) => store.AppReducer);
  const [socketConnected,setSocketConnected]=useState(false)
  const user = useSelector((store) => store.AuthReducer.user);
  const toast = useToast()
  const dispatch=useDispatch();

  console.log(user);

  const handleMessageSend = async () => {
    if (currentChat !== "" && message!=="") {
      setMessage("");

      const payload = { content: message, chatId: currentChat._id };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const res = await axios.post(
          `http://localhost:8000/message`,
          payload,
          config
        );
        console.log(res.data);
        // socket.emit("getting message", res.data);
      } catch (err) {
        console.log(err);
      }
    }
    else{
      toast({
        title: 'Please add some Message.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        colorScheme:"#43c651"
      })
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleMessageSend();
  };

  const handelGetMessages=async()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:8000/message/${currentChat._id}`,
        config
      );
      console.log(res.data);
      // dispatch(setCurrentMessages(res.data))
      // socket.emit("getting message", res.data);
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(()=>{
    handelGetMessages();
  },[currentChat])

  useEffect(() => {
    socket = io(server);
    socket.emit("newSocket",user)
    socket.on("connection",()=>setSocketConnected(true))

    // socket.on("connection");
  }, []);

  return (
    <div className={style.mainconatainer}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        padding="24px"
        bgColor={"#43c651"}
        width="100%"
        borderRadius={"0 16px 0 0"}
      >
        <Text
          color={"white"}
          fontSize="24px"
          fontWeight={"bold"}
          textAlign={"left"}
        >
          {currentChat._id && getCurrentUser(currentChat, user)}
        </Text>
      </Box>
      <Box>message</Box>
      <form className={style.form} onSubmit={handleSubmit}>
        <Box
          // bgColor={"#43c651"}
          width="90%"
          borderRadius={"10px"}
          height="40px"
        >
          <Input
            placeholder="Type a Message..."
            _placeholder={{ color: "black" }}
            color={"black"}
            border="none"
            focusBorderColor="#43c651"
            variant="flushed"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <Box
          color={"white"}
          borderRadius="50%"
          bgColor={"#43c651"}
          height="40px"
          width="40px"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          _hover={{ cursor: "pointer" }}
          onClick={() => handleMessageSend()}
        >
          <IoMdSend size={"1.7em"} />
        </Box>
      </form>
    </div>
  );
}

export default ChatContainer;

const getCurrentUser = (chat, user) => {
  if (!chat.isGroup) {
    return giveUserForChatName(
      chat.users,
      chat.isGroup,
      chat.chatName,
      user.id
    );
  }
};

function giveUserForChatName(arr, isGroup, chatname, id) {
  if (isGroup) {
    return chatname;
  }
  let user = arr.filter((item) => item._id !== id);
  if (user.length > 0) {
    const name = user[0].name;
    return name;
  }
}
