import React,{useContext} from "react";
import UserContext from "../Context/UserContext";

export default function Logout(props) {
  let { setUser } = useContext(UserContext);
  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    props.history.push("/");
  }
  return (
    <>
      <div onClick={logout} className="item">
        Logout
      </div>
    </>
  );
}
