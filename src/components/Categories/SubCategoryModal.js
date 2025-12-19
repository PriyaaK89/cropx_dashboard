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
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subName, setSubName] = useState("");
  const toast = useToast();

  // 🔹 GET CATEGORY LIST
  const fetchCategories = async () => {
    try {
      const res = await axios.get(Config?.get_categories);
      setSubCategories(res?.data?.categories || []);
    } catch (error) {
      toast({
        title: "Failed to load categories",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 ADD SUB CATEGORY
  const handleSubmit = async () => {
  if (!categoryId || !subName) {
    toast({
      title: "All fields are required",
      status: "warning",
      duration: 1500,
      isClosable: true,
    });
    return;
  }

  try {
    const payload = {
      category_id: Number(categoryId), // 🔥 IMPORTANT
      name: subName,
    };

    console.log("ADD PAYLOAD", payload);

    const res = await axios.post(Config?.add_sub_category, payload);
    console.log("ADD RESPONSE ", res.data);

    toast({
      title: "Sub Category Added Successfully",
      status: "success",
      duration: 1500,
      isClosable: true,
    });

    setSubName("");
    setCategoryId("");
    onClose();
  } catch (error) {
    console.error("ADD ERROR ", error);

    toast({
      title: error?.response?.data?.message || "Something went wrong",
      status: "error",
      duration: 1500,
      isClosable: true,
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
              {subCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.cate_name}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* SUB CATEGORY INPUT ✅ */}
          <FormControl mb={4}>
            <FormLabel>Sub Category Name</FormLabel>
            <Input
              placeholder="Enter sub category name"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
            />
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
