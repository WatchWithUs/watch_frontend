import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/collection">
        <button>Collections</button>
      </Link>

      <Link to="/collection/create">
        <button>Create Collection</button>
      </Link>
    </nav>
  );
}

export default Navbar;

//something