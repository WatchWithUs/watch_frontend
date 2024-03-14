import React, { useContext } from 'react';
import { AuthContext } from '../Context/auth.context';
import './Footer.css';

function Footer() {
  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <div className="Footer">
      <div className="UserEmail">
        {isLoggedIn && <p>User: {user.name}</p>}
      </div>
      <div className="Copyright">
        <p>Copyright © 2024</p>
      </div>
      <ul className="Footer-links">
        <li><a href="https://github.com/emmanuelAron" target="_blank" rel="noopener noreferrer">Emmanuel Aron</a></li>
        <li><a href="https://github.com/jvfd1983" target="_blank" rel="noopener noreferrer">João Dias</a></li>
      </ul>
    </div>
  );
}

export default Footer;