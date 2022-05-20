import React, { useState, useEffect } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, username, room }) {
  const [currentMessege, setcurrentMessege] = useState("");
  const [msgList, setmsgList] = useState([]);

  const sendMessege = async () => {
    if (currentMessege !== "") {
      const msgData = {
        room: room,
        username: username,
        messege: currentMessege,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setmsgList((list) => [...list, msgData]);
      setcurrentMessege("");
    }
  };

  useEffect(() => {
    socket.on("recive_msg", (data) => {
      console.log(data);
      setmsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-msg">
      <div className="chat">
        <div className="chatHeader">
          <h4>Live Chat</h4>
        </div>{" "}
        <ScrollToBottom className="msg-container" mode="bottom">
          <div className="chatBody">
            {msgList.map((msgContent) => {
              return (
                <div
                  className="messege"
                  id={username === msgContent.username ? "you" : "other"}
                >
                  <div className="msg-content">
                    <p>{msgContent.messege}</p>
                  </div>
                  <div className="msg-meta">
                    {" "}
                    <p className="username">{msgContent.username}</p>
                    <p>{msgContent.time}</p>
                  </div>
                </div>
              );
            })}
          </div>{" "}
        </ScrollToBottom>
        <div className="chatFooter">
          <input
            type="text"
            placeholder="Write Your Msg Here"
            value={currentMessege}
            onChange={(e) => {
              setcurrentMessege(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessege();
            }}
          />
          <button onClick={sendMessege}>Send</button>
        </div>
      </div>
    </div>
  );
}
