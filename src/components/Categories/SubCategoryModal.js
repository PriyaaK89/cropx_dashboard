import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";

const SubCategory = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subName, setSubName] = useState("");
  const toast = useToast();

  // 🔹 FETCH CATEGORY LIST
  const fetchCategories = async () => {
    try {
      const res = await axios.get(Config?.get_sub_category;
      console.log("add category", res);
      setCategories(res.data.categories);
    } catch (error) {
      toast({
        title: "Failed to load categories",
        status: "error",
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // 🔹 SUBMIT
  const handleSubmit = async () => {
    if (!categoryId || !subName) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 1500,
      });
      return;
    }

    try {
      await axios.post(Config?.get_sub_category{
        
        categoryId,
        name: subName,
      });

      toast({
        title: "Sub Category Added",
        status: "success",
        duration: 1500,
      });

      setSubName("");
      setCategoryId("");
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
        <ModalHeader>Add Sub Category</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* CATEGORY DROPDOWN */}
          <FormControl mb={4}>
            <FormLabel>Select Category</FormLabel>
            <Select
              placeholder="Select category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.cate_name}
                </option>
              ))}
            </Select>
          </FormControl>

         
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubCategory;
