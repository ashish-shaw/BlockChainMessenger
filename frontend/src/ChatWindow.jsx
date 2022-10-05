import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./Context/SocketContext";
import EncryptRsa from "encrypt-rsa";

export const ChatWindow = ({
  username,
  selectedUser,
  reciever,
  myPrivateKey,
}) => {
  const encryptRsa = new EncryptRsa();
  const socket = useContext(SocketContext);
  const [msgList, setMsgList] = useState([]);
  const [myMessage, setMyMessage] = useState("");

  const handleSendText = () => {
    setMsgList([...msgList, myMessage]);
    const encryptedText = encryptRsa.encryptStringWithRsaPublicKey({
      text: myMessage,
      publicKey: reciever.publicKey,
    });
    socket.emit("send-message", { message: encryptedText, username, reciever });
    setMyMessage("");
  };
  useEffect(() => {
    socket.on("get-message", (message) => {
      const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({
        text: message.text,
        privateKey: myPrivateKey,
      });
      // console.log(decryptedText, messageList);
      setMsgList([...msgList, decryptedText]);
    });
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "50%",
      }}
    >
      {msgList?.map((item) => (
        <div
          style={{
            height: "100px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              height: "100%",
              width: "50%",
              fontSize: "20px",
              padding: "20px",
            }}
          >
            {item}
          </div>
        </div>
      ))}

      <input
      className="input"
        type="text"
        value={myMessage}
        onChange={(e) => setMyMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendText}>Send</button>
    </div>
  );
};
