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
import { useParams, useNavigate } from "react-router-dom";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";

const UpdateProduct = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

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

  /* ================= FETCH DATA ================= */

  const fetchCategories = async () => {
    const res = await axios.get(Config.get_categories);
    setCategories(res?.data?.categories || []);
  };

  const fetchSubCategories = async (id) => {
    const res = await axios.get(`${Config.get_sub_category}?category_id=${id}`);
    setSubCategories(res?.data?.data || []);
  };

  const fetchChildCategories = async (id) => {
    const res = await axios.get(
      `${Config.get_child_category}?sub_category_id=${id}`
    );
    setChildCategories(res?.data?.data || []);
  };

  const fetchProduct = async () => {
    const res = await axios.get(`${Config.get_product_by_id}/${id}`);
    const data = res?.data?.data;

    setFormData({
      product_name: data.product_name,
      category_id: data.category_id,
      sub_category_id: data.sub_category_id,
      child_category_id: data.child_category_id,
      brand: data.brand,
      product_description: data.product_description,
      product_type: data.product_type,
      mfg_date: data.mfg_date,
      exp_date: data.exp_date,
    });

    setPreview(data.product_img);
    fetchSubCategories(data.category_id);
    fetchChildCategories(data.sub_category_id);
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      await axios.put(`${Config.update_product}/${id}`, fd);
      toast({ title: "Product Updated", status: "success" });
      navigate("/product");
    } catch (err) {
      toast({ title: "Update Failed", status: "error" });
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
          <Box display={{ base: "flex", lg: "none" }}>
            <ResponsiveNavbar />
          </Box>

          <Box display={{ base: "none", lg: "flex" }}>
            <TopBar />
          </Box>

          <Box bg="white" mt={4} p={4} borderRadius="lg" boxShadow="lg">
            <Heading fontSize="sm" mb={4}>
              Update Product
            </Heading>

            <SimpleGrid columns={[1, 2]} spacing={6}>
              <VStack spacing={4}>
                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Name
                  </FormLabel>
                  <Input
                    name="product_name"
                    placeholder="Enter product name"
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Category
                  </FormLabel>
                  <Select
                    name="category_id"
                    value={formData.category_id}
                    onChange={(e) => {
                      handleChange(e);
                      fetchSubCategories(e.target.value);
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.cate_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Brand
                  </FormLabel>
                  <Input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                  />
                </FormControl>

                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Description
                  </FormLabel>
                  <Textarea
                    name="product_description"
                    value={formData.product_description}
                    onChange={handleChange}
                    placeholder="Enter your description"
                  />
                </FormControl>
              </VStack>

              <VStack spacing={4}>
                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Type
                  </FormLabel>
                  <Select
                    name="product_type"
                    value={formData.product_type}
                    onChange={handleChange}
                  >
                    <option value="solid">Solid</option>
                    <option value="liquid">Liquid</option>
                  </Select>
                </FormControl>

                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    MFG Date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="date"
                      name="mfg_date"
                      value={formData.mfg_date}
                      onChange={handleChange}
                    />
                    <InputRightElement cursor="pointer">
                      <CalendarIcon />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    EXP Date
                  </FormLabel>
                  <Input
                    type="date"
                    name="exp_date"
                    value={formData.exp_date}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={1}>
                  <FormLabel fontSize="14px" fontWeight="bold">
                    Product Image
                  </FormLabel>
                  <Input type="file" onChange={handleImage} />
                </FormControl>

                {preview && <Image src={preview} w="150px" />}
              </VStack>
            </SimpleGrid>

            <Flex justify="flex-end" mt={6}>
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
