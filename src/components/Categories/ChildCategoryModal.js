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

  // STATES
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [childName, setChildName] = useState("");
  const [childSlug, setChildSlug] = useState("");

  //  GET CATEGORIES
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

  //  GET SUB CATEGORIES (BY CATEGORY)
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

  //  LOAD CATEGORIES WHEN MODAL OPENS
  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  //  CATEGORY CHANGE
  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    setSubCategoryId("");
    setChildName("");
    setChildSlug("");

    if (id) fetchSubCategories(id);
  };

  //  SUBMIT CHILD CATEGORY
  const handleSubmit = async () => {
    if (
      categoryId === "" ||
      subCategoryId === "" ||
      childName === "" ||
      childSlug === ""
    ) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 1500,
      });
      return;
    }

    try {
      await axios.post(Config.add_child_category, {
        sub_category_id: Number(subCategoryId),
        name: childName,
        slug: childSlug,
      });

      toast({
        title: "Child Category Added Successfully",
        status: "success",
        duration: 1500,
      });

      // RESET FORM
      setCategoryId("");
      setSubCategoryId("");
      setChildName("");
      setChildSlug("");
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

          {/* CHILD NAME */}
          <FormControl mb={3}>
            <FormLabel>Child Category Name</FormLabel>
            <Input
              placeholder="Enter child category name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
          </FormControl>

          {/* CHILD SLUG */}
          <FormControl>
            <FormLabel>Child Slug</FormLabel>
            <Input
              placeholder="Enter Your Slug"
              value={childSlug}
              onChange={(e) => setChildSlug(e.target.value)}
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
