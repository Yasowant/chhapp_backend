const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400);
  }

  try {
    // Step 1: Create the message
    let message = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    // Step 2: Populate sender and chat fields correctly
    message = await Message.findById(message._id)
      .populate('sender', 'name pic')
      .populate({
        path: 'chat',
        populate: {
          path: 'users',
          select: 'name pic email',
        },
      });

    // Step 3: Update latestMessage in Chat model
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
