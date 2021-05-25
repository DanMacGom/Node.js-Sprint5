const path = require("path");

const chatroomsController = require("../controllers/chatroomsController");
const chatroomsRouter = require("express").Router();

chatroomsRouter.get("/", chatroomsController.getAllChatrooms, (req, res) => res.render("chatrooms", { data: req.data }));
chatroomsRouter.post("/", chatroomsController.createChatroom);

chatroomsRouter.get("/:chatroomId", chatroomsController.getChatroom, (req, res) => res.render("chat", { data: req.data }));
chatroomsRouter.post("/:chatroomId", chatroomsController.postMessage);
chatroomsRouter.delete("/:chatroomId", chatroomsController.deleteChatroom);

chatroomsRouter.get("/:chatroomId/chat", chatroomsController.getChatroom, (req, res) => res.render("chat", { data: req.data }));

module.exports = chatroomsRouter;