const { ChatModel } = require("../Models/chat.model");
const { MessageModel } = require("../Models/message.model");
const { UserModel } = require("../Models/user.model");



const allMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}


const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  console.log(content,chatId)
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.body._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

module.exports = { allMessages, sendMessage };
