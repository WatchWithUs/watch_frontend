import React from 'react';
import { AuthContext } from "../Context/auth.context";

function Logout() {
  
  const { logOut } = useContext(AuthContext);

  return (
    <button onClick={logOut}>Logout</button>
  );
}

export default Logout;
