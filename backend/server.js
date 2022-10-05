const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const { newUserSignIn, users } = require("./utils/users");
const { formateMessage } = require("./utils/message");
const server = http.createServer();
const EncryptRsa = require("encrypt-rsa").default;

const socketio = require("socket.io");

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

require("./routes")(app);

io.on("connection", (socket) => {
  const encryptRsa = new EncryptRsa();
  const { privateKey, publicKey } = encryptRsa.createPrivateAndPublicKeys();
  socket.emit("getallusers", users);
  socket.emit("getPrivateKey", privateKey);
  socket.on("newusersignedin", ({ username }) => {
    newUserSignIn(socket.id, username, publicKey);
    socket.broadcast.emit("getallusers", users);
  });

  socket.on("send-message", ({ message, username, reciever }) => {
    const user = newUserSignIn(socket.id, username);
    socket.broadcast.to(reciever.socketId).emit("get-message", {
      sockedId: socket.id,
      ...formateMessage(user.username, message),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log("Listing on port 3001");
});
