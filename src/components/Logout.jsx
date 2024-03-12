import React from 'react';
import {logOut} from '../Context/auth.context'
function Logout() {
  return (
    <button onClick={logOut}>Logout</button>
  );
}
export default Logout;