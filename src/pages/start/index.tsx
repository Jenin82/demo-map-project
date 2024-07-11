import { GoArrowRight } from "react-icons/go";
import styles from "../../components/layout/index.module.css";
import Map from "../../components/map";

const Start = () => {
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
          <img src="/startImage.png" alt="start end icon" />
          <div className="font-helvetica text-3xl font-bold leading-[29.3px]">
            Add locations to start
          </div>
          <div className="text-white font-helvetica opacity-60 text-lg">
            Hold on map or click add locations
          </div>
          <div className="rounded-full bg-white text-black p-5 text-xl font-bold flex justify-between flex-nowrap items-center w-96 mb-8 mt-6">
            <div>Add locations</div>
            <GoArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
