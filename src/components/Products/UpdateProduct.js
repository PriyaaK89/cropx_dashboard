import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Config } from "../../utils/Config";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";

const UpdateProduct = () => {
  const { id } = useParams();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  const [formData, setFormData] = useState({
    product_name: "",
    product_category: "",
    product_description: "",
    product_type: "",
    stock_qty: "",
    mfg_date: "",
    exp_date: "",
    product_img: null,
    previewImg: "",
  });

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0];
  };
  // Fetch Single Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${Config?.get_product_by_id}/${id}`);
      const p = res.data.product;

      setFormData({
        product_name: p.product_name,
        product_category: p.product_category,
        product_description: p.product_description,
        product_type: p.product_type,
        stock_qty: p.stock_qty,
        mfg_date: formatDate(p.mfg_date),
        exp_date: formatDate(p.exp_date),
        product_img: null,
        previewImg: p.product_img, // existing image URL
      });

      setProductLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to load product",
        status: "error",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      product_img: file,
      previewImg: URL.createObjectURL(file),
    });
  };

  // Submit Update
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();

      data.append("product_name", formData.product_name);
      data.append("product_category", formData.product_category);
      data.append("product_description", formData.product_description);
      data.append("product_type", formData.product_type);
      data.append("stock_qty", formData.stock_qty);
      data.append("mfg_date", formData.mfg_date);
      data.append("exp_date", formData.exp_date);

      if (formData.product_img) {
        data.append("product_img", formData.product_img);
      }

      await axios.put(`${Config?.update_product}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Product updated successfully",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Update failed",
        status: "error",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  if (productLoading)
    return (
      <Flex justify="center" mt="100px">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {" "}
          <LeftSidebar />{" "}
        </Box>
        <Box w="80.3%" bg="#f3f6fb" minH="100vh">
          <Box>
            <TopBar />
          </Box>
          <Box
            maxW="700px"
            mx="auto"
            mt={10}
            p={6}
            bg="white"
            rounded="lg"
            shadow="md">
            <Box fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
              Update Product
            </Box>

            <FormControl mb={4}>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Product Category</FormLabel>
              <Input
                name="product_category"
                value={formData.product_category}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="product_description"
                value={formData.product_description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Product Type</FormLabel>
              <Select
                name="product_type"
                value={formData.product_type}
                onChange={handleChange}>
                <option value="">Select type</option>
                <option value="solid">Solid</option>
                <option value="liquid">Liquid</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Stock Qty</FormLabel>
              <Input
                name="stock_qty"
                type="number"
                value={formData.stock_qty}
                onChange={handleChange}
              />
            </FormControl>

            <Flex gap={4}>
              <FormControl mb={4}>
                <FormLabel>MFG Date</FormLabel>
                <Input
                  type="date"
                  name="mfg_date"
                  value={formData.mfg_date}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>EXP Date</FormLabel>
                <Input
                  type="date"
                  name="exp_date"
                  value={formData.exp_date}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <FormControl mb={4}>
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            {formData.previewImg && (
              <Image
                src={formData.previewImg}
                alt="product preview"
                height="150px"
                objectFit="cover"
                rounded="md"
                mb={4}
              />
            )}

            <Button
              colorScheme="blue"
              width="100%"
              mt={4}
              onClick={handleSubmit}
              isLoading={loading}>
              Update Product
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProduct;
