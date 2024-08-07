import styles from "../../components/layout/index.module.css";
import Map from "../../components/map";
import { useMapStore } from "../../services/store";
import AddLocation from "./components/addLocation";
import Initial from "./components/initial";
import MapTileSelector from "./components/mapTileSelector";
import Route from "./components/route";

const Start = () => {
  const { screen, isAddLocationModalOpen, isIntrmediateLocationModalOpen, isDraggable } =
    useMapStore();
  return (
    <div className={styles.Wrapper}>
      {!isAddLocationModalOpen && !isIntrmediateLocationModalOpen && !isDraggable && (
        <div
          className={`${styles.top} bg-gradient-to-b from-[#0e1a28e8] to-transparent`}
        >
          <button>
            <img src="/probtn.svg" alt="pro" />
          </button>
          <div>
            <button onClick={() => useMapStore.setState({ screen: 2 })}>
              <img src="/icon1.svg" alt="icon1" />
            </button>
            <button>
              <img src="/icon2.svg" alt="icon2" />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-end h-screen bottom-0 w-full z-10">
        <div className="absolute bottom-0 h-screen w-full -z-20">
          <Map />
        </div>
        {screen === 0 && <Initial />}
        {screen === 1 && <Route />}
        {screen === 2 && <MapTileSelector />}
        <AddLocation
          isOpen={isAddLocationModalOpen}
          onClose={() => {
            useMapStore.setState({ isAddLocationModalOpen: false });
          }}
        />
      </div>
    </div>
  );
};

export default Start;
