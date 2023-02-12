import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/AuthReducer/action";
import io from "socket.io-client"

const endpoint="http://localhost:8000/"
let socket,selectedChatCompare;

function Chat() {
  const state = useSelector((store) => store.AuthReducer);

  const [text,setText]=useState("")

  const dispatch = useDispatch();

  function handleSend(){

  }

  useEffect(()=>{
    socket=io(endpoint);
  },[])
  
  useEffect(() => {
    dispatch(loginSuccess(JSON.parse(localStorage.getItem("userDetails"))));
  }, []);
  return <div>Chat

  <input type="text" onChange={(e)=>setText(e.target.value)} />
  <button onClick={handleSend}>send</button>

  </div>;
}

export default Chat;
