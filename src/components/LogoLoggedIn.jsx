import React from "react";

// function LogoLoggedIn({ userEmail }) --> replace with this line later
function LogoLoggedIn(props) {
    console.log(props)
  return (
    <div>
      <h2>XXX is logged in</h2>
      {/* <h2>{`${userEmail} is logged in`}</h2> */ } 
    </div>
  );
}

export default LogoLoggedIn;