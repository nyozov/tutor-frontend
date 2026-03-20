import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { socket } from "../socket";

const Room = () => {
  const [participants, setParticipants] = useState([]);
  const { room } = useParams();
  const navigate = useNavigate();

  const leaveRoom = () => {
    socket.emit("leave-room", room);
    navigate("/");
  };

  useEffect(() => {
    if (!socket.connected) {
      console.log("connecting...");
      socket.connect();
      console.log('connected')
      
    }

    socket.emit("join-room", room);

      const handleParticipants = (data) => {
    console.log("participants received:", data);
    setParticipants(data.participants);
  };

  socket.on("participants", handleParticipants);

    return () => {
      socket.off("participants");

      socket.emit("leave-room", room);
    };
  }, [room]);

  return (
    <div>
      <h1>Room {room}</h1>
      <h2>Participants:</h2>
      <span>{JSON.stringify(participants)}</span>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
};

export default Room;
