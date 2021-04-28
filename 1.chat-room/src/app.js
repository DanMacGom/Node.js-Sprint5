const express = require('express');
const path = require("path");

const chatroomsRouter = require("./routes/chatrooms");
const authenticationRouter = require("./routes/users");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.use("/", authenticationRouter);
app.use("/chatrooms", chatroomsRouter);

module.exports = app;