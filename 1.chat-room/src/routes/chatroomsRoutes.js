const path = require("path");

const chatroomsController = require("../controllers/chatroomsController");
const chatroomsRouter = require("express").Router();

chatroomsRouter.get(
    "/", 
    chatroomsController.getAllChatroomsMiddleware, 
    (req, res) => res.render("chatrooms", { data: req.data })
);
chatroomsRouter.post(
    "/", 
    chatroomsController.createChatroomMiddleware,
    (req, res) => res.redirect("chatrooms")
);

chatroomsRouter.get(
    "/:chatroomId", 
    chatroomsController.getChatroomMiddleware, 
    (req, res) => res.render("chat", { data: req.data })
);
chatroomsRouter.delete(
    "/:chatroomId", 
    chatroomsController.deleteChatroom
);

chatroomsRouter.get(
    "/:chatroomId/chat", 
    chatroomsController.getChatroomMiddleware, 
    (req, res) => res.render("chat", { data: req.data })
);

module.exports = chatroomsRouter;