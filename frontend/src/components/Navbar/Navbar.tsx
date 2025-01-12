import Logo from "../icons/Logo";
import UserIcon from "../icons/UserIcon";
import styles from "./Navbar.module.css";
import { logoutUser } from "@/api/api";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser().then(() => {
      router.push("/");
    });
  };

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.logout} onClick={handleLogout}>
        <UserIcon />
        <span style={{ marginLeft: 10 }}>Logout</span>
      </div>
    </div>
  );
};
export default NavBar;
