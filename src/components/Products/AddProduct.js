import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Textarea, Heading, VStack, useToast, SimpleGrid, Image,} from "@chakra-ui/react";
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
    sub_category: "",
    child_category: "",
    brand : "",
    product_description: "",
    product_type: "",
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
        <Box width="100%" backgroundColor="#f8f8fb" >
    
    <Flex justifyContent="space-between">
    <Box>  <LeftSidebar /></Box>

      <Box w="77.5%" minH="100vh" pl="1rem" mr="1rem">
        <TopBar />

        {/* Page Header */}
          <Box bgColor="white" mt={4} p={4} borderRadius="0.75rem" boxShadow="lg">
          <Heading fontSize="sm" mb={3}>
            Add New Product
          </Heading>

        {/* Form Card */}
        <Box
         
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
                  placeholder="product category"
                  bg="#f1f4f9"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="600px"> Sub Category</FormLabel>
                  <Input 
                     name="sub_category"
                     value={formData.sub_category}
                     onChange={handleChange}
                     placeholder="enter your sub category"
                     bg="#f1f4f9"
                  />
              </FormControl>
               <FormControl>
                <FormLabel fontWeight="600px"> Child Category</FormLabel>
                  <Input 
                     name="child_category"
                     value={formData.child_category}
                     onChange={handleChange}
                     placeholder="enter your category category"
                     bg="#f1f4f9"
                  />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="600px">
                  Brand
                  <Input name="brand" value={formData.brand} 
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    bg="#f1f4f9"
                   />
                </FormLabel>
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
  
            </VStack>

            {/* Right Section */}
            <VStack spacing={5} align="stretch">
              

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
                  </Box>
    </Flex>

    </Box>
  );
};

export default AddProduct;
