const express = require("express");
const { creactChat, getChats, creactGroup, renameGroup, addToGroup, removeFromGroup } = require("../Controller/chat.controller");

const chatRoutes = express.Router();

chatRoutes.post("/createchat", creactChat);

chatRoutes.get("/getchats", getChats);

chatRoutes.post("/groupchat", creactGroup);

chatRoutes.put("/renamegroup", renameGroup);

chatRoutes.put("/addtogroup", addToGroup);

chatRoutes.put("/removefromgroup", removeFromGroup);

module.exports = { chatRoutes };
