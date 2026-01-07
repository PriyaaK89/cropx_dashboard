import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Text,
  VStack,
  useToast,
  SimpleGrid,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { CalendarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import { FiUploadCloud } from "react-icons/fi";


// ================= SAFE DATE =================
const safeDate = (dateStr) => {
  if (!dateStr) return null;
  const onlyDate = dateStr.slice(0, 10);
  const y = Number(onlyDate.slice(0, 4));
  const m = Number(onlyDate.slice(5, 7)) - 1;
  const d = Number(onlyDate.slice(8, 10));
  return new Date(y, m, d);
};

// ================= CUSTOM DATE INPUT =================
const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <InputGroup>
    <Input
      ref={ref}
      value={value || ""}
      placeholder={placeholder}
      onClick={onClick}
      cursor="pointer"
      isReadOnly
    />
    <InputRightElement onClick={onClick} cursor="pointer">
      <CalendarIcon color="gray.500" />
    </InputRightElement>
  </InputGroup>
));
CustomDateInput.displayName = "CustomDateInput";


// ================= COMPONENT =================
const UpdateProduct = () => {
  const { id } = useParams();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    brand: "",
    product_description: "",
    product_type: "",
    mfg_date: null,
    exp_date: null,
  });

  // ================= IMAGE HANDLERS =================
  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleResetImage = () => {
    setPreview("");
    setFile(null);
    const input = document.getElementById("productImage");
    if (input) input.value = "";
  };

  // ================= FETCH =================
  const fetchCategories = async () => {
    const res = await axios.get(Config.get_categories);
    setCategories(res?.data?.categories || []);
  };

  const fetchProduct = async () => {
    const res = await axios.get(`${Config.get_product_by_id}/${id}`);
    const data = res?.data?.product;

    setFormData({
      product_name: data?.product_name || "",
      category_id: data?.category_id || "",
      brand: data?.brand || "",
      product_description: data?.product_description || "",
      product_type: data?.product_type || "",
      mfg_date: safeDate(data?.mfg_date),
      exp_date: safeDate(data?.exp_date),
    });

    setPreview(data?.product_img || "");
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  // ================= HANDLERS =================
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (date, name) =>
    setFormData({ ...formData, [name]: date });

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      mfg_date: formData.mfg_date
        ? formData.mfg_date.toISOString().split("T")[0]
        : "",
      exp_date: formData.exp_date
        ? formData.exp_date.toISOString().split("T")[0]
        : "",
    };

    const fd = new FormData();
    Object.keys(payload).forEach((k) => fd.append(k, payload[k]));
    if (file) fd.append("product_img", file);

    try {
      await axios.put(`${Config.update_product}/${id}`, fd);
      toast({ title: "Product Updated Successfully", status: "success" });
    } catch {
      toast({ title: "Update Failed", status: "error" });
    }
  };

  // ================= UI =================
  return (
    <Box bg="#f8f8fb" pt={{ base: "60px", lg: 0 }}>
      <Flex>
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>

        <Box w={{ base: "100%", lg: "calc(100% - 260px)" }} ml={{ lg: "260px" }} px={6}>
          <Box display={{ base: "block", lg: "none" }}>
            <ResponsiveNavbar />
          </Box>

          <Box display={{ base: "none", lg: "block" }} position="sticky" top="0" zIndex={100}>
            <TopBar />
          </Box>

          <Box bg="white" mt={4} p={4} borderRadius="lg" boxShadow="md">
            <Breadcrumb fontSize="13px">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  <GoHomeFill />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/product-list">
                  Product List
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>Update Product</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={5}>
              <VStack align="stretch">
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input name="product_name" value={formData.product_name} onChange={handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select name="category_id" value={formData.category_id} onChange={handleChange}>
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.cate_name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea name="product_description" value={formData.product_description} onChange={handleChange} />
                </FormControl>
              </VStack>

              <VStack align="stretch">
                <FormControl>
                  <FormLabel>Product Type</FormLabel>
                  <Select name="product_type" value={formData.product_type} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="solid">Solid</option>
                    <option value="liquid">Liquid</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>MFG Date</FormLabel>
                  <DatePicker
                    selected={formData.mfg_date}
                    onChange={(d) => handleDateChange(d, "mfg_date")}
                    customInput={<CustomDateInput placeholder="YYYY-MM-DD" />}
                    dateFormat="yyyy-MM-dd"
                    withPortal
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>EXP Date</FormLabel>
                  <DatePicker
                    selected={formData.exp_date}
                    onChange={(d) => handleDateChange(d, "exp_date")}
                    customInput={<CustomDateInput placeholder="YYYY-MM-DD" />}
                    dateFormat="yyyy-MM-dd"
                    withPortal
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Product Image</FormLabel>

                  <Input
                    type="file"
                    id="productImage"
                    display="none"
                    accept="image/*"
                    onChange={handleImage}
                  />

                  <Box
                    border="2px dashed"
                    p={6}
                  borderColor="gray.300"
                         borderRadius="md"
                     display="flex"
                     flexDirection="column"
                     alignItems="center"
                     justifyContent="center"
                    cursor="pointer"
                    position="relative"
                        _hover={{ borderColor: "blue.400" }}

                    onClick={() => !preview && document.getElementById("productImage").click()}
                  >
                    {preview ? (
                      <>
                        <Image src={preview} maxH="160px" mx="auto" />
                        <Button
                          size="sm"
                          colorScheme="red"
                          position="absolute"
                          bottom={0}
                          left="50%"
                          transform="translate(-50%, -50%)"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetImage();
                          }}
                        >
                          Reset Image
                        </Button>
                      </>
                    ) : (
                      <>
                        <FiUploadCloud  size={40} color="#4299E1" />
                        <Text mt={2}>Click to upload image</Text>
                      </>
                    )}
                  </Box>
                </FormControl>
              </VStack>
            </SimpleGrid>

            <Flex justify="flex-end" mt={10}>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Update Product
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default UpdateProduct;
