import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./Context/SocketContext";

export const Sidebar = ({ userList, setSelectedUser, setReciever }) => {
  return (
    <div className="sidebar">
      {userList?.map((item) => (
        <div
          style={{
            width: "100%",
            height: "70px",
          }}
          onClick={() => {
            setReciever(item);
            setSelectedUser(item.username);
          }}
        >
          {item.username}
        </div>
      ))}
    </div>
  );
};
