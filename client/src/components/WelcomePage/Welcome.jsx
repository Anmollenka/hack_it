import React ,{useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import "./Welcome.css";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";



const Welcome = () => {
  const history = useHistory();
  const [name, setName] = React.useState("Anmol");
  const [room,setRoom]=React.useState("");
  useEffect(() => {
    setRoom(uuid());
    console.log(room);
  },[room]);

  function handleSubmit() {
    console.log(name+room)
    history.push({
      pathname: '/Compiler',
      search:`?name=${name}&room=${room}`
    });
  }

  return (
      <div>
        <Navbar />
        <div className="form welcome">
          <div className="form-group">
          <h1>ROOM DETAILS</h1>
          </div>
          <div className="form-group">
            <button onClick={handleSubmit}>CREATE ROOM</button>
          </div>
          <div class="or form-group">
            <hr class="bar" />
            <span>OR</span>
            <hr class="bar" />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="ENTER INVITE CODE"  
            ></input>
            <button>JOIN ROOM</button>
          </div>
        </div>
      </div>

    
  );
};
export default Welcome;