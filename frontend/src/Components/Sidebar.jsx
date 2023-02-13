import { Box, Button, Img, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatSuccess, setCurrentChat } from "../Redux/AppReducer/action";
import ChatLoading from "./ChatLoading";
import { SearchModal } from "./Modals/SearchModal";
import style from "./Sidebar.module.css";

function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((store) => store.AuthReducer);
  const { chats, currentChat } = useSelector((store) => store.AppReducer);
  console.log(chats,currentChat)
  const dispatch = useDispatch();

  const handleActiveChat = (chat) => {
    dispatch(setCurrentChat(chat))
  };

  const getChats = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const res = await axios.get(
        "http://localhost:8000/chat/getchats",
        config
      );
      dispatch(getChatSuccess(res.data));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className={style.sidebar}>
      <Box>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          padding="24px"
          // paddingBottom={"0"}
          bgColor={"#43c651"}
          borderRadius="16px  16px 0 0 "
        >
          <Text
            color={"white"}
            fontSize="24px"
            fontWeight={"bold"}
            textAlign={"left"}
          >
            BuddyTalk
          </Text>
          <SearchModal getChats={getChats} />
        </Box>
        {/* <Box padding="10px">
          <Input placeholder="Search users..." />
          <Box display={"none"}>ResultBox</Box>
        </Box> */}
        <Box
          height="65vh"
          // overflow={"hidden"}
          overflowY={"scroll"}
          className={style.scroller}
          bgColor="white"
          // border={"2px solid #43c651"}
        >
          {chats &&
            chats.map((item, i) => {
              if (item._id == currentChat._id) {
                return (
                  <Box
                    key={i}
                    display={"flex"}
                    height="60px"
                    border={"1px solid #9ed6a9"}
                    bgColor="#9ed6a9"
                    borderRadius={"4px"}
                    margin="10px"
                    padding={"10px"}
                    justifyContent="left"
                    alignItems={"center"}
                    gap="10px"
                    onClick={() => handleActiveChat(item)}
                  >
                    <Box>
                      <Img
                        width={"40px"}
                        borderRadius="50%"
                        src={giveUserForImage(
                          item.users,
                          item.isGroupChat,
                          item.chatName,
                          user.id
                        )}
                      />
                    </Box>

                    <Box textAlign={"left"}>
                      <Text color="#2f3337" fontWeight={"bold"} fontSize="16px">
                        {giveUserForChatName(
                          item.users,
                          item.isGroupChat,
                          item.chatName,
                          user.id
                        )}
                      </Text>
                      <Text fontSize={"12px"} color="#545658">
                        {item.latestMessage?.content}
                      </Text>
                    </Box>
                  </Box>
                );
              }
              return (
                <Box
                  key={i}
                  display={"flex"}
                  height="60px"
                  border={"1px solid #9ed6a9"}
                  // bgColor="#9ed6a9"
                  // boxShadow= "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
                  borderRadius={"4px"}
                  margin="10px"
                  padding={"10px"}
                  justifyContent="left"
                  alignItems={"center"}
                  gap="10px"
                  onClick={() => handleActiveChat(item)}
                >
                  <Box>
                    <Img
                      width={"40px"}
                      borderRadius="50%"
                      src={giveUserForImage(
                        item.users,
                        item.isGroupChat,
                        item.chatName,
                        user.id
                      )}
                    />
                  </Box>

                  <Box textAlign={"left"}>
                    <Text color="#2f3337" fontWeight={"bold"} fontSize="16px">
                      {giveUserForChatName(
                        item.users,
                        item.isGroupChat,
                        item.chatName,
                        user.id
                      )}
                    </Text>
                    <Text fontSize={"12px"} color="#545658">
                      {item.latestMessage?.content}
                    </Text>
                  </Box>
                </Box>
              );
            })}

          {isLoading && <ChatLoading />}
        </Box>
      </Box>

      <Box
        position="absolute"
        width={"100%"}
        height="80px"
        bottom="0"
        bg="#43c651"
        borderRadius={"20px 20px 0 0"}
      >
        profile
      </Box>
      <Box></Box>
    </div>
  );
}

export default Sidebar;

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

function giveUserForImage(arr, isGroup, chatname, id) {
  if (isGroup) {
    return chatname;
  }
  let user = arr.filter((item) => item._id !== id);
  if (user.length > 0) {
    const avatar = user[0].avatar;

    return avatar;
  }
}
