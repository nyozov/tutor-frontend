import { Routes, Route } from "react-router";
import "./App.css";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";
function App() {


  return (
    <Routes>
      <Route index element={<CreateRoom/>}/>
      <Route path="/rooms/:room" element={<Room/>}/>
    
    </Routes>
  );
}

export default App;
