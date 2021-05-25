const Chatroom = require("../models/chatroomsModel");

function createChatroom(req, res) {
    if (!req.body.chatroomName) {
        res.status(400).send({
            message: "Specify a chatroomName."
        });
    } else {
        Chatroom.create(
            {
                chatroomName: req.body.chatroomName,
                messages: [],
                createdBy: req.cookies["session-cookie"].username
            },
            async (err, data) => {
                if (err && err.name === "ValidationError") {
                    const chatroom = await Chatroom.findOne(
                        { chatroomName: req.body.chatroomName }
                    ).exec();

                    res.status(409).send({
                        message: `A chatroom with name ${req.body.chatroomName} already exists, try another one.`,
                        _id: chatroom._id
                    });
                } else if (err) {
                    console.log(err);
                    res.status(500).send({
                        message: "There was an error with your query."
                    });
                } else {
                    res.status(200).send(data);
                }
            }
        );
    }
}

async function deleteChatroom(req, res) {
    const chatroom = await Chatroom.findOne(
        { _id: req.params.chatroomId },  
        { createdBy: 1 }
    ).exec();

    if (chatroom && req.cookies["session-cookie"].username === chatroom.createdBy) {
        Chatroom.deleteOne(
            { _id: req.params.chatroomId },
            (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: "There was a problem with your query."
                    });
                } else {
                    res.status(200).send(data);
                }
            }
        );
    } else if (!chatroom) {
        res.status(404).send({
            message: `Chatroom '${req.body.chatroomId}' not found.`
        })
    } else {
        res.status(401).send({
            message: "Only the creator of the chatroom is allowed to delete it."
        });
    }
}

function getChatroom(req, res, next) {
    Chatroom.find(
        { _id: req.params.chatroomId },
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "An error occurred with your query."
                });
            } else {
                req.data = data;
                next();
            }
        }
    );
}

// function joinChatroom(req, res) {
//     const userInChatroom = (await Chatroom.findOne(
//         { _id: req.params.chatroomId },
//         { usernames: 1 }
//     ).exec()).forEach(user => user === jwtDecode(req.headers["authorization"]).username);

//     console.log(userInChatroom);
//     if (!any(userInChatroom)) {
//         Chatroom.updateOne(
//             { _id: req.params.chatroomId },
//             { 
//                 $push: {
//                     usernames: jwtDecode(req.headers["authorization"]).username
//                 }
//             }
//         );
//     }
// }

function postMessage(req, res) {
    if (!req.body.chatMessage) {
        res.status(400).send({
            message: "Specify a chatMessage."
        });
    }

    Chatroom.updateOne(
        { _id: req.params.chatroomId },
        { 
            $push: {
                messages: { 
                    username: req.cookies["session-cookie"].username,
                    content: req.body.chatMessage
                }
            }
        },
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "There was an error with your query."
                });
            } else {
                res.status(200).send({
                    message: `'${req.body.chatMessage}' was sent.`
                });
            }
        }
    );
}

function getAllChatrooms(req, res, next) {
    Chatroom.find(
        {}, 
        { chatroomName: 1, _id: 1 },
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "There was an error with your query."
                });
            } else {
                req.data = data;
                next();
            }
        }
    )
}

module.exports = {
    createChatroom,
    getChatroom,
    postMessage,
    getAllChatrooms,
    deleteChatroom
}
