import {Link} from "react-router-dom"

import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}><Link to={"/"}>TRINITY</Link></div>
    </nav>
  );
};

export default Navbar;
