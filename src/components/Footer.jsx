import React, { useContext }  from "react";
import "./Footer.css";
import LogoLoggedIn from "./LogoLoggedIn"
import { AuthContext } from "../Context/auth.context";
function Footer() {
  const { user, isLoggedIn } = useContext(AuthContext);
  return (
    <div className="Footer">
      {isLoggedIn && <p>{user.email}</p>}
      {/* <LogoLoggedIn /> */}
      {/* <LogoLoggedIn userEmail={user.email} />  */}
      <p className="Copyright">Copyright © 2024</p>
      <ul className="Footer-links">
        <li><a href="" target="_blank" rel="noopener noreferrer">Emmanuel Aron</a></li>
        <li><a href="" target="_blank" rel="noopener noreferrer">João Dias</a></li>
      </ul>
    </div>
  );
}
export default Footer;