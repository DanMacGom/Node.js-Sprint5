# Usage
Navigate to root folder.<br>
`npm install`<br>
`npm start`<br>

# .env
You need to create a .env and fill it with your environment variables (variable names in .env_example).

# Branches
Check main branch for solution to Nivell1.<br>
Check google-auth for solution to Nivell2.

# Routes
## Sign up
GET / :  _renders index.html_<br>

POST / :_create user_<br>
Request Body: _username, password_

## Login
GET /login : _renders login.html_<br>
POST /login : _logs the user in_<br>
Request Body: _username, password_

## Users
GET /users : _returns all users in database in JSON format_<br>
DELETE /users/:userId : _delete user with id userId_

## Chatrooms
GET /chatrooms : _renders chatrooms.ejs which contains a list of buttons to access GET /chatrooms/:chatroomId/chat_<br>
POST /chatrooms : _creates a chatroom with a certain name_<br>
Request Body: _chatroomName_

GET /chatrooms/:chatroomId : _renders chat.html corresponding to its chatroomId_<br>
DELETE /chatrooms/:chatroomId : _deletes chatroom with corresponding id_

GET /chatrooms/:chatroomId/chat : _renders chat.ejs corresponding to its id_