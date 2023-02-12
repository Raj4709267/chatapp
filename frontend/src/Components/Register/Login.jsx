import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginSuccess,
  signupFailiure,
  signupRequest,
} from "../../Redux/AuthReducer/action";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.AuthReducer);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { email, password };
    if (!email || !password) {
      setErrorMessage("Please fill all the details");
      setMessage("");
      return;
    }
    dispatch(signupRequest());
    try {
      const res = await axios.post("http://localhost:8000/user/login", payload);
      setMessage("Login successfull");
      setErrorMessage("");
      localStorage.setItem("userDetails", JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
      setEmail("");
      setPassword("");

    } catch (err) {
      console.log(err)
      setErrorMessage(err?.response?.data.message);
      setMessage("");
      dispatch(signupFailiure());
      setPassword("");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        marginBottom={"20px"}
        type="email"
        bg={"#ebf9ed"}
        placeholder="Enter Email"
        border="1px solid #43c651"
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
        Login
      </Button>
      {errorMessage !== "" && (
        <Text
          marginTop={"10px"}
          fontSize="18px"
          fontWeight={"bold"}
          color={"red"}
        >
          {errorMessage}
        </Text>
      )}
      {message !== "" && (
        <Text
          marginTop={"10px"}
          fontSize="18px"
          fontWeight={"bold"}
          color={"#43c651 "}
        >
          {message}{" "}
        </Text>
      )}
    </form>
  );
}

export default Login;
