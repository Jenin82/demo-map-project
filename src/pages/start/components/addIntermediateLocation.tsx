import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../components/modal";
import InputWithIcon from "./InputWithIcon";
import { useMapStore } from "../../../services/store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddIntermediateLocation = ({ isOpen, onClose }: Props) => {
  const { locations, setLocations } = useMapStore();
  const [intermediateLocation, setIntermediateLocation] = useState("");
  const [suggestions, setSuggestions] = useState<
    { formatted: string; geometry: { lat: number; lng: number } }[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      // Clear input when the modal is opened
      setIntermediateLocation("");
    }
  }, [isOpen]);

  const fetchSuggestions = async (query: string) => {
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
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (value: string, position: [number, number]) => {
    setIntermediateLocation(value);

    // Insert the new intermediate location between the start and end locations
    const newLocations = [...locations];
    newLocations.splice(newLocations.length - 1, 0, { name: value, position });

    setLocations(newLocations);
    setSuggestions([]);
    onClose(); // Close modal after adding the intermediate location
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-2xl font-bold mb-4">Add Intermediate Location</div>
      <div className="w-full relative">
        <InputWithIcon
          iconSrc="/input3.svg"
          altText="Intermediate Point Icon"
          placeholder="Intermediate point"
          borderColorFocus="#B7B7B7"
          value={intermediateLocation}
          onChange={(e) => {
            setIntermediateLocation(e.target.value);
            fetchSuggestions(e.target.value);
          }}
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

export default AddIntermediateLocation;
