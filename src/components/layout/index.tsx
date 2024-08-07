import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import Map from "../map";

const Layout: React.FC = () => {
  return (
    <div className={styles.Wrapper}>
      <div
        className={`${styles.top} bg-gradient-to-b from-[#0e1a28e8] to-transparent`}
      >
        <button>
          <img src="/probtn.svg" alt="pro" />
        </button>
        <div>
          <button>
            <img src="/icon1.svg" alt="icon1" />
          </button>
          <button>
            <img src="/icon2.svg" alt="icon2" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-end h-screen bottom-0 w-full z-10">
        <div className="absolute bottom-0 h-screen w-full -z-20">
          <Map />
        </div>
        <div className="flex flex-col justify-center items-center text-center text-white bg-gradient-to-b from-transparent to-[#0e1a28e8]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
