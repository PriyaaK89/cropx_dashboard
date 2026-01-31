import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  Textarea,
  Heading,
  VStack,
  useToast,
  SimpleGrid,
  Image,
  InputGroup,
  InputRightElement,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import { GoHomeFill } from "react-icons/go";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import { Link } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { useColorModeValue } from "@chakra-ui/react";

const AddProduct2 = () => {
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    sub_category_id: "",
    child_category_id: "",
    brand: "",
    product_description: "",
    product_type: "",
    mfg_date: "",
    exp_date: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  /* ================= APIs ================= */

  const fetchCategories = async () => {
    setCategoryLoading(true);
    try {
      const res = await axios.get(Config.get_categories);
      setCategories(res?.data?.categories || []);
    } catch (error) {
      toast({ title: "Category load failed", status: "error" });
    }
    setCategoryLoading(false);
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `${Config.get_sub_category}?category_id=${categoryId}`,
      );
      setSubCategories(res?.data?.data || []);
    } catch (err) {
      toast({ title: "Sub Category load failed", status: "error" });
    }
  };

  const fetchChildCategories = async (subCategoryId) => {
    setCategoryLoading(true);
    try {
      const res = await axios.get(
        `${Config.get_child_category}?sub_category_id=${subCategoryId}`,
      );
      setChildCategories(res?.data?.data || []);
    } catch (err) {
      toast({ title: "Child Category load failed", status: "error" });
    }
    setCategoryLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setFormData({
      ...formData,
      category_id: id,
      sub_category_id: "",
      child_category_id: "",
    });
    setSubCategories([]);
    setChildCategories([]);
    if (id) fetchSubCategories(id);
  };

  const handleSubCategoryChange = (e) => {
    const id = e.target.value;
    setFormData({
      ...formData,
      sub_category_id: id,
      child_category_id: "",
    });
    setChildCategories([]);
    if (id) fetchChildCategories(id);
  };

  const handleImage = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) setPreview(URL.createObjectURL(img));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
    if (file) fd.append("product_img", file);

    try {
      await axios.post(Config.add_product, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Product Added Successfully",
        status: "success",
        duration: 2000,
      });

      setFormData({
        product_name: "",
        category_id: "",
        sub_category_id: "",
        child_category_id: "",
        brand: "",
        product_description: "",
        product_type: "",
        mfg_date: "",
        exp_date: "",
      });
      setFile(null);
      setPreview("");
    } catch (err) {
      toast({
        title: "Product Add Failed",
        status: "error",
        duration: 2000,
      });
    }
  };
  const pageBg = useColorModeValue("gray.50", "#0E1629");
  const cardBg = useColorModeValue("white", "#1E293B");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const inputBg = useColorModeValue("white", "gray.700");
  const labelColor = useColorModeValue("gray.700", "gray.300");

  /* ================= UI ================= */

  return (
    <Box width="100%" bg={pageBg} pt={{ base: "60px", lg: 0 }}>
      <Flex>
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>

        <Box
          width={{ base: "100%", lg: "calc(100% - 260px)" }}
          ml={{ base: 0, lg: "260px" }}
          px={{ base: 0, lg: 6 }}
          mb={5}
        >
          <Box display={{ base: "block", lg: "none" }}>
            <ResponsiveNavbar />
          </Box>
          <Box
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="0px"
            left="0px"
            right="0px"
            bottom="0px"
            zIndex="11"
          >
            <TopBar />
          </Box>
          <Box
            bg={cardBg}
            textColor={textColor}
            p={4}
            // mt={4}
            boxShadow="lg"
            borderRadius="0.75rem"
            mx={{ base: 3, lg: 0 }}
            mt={4}
          >
            {/* BREDCRUMB */}
            <HStack justifyContent="space-between" mb={4}>
              <Breadcrumb fontSize="13px">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/" aria-label="Home">
                    <GoHomeFill />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/product-list">
                    Product List
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>Add Product</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading fontSize="sm" mb={4}>
                Add New Product
              </Heading>
            </HStack>

            <SimpleGrid columns={[1, 1, 2]} spacing={6}>
              {/* LEFT */}
              <VStack spacing={4} align="stretch">
                <FormControl mb="4px" isRequired>
                  <FormLabel color={labelColor} fontSize="12px">
                    Product Name
                  </FormLabel>
                  <Input
                    fontSize="12px"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    bgColor={inputBg}
                  />
                </FormControl>

                <FormControl mb="4px" isRequired>
                  <FormLabel color={labelColor} fontSize="12px">
                    Product Category
                  </FormLabel>
                  <Select
                    fontSize="12px"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                    placeholder="Select Category"
                    bg={inputBg}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.cate_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px" isRequired>
                  <FormLabel color={labelColor} fontSize="12px">
                    Sub Category
                  </FormLabel>
                  <Select
                    name="sub_category_id"
                    value={formData.sub_category_id}
                    onChange={handleSubCategoryChange}
                    isDisabled={!formData.category_id}
                    placeholder="Select Sub Category"
                    fontSize="12px"
                    bg={inputBg}
                  >
                    {subCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px" isRequired>
                  <FormLabel color={labelColor} fontSize="12px">
                    Child Category
                  </FormLabel>
                  <Select
                    fontSize="12px"
                    name="child_category_id"
                    value={formData.child_category_id}
                    onChange={handleChange}
                    isDisabled={!formData.sub_category_id}
                    placeholder="Select Child Category"
                    bg={inputBg}
                  >
                    {childCategories.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px" isRequired>
                  <FormLabel color={labelColor} fontSize="12px">
                    Brand
                  </FormLabel>
                  <Input
                    fontSize="12px"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    bg={inputBg}
                  />
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel color={labelColor} fontSize="12px">
                    Product Description
                  </FormLabel>
                  <Textarea
                    fontSize="12px"
                    name="product_description"
                    value={formData.product_description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    bg={inputBg}
                  />
                </FormControl>
              </VStack>

              {/* RIGHT */}
              <VStack spacing={4} align="stretch">
                <FormControl mb="4px" isRequired>
                  <FormLabel color={labelColor} fontSize="12px">
                    Product Type
                  </FormLabel>
                  <Select
                    name="product_type"
                    value={formData.product_type}
                    onChange={handleChange}
                    fontSize="14px"
                    bg={inputBg}
                  >
                    <option value="">Select Type</option>
                    <option value="solid">Solid</option>
                    <option value="liquid">Liquid</option>
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel color={labelColor} fontSize="12px">
                    Mfg Date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      fontSize="12px"
                      type="date"
                      name="mfg_date"
                      value={formData.mfg_date}
                      onChange={handleChange}
                      bg={inputBg}
                    />
                    <InputRightElement>
                      {/* <CalendarIcon color="gray.500" /> */}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel color={labelColor} fontSize="12px">
                    Expiry Date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      fontSize="12px"
                      type="date"
                      name="exp_date"
                      value={formData.exp_date}
                      onChange={handleChange}
                      bg={inputBg}
                    />
                    <InputRightElement>
                      {/* <CalendarIcon color="gray.500" /> */}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel color={labelColor} fontSize="12px">
                    Upload Image
                  </FormLabel>

                  <Box
                    border="2px dashed"
                    borderColor="gray.300"
                    borderRadius="md"
                    p={6}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ borderColor: "blue.400" }}
                    onClick={() =>
                      document.getElementById("productImage").click()
                    }
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        mx="auto"
                        maxH="160px"
                        objectFit="contain"
                      />
                    ) : (
                      <>
                        <FiUploadCloud size={40} color="#4299E1" />
                        <Text mt={2} fontSize="sm" color="gray.500">
                          Drop your image here or{" "}
                          <Text as="span" color="blue.500" fontWeight="bold">
                            click to browse
                          </Text>
                        </Text>
                      </>
                    )}

                    <Input
                      type="file"
                      id="productImage"
                      display="none"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </Box>
                </FormControl>
              </VStack>
            </SimpleGrid>

            <Flex justify="flex-end" mt={6}>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Add Product
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddProduct2;
