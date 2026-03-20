import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router";

function CreateRoom() {
  const navigate = useNavigate();

  const createRoom = () => {
    socket.emit("create-room");
  };

  useEffect(() => {
    socket.on("room-created", (data) => {
      console.log("room created:", { data });
      navigate(`rooms/${data.roomId}`);
    });
    return () => {
      socket.off("room-created");
    };
  }, []);

  return (
    <>
      <button onClick={createRoom}>CreateRoom</button>
    </>
  );
}

export default CreateRoom;
