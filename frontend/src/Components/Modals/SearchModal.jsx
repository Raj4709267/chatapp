import {
  Box,
  Button,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function SearchModal({ getChats }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { user } = useSelector((store) => store.AuthReducer);




  async function handleUserSearch(e) {
    let value = e.target.value;
    setQuery(value);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:8000/user/find?search=${value}`,
        config
      );
      setSearchData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCreateChat = async (id) => {
    // console.log(id,user.id)

    const payload = { userId: id, _id: user.id };
    const config = {
      method: "post",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      await axios.post(
        `http://localhost:8000/chat/createchat`,
        payload,
        config
      );
      getChats();
      setQuery("");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <button onClick={onOpen}>
        <Search2Icon fontSize={"20px"} color="white" />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Friends</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter Name or Email"
              value={query}
              onChange={(e) => handleUserSearch(e)}
            />

            <Box maxHeight={"300px"} overflowY={"scroll"}>
              {searchData &&
                searchData.map((item, i) => {
                  return (
                    <Box
                      display={"flex"}
                      height="60px"
                      border={"1px solid #9ed6a9"}
                      borderRadius={"4px"}
                      margin="10px"
                      padding={"10px"}
                      justifyContent="left"
                      alignItems={"center"}
                      gap="10px"
                      onClick={() => handleCreateChat(item._id)}
                    >
                      <Box>
                        <Img
                          width={"40px"}
                          borderRadius="50%"
                          src={item.avatar}
                        />
                      </Box>

                      <Box textAlign={"left"}>
                        <Text
                          color="#2f3337"
                          fontWeight={"bold"}
                          fontSize="16px"
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button bgColor="#43c651" color="white" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { SearchModal };
