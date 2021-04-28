const renderChat = require("../controllers/viewsController").renderChat;

const chatroomsRouter = require("express").Router();

chatroomsRouter.get('/', renderChat);

module.exports = chatroomsRouter;