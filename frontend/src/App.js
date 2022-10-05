import socketIOClient from "socket.io-client";
import SocketContext from "./Context/SocketContext";

import "./App.css";
import { Sidebar } from "./Sidebar";
import { ChatWindow } from "./ChatWindow";
import { useEffect, useState } from "react";

const ENDPOINT = "http://localhost:3001";

const socket = socketIOClient(ENDPOINT);

function App() {
  const [username, setUserName] = useState(Math.floor(Math.random() * 100000));
  const [myPrivateKey, setMyprivatekey] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [reciever, setReciever] = useState({});

  const newUserSignedIn = () => {
    socket.emit("newusersignedin", { username });
  };

  const getAllUsers = () => {
    socket.on(
      "getallusers",
      (users) => {
        const updated = users.filter((item) => item.username !== username);
        setUserList(updated);
      },
      (privatekey) => {}
    );
  };

  useEffect(() => {
    newUserSignedIn();
    getAllUsers();
    socket.on("getPrivateKey", (privatekey) => {
      setMyprivatekey(privatekey);
    });
  }, []);

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <h1 className="header">{username}</h1>
        <div className="app2">
          <Sidebar
            userList={userList}
            setSelectedUser={setSelectedUser}
            setReciever={setReciever}
          />
          {selectedUser !== "" && (
            <ChatWindow
              username={username}
              selectedUser={selectedUser}
              reciever={reciever}
              myPrivateKey={myPrivateKey}
            />
          )}
        </div>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
