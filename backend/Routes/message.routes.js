const express = require("express");
const { allMessages, sendMessage } = require("../Controller/message.controller");


const messageRoutes = express.Router();

messageRoutes.get("/:chatId",allMessages);
messageRoutes.post("/", sendMessage);

module.exports = {messageRoutes};
