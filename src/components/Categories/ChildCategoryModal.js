import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
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
import { useColorModeValue } from "@chakra-ui/react";

const ChildCategory = ({ isOpen, onClose }) => {
  const toast = useToast();

  // STATES
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [childName, setChildName] = useState("");
  const [childSlug, setChildSlug] = useState("");

  const bgColor = useColorModeValue("#2664a7", "#1E293B");
  const textColor = useColorModeValue("white","gray.100");
   const bgHover = useColorModeValue("#1e6abb", "#172336");
      

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
         <Flex bg={bgColor} color={textColor} px="16px" py="5px" justify="space-between" algin="center" borderTopRadius="md">
          <Text fontWeight="bold"> Add Child Category</Text>
               <ModalCloseButton position="static" />
        </Flex>
        <ModalBody>
          {/* CATEGORY */}
          <FormControl mb="2px" isRequired>
            <FormLabel fontSize="12px" fontWeight={500} >Category</FormLabel>
            <Select
            fontSize="12px"
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
          <FormControl mb={2} isRequired >
            <FormLabel fontSize="12px" fontWeight={500}>Sub Category</FormLabel>
            <Select
             fontSize="12px"
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
          <FormControl mb={2} isRequired>
            <FormLabel fontSize="12px" fontWeight={500}>Child Category Name</FormLabel>
            <Input
             fontSize="12px"
              placeholder="Enter child category name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
          </FormControl>

          {/* CHILD SLUG */}
          <FormControl mb={2} isRequired>
            <FormLabel fontSize="12px" fontWeight={500}>Child Slug</FormLabel>
            <Input
             fontSize="12px"
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
          <Button 
           bg={bgColor}
          color={textColor}
          _hover={{bgColor:bgHover}}  onClick={handleSubmit}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChildCategory;
