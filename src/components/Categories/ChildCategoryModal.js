import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";

const ChildCategory = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (!name) {
      toast({
        title: "Child category name required",
        status: "warning",
        duration: 1500,
      });
      return;
    }

    try {
      await axios.post(Config?.get_sub_category, {
        name,
      });

      toast({
        title: "Child category added",
        status: "success",
        duration: 1500,
      });

      setName("");
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 1500,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Child Category</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Child Category Name</FormLabel>
            <Input
              placeholder="Enter child category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChildCategory;
