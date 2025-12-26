import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { useState } from "react";

const DeleteCollectionModal = ({
  isOpen,
  onClose,
  collectionId,
  fetchCollections,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${Config?.delete_collections}/${collectionId}`);

      toast({
        title: "Collection deleted successfully",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      fetchCollections(); // refresh list
      onClose();
    } catch (error) {
      toast({
        title: "Failed to delete collection",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Collection</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Are you sure you want to delete this collection?  
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button
            colorScheme="red"
            onClick={handleDelete}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCollectionModal;
