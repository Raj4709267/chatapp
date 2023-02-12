import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Text, VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";

import {
  signupFailiure,
  signupRequest,
  signupSuccess,
} from "../../Redux/AuthReducer/action";

function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [errorMessage,setErrorMessage]=useState("")
  const [message,setMessage]=useState("")

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.AuthReducer);

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { email, password, name };
    if(!email || !password || !name){
      setErrorMessage("Please fill all the details")
      setMessage("")
      return;
    }
    console.log(payload)
    dispatch(signupRequest());
    try {
      const res = await axios.post(
        "http://localhost:8000/user/signup",
        payload
      );
      setMessage(res.data.message);
      setErrorMessage("")
      dispatch(signupSuccess(res.data.message));
      setName("")
      setEmail("")
      setPassword("")
    } catch (err) {
      setErrorMessage(err.response.data.message)
      dispatch(signupFailiure());
      setPassword("")

    }
  }
  return (

    <form onSubmit={handleSubmit}>
      <Input
        marginBottom={"20px"}
        type="text"
        bg={"#ebf9ed"}
        border="1px solid #43c651"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <Input
        marginBottom={"20px"}
        type="email"
        bg={"#ebf9ed"}
        border="1px solid #43c651"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputGroup size="md">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          marginBottom={"20px"}
          bg={"#ebf9ed"}
          border="1px solid #43c651"
          placeholder="Enter Password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button width={"100%"} bg={"#43c651"} color={"white"} type="submit">
        {isLoading ? <Spinner /> : "Signup"}
      </Button>
      {errorMessage!==""&&<Text marginTop={"10px"} fontSize="18px" fontWeight={"bold"}  color={"red"}>{errorMessage}</Text>}
      {message!==""&&<Text marginTop={"10px"} fontSize="18px" fontWeight={"bold"} color={"#43c651 "}>{message} </Text>}
      {message!==""&&<Text marginTop={"10px"} fontSize="18px" fontWeight={"bold"} color={"#43c651 "}>Go to login </Text>}
    </form>
  );
}

export default Signup;
