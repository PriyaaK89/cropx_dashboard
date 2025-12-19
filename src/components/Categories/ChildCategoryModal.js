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

const ChildCategory = ({ isOpen, onClose }) => {
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [childName, setChildName] = useState("");

  // 🔹 GET CATEGORY
  const fetchCategories = async () => {
    try {
      const res = await axios.get(Config.get_categories);
      setCategories(res?.data?.categories || []);
    } catch {
      toast({
        title: "Failed to load categories",
        status: "error",
        duration: 1500,
      });
    }
  };

  // 🔹 GET SUB CATEGORY (BASED ON CATEGORY ID)
  const fetchSubCategories = async (catId) => {
    try {
      const res = await axios.get(
        `${Config.get_sub_category}?category_id=${catId}`
      );
      setSubCategories(res?.data?.data || []);
    } catch {
      toast({
        title: "Failed to load sub categories",
        status: "error",
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  // 🔹 CATEGORY CHANGE → LOAD SUB CATEGORY
  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    setSubCategoryId("");
    setSubCategories([]);

    if (id) fetchSubCategories(id);
  };

  // 🔹 ADD CHILD CATEGORY
  const handleSubmit = async () => {
    if (!categoryId || !subCategoryId || !childName) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 1500,
      });
      return;
    }

    try {
      await axios.post(Config.add_child_category, {
        category_id: Number(categoryId),
        sub_category_id: Number(subCategoryId),
        name: childName,
      });

      toast({
        title: "Child Category Added Successfully",
        status: "success",
        duration: 1500,
      });

      setCategoryId("");
      setSubCategoryId("");
      setChildName("");
      onClose();
    } catch {
      toast({
        title: "Failed to add child category",
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
          {/* CATEGORY */}
          <FormControl mb={3}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              value={categoryId}
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.cate_name}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* SUB CATEGORY */}
          <FormControl mb={3}>
            <FormLabel>Sub Category</FormLabel>
            <Select
              placeholder="Select sub category"
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
              isDisabled={!categoryId}
            >
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* CHILD CATEGORY INPUT */}
          <FormControl>
            <FormLabel>Child Category Name</FormLabel>
            <Input
              placeholder="Enter child category name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
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

export default ChildCategory;
