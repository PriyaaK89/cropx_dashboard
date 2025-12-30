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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import axios from "axios";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";

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
        `${Config.get_sub_category}?category_id=${categoryId}`
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
        `${Config.get_child_category}?sub_category_id=${subCategoryId}`
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

  /* ================= UI ================= */

  return (
    <Box width="100%" bg="#f8f8fb">
      <Flex>
        <Box display={{ base: "none", lg: "flex" }}>
          <LeftSidebar />
        </Box>

        <Box
          width={{ base: "100%", md: "calc(100% - 260px)" }}
          ml={{ base: 0, lg: "260px" }}
          px={{ base: 0, lg: 6 }}
        >
          <Box display={{ base: "flex", md:"flex", lg:"none" }}>
            <ResponsiveNavbar />
          </Box>
          <Box display={{ base: "none", lg:"flex" }}>
            <TopBar />
          </Box>

          <Box bg="white" p={4} mt={4} boxShadow="lg" borderRadius="lg">
            <Heading fontSize="sm" mb={4}>
              Add New Product
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} spacing={6}>
              {/* LEFT */}
              <VStack spacing={4} align="stretch">
                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Name
                  </FormLabel>
                  <Input
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Category
                  </FormLabel>
                  <Select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                    placeholder="Select Category"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.cate_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Sub Category
                  </FormLabel>
                  <Select
                    name="sub_category_id"
                    value={formData.sub_category_id}
                    onChange={handleSubCategoryChange}
                    isDisabled={!formData.category_id}
                    placeholder="Select Sub Category"
                  >
                    {subCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Child Category
                  </FormLabel>
                  <Select
                    name="child_category_id"
                    value={formData.child_category_id}
                    onChange={handleChange}
                    isDisabled={!formData.sub_category_id}
                    placeholder="Select Child Category"
                  >
                    {childCategories.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Brand
                  </FormLabel>
                  <Input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Description
                  </FormLabel>
                  <Textarea
                    name="product_description"
                    value={formData.product_description}
                    onChange={handleChange}
                  />
                </FormControl>
              </VStack>

              {/* RIGHT */}
              <VStack spacing={4} align="stretch">
                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Type
                  </FormLabel>
                  <Select
                    name="product_type"
                    value={formData.product_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    <option value="solid">Solid</option>
                    <option value="liquid">Liquid</option>
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Mfg Date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="date"
                      name="mfg_date"
                      value={formData.mfg_date}
                      onChange={handleChange}
                    />
                    <InputRightElement>
                      {/* <CalendarIcon color="gray.500" /> */}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Expiry Date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="date"
                      name="exp_date"
                      value={formData.exp_date}
                      onChange={handleChange}
                    />
                    <InputRightElement>
                      {/* <CalendarIcon color="gray.500" /> */}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Upload Image
                  </FormLabel>
                  <Input type="file" onChange={handleImage} />
                </FormControl>

                {preview && (
                  <Image src={preview} w="150px" borderRadius="md" />
                )}
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
