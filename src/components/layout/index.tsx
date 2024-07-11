import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import Map from "../map";

const Layout: React.FC = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.top}>
        <button>icon PRO icon</button>
        <div>
          <button>icon</button>
          <button>icon</button>
        </div>
      </div>
      <Map />
      <div className="relative bottom-0 z-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
