import Modal from "../../../components/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddLocation = ({isOpen, onClose}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>Add Location</div>
    </Modal>
  );
};

export default AddLocation;
