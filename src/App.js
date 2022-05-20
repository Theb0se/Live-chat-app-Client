import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  const [joinRoom, setjoinRoom] = useState(false);
  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setjoinRoom(true)
    } else {
      console.log("err");
    }
  };

  return (
    <div className="App">
      {!joinRoom ? (
        <div className="join">
          <h3> Join A Chat </h3>
          <input
            type="text"
            placeholder="Name..."
            autoFocus={true}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setroom(e.target.value);
            }}
          />
          <button onClick={joinroom}> Join A Chat </button>
        </div>
      ) : (
        <Chat room={room} username={username} socket={socket} />
      )}
    </div>
  );
}

export default App;
