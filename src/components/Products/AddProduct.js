import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  VStack,
  useToast,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import { Config } from "../../utils/Config";

const AddProduct = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    product_name: "",
    product_category: "",
    product_description: "",
    product_type: "",
    quantity_type: "",
    quantity_value: "",
    stock_qty: "",
    mfg_date: "",
    exp_date: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductType = (e) => {
    const type = e.target.value;
    setFormData({ ...formData, product_type: type, quantity_type: "" });
  };

  const handleImage = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) setPreview(URL.createObjectURL(img));
  };

  const handleSubmit = async () => {
    const fd = new FormData();

    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
    if (file) fd.append("product_img", file);

    try {
      await axios.post(`${Config?.add_product}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Product Added Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error adding product",
        description: error?.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent="space-between">
    <Box>  <LeftSidebar /></Box>

      <Box w="80.3%" bg="#f3f6fb" minH="100vh">
        <TopBar />

        {/* Page Header */}
        <Box p={6}>
          <Heading fontSize="sm" mb={3}>
            Add New Product
          </Heading>
        </Box>

        {/* Form Card */}
        <Box
          mx="auto"
          w="92%"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        >
          <SimpleGrid columns={[1, 1, 2]} spacing={8}>
            {/* Left Section */}
            <VStack spacing={5} align="stretch">
              <FormControl>
                <FormLabel fontWeight="600">Product Name</FormLabel>
                <Input
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  bg="#f1f4f9"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="600">Product Category</FormLabel>
                <Input
                  name="product_category"
                  value={formData.product_category}
                  onChange={handleChange}
                  placeholder="e.g. Organic Fertilizer"
                  bg="#f1f4f9"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="600">Description</FormLabel>
                <Textarea
                  name="product_description"
                  value={formData.product_description}
                  onChange={handleChange}
                  placeholder="Write product description"
                  bg="#f1f4f9"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="600">Product Type</FormLabel>
                <Select
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleProductType}
                  bg="#f1f4f9"
                >
                  <option value="">Select Type</option>
                  <option value="solid">Solid</option>
                  <option value="liquid">Liquid</option>
                </Select>
              </FormControl>

              {formData.product_type && (
                <FormControl>
                  <FormLabel fontWeight="600">Quantity Type</FormLabel>
                  <Select
                    bg="#f1f4f9"
                    name="quantity_type"
                    value={formData.quantity_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Quantity Type</option>
                    {formData.product_type === "solid" && (
                      <>
                        <option value="gram">Gram</option>
                        <option value="kg">Kg</option>
                      </>
                    )}
                    {formData.product_type === "liquid" && (
                      <>
                        <option value="ml">ml</option>
                        <option value="liter">Liter</option>
                      </>
                    )}
                  </Select>
                </FormControl>
              )}

              {formData.quantity_type && (
                <FormControl>
                  <FormLabel fontWeight="600">Quantity Value</FormLabel>
                  <Input
                    name="quantity_value"
                    value={formData.quantity_value}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    bg="#f1f4f9"
                  />
                </FormControl>
              )}
            </VStack>

            {/* Right Section */}
            <VStack spacing={5} align="stretch">
              <FormControl>
                <FormLabel fontWeight="600">Stock Quantity</FormLabel>
                <Input
                  type="number"
                  name="stock_qty"
                  value={formData.stock_qty}
                  onChange={handleChange}
                  bg="#f1f4f9"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="600">Mfg Date</FormLabel>
                <Input
                  type="date"
                  name="mfg_date"
                  value={formData.mfg_date}
                  onChange={handleChange}
                  bg="#f1f4f9"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="600">Expiry Date</FormLabel>
                <Input
                  type="date"
                  name="exp_date"
                  value={formData.exp_date}
                  onChange={handleChange}
                  bg="#f1f4f9"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="600">Upload Product Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  bg="#f1f4f9"
                  py={1}
                />
              </FormControl>

              {preview && (
                <Box>
                  <Image
                    src={preview}
                    alt="Preview"
                    w="180px"
                    h="180px"
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="md"
                  />
                </Box>
              )}
            </VStack>
          </SimpleGrid>

          <Flex justify="flex-end" mt={10}>
            <Button
              colorScheme="blue"
              size="lg"
              px={10}
              borderRadius="full"
              onClick={handleSubmit}
              boxShadow="0 4px 14px rgba(66,153,225,0.4)"
            >
              Add Product
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default AddProduct;
