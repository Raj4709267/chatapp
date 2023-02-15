import { Box,  Img,   Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatSuccess, setCurrentChat } from "../Redux/AppReducer/action";
import ChatLoading from "./ChatLoading";
import { SearchModal } from "./Modals/SearchModal";
import style from "./Sidebar.module.css";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((store) => store.AuthReducer);
  const { chats, currentChat } = useSelector((store) => store.AppReducer);
  console.log(chats, currentChat);
  const dispatch = useDispatch();



  const handleActiveChat = (chat) => {
    dispatch(setCurrentChat(chat));
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

  // fetch all chats 
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
          bgColor={"#43c651"}
          borderRadius="16px 0 0 0 "
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

        {/* mapping all chats */}
        <Box
          height="65vh"
          overflowY={"scroll"}
          className={style.scroller}
          bgColor="white"
        >
          {chats &&
            chats.map((item, i) => {
              // if(chat is selected for chatting)
              if (item._id === currentChat._id) {
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

              // normal rendering
              return (
                <Box
                  key={i}
                  display={"flex"}
                  height="60px"
                  border={"1px solid #9ed6a9"}
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

      {/* showing userProfile and group icon */}
      <Box
        position="absolute"
        width={"100%"}
        height="80px"
        bottom="0"
        bg="#43c651"
        borderRadius={"20px 20px 0 0"}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        padding={"20px"}
      >
        <Box color={"white"} fontSize="20px" fontWeight={"bold"}>
          Hi... {user.name}
        </Box>
        <Box color="white" fontSize={"20px"}>
          <button>
            <AiOutlineUsergroupAdd size={"	1.5em"} />
          </button>
        </Box>
      </Box>
    </div>
  );
}

export default Sidebar;




// some js logics require while rendering all chats in ui
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
  console.log(arr)
  let user = arr.filter((item) => item._id !== id);
  if (user.length > 0) {
    const avatar = user[0].avatar;

    return avatar;
  }
}
