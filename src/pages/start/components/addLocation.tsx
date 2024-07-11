import { useState } from "react";
import axios from "axios";
import Modal from "../../../components/modal";
import InputWithIcon from "./InputWithIcon";
import { useMapStore } from "../../../services/store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddLocation = ({ isOpen, onClose }: Props) => {
  const { positions, setPositions } = useMapStore();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [suggestions, setSuggestions] = useState<
    { formatted: string; geometry: { lat: number; lng: number } }[]
  >([]);
  const [selectedInput, setSelectedInput] = useState<null | number>(null);

  const fetchSuggestions = async (query: string, inputValue: number) => {
    if (query.length > 0) {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: query,
            key: "88aa42e37cc94e70af7c87b890847c87",
          },
        }
      );
      setSuggestions(response.data.results);
      setSelectedInput(inputValue);
    } else {
      setSuggestions([]);
      setSelectedInput(null);
    }
  };

  const handleSelect = (value: string, position: [number, number]) => {
    if (selectedInput === 1) {
      setStartLocation(value);
      setPositions([position, positions[1]]);
    } else if (selectedInput === 2) {
      setEndLocation(value);
      setPositions([positions[0], position]);
      useMapStore.setState({ screen: 1 });
    }
    setSuggestions([]);
    setSelectedInput(null);
  };

  const handleSwap = () => {
    setStartLocation(endLocation);
    setEndLocation(startLocation);
    setPositions([positions[1], positions[0]]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-2xl font-bold mb-4">Add Locations</div>
      <div className="w-full relative">
        <InputWithIcon
          iconSrc="/input1.svg"
          altText="Starting Point Icon"
          placeholder="Starting point"
          borderColorFocus="#B97FFF"
          value={startLocation}
          onChange={(e) => {
            setStartLocation(e.target.value);
            fetchSuggestions(e.target.value, 1);
          }}
        />
        <InputWithIcon
          iconSrc="/input2.svg"
          altText="Ending Point Icon"
          placeholder="Ending point"
          borderColorFocus="#00C299"
          value={endLocation}
          onChange={(e) => {
            setEndLocation(e.target.value);
            fetchSuggestions(e.target.value, 2);
          }}
        />
        <img
          className="absolute right-[-1.5rem] top-1/2 transform bg-[#1F2024] border-2 border-[#131418] rounded-full -translate-y-1/2 w-12 h-12 z-20 -translate-x-14 p-3 cursor-pointer"
          src="/swap.svg"
          alt="Swap Icon"
          onClick={handleSwap}
        />
        {suggestions.length > 0 && (
          <ul className="w-full bg-transparent">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.formatted}
                className="px-4 py-2 cursor-pointer bg-transparent"
                onClick={() =>
                  handleSelect(suggestion.formatted, [
                    suggestion.geometry.lat,
                    suggestion.geometry.lng,
                  ])
                }
              >
                {suggestion.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default AddLocation;
