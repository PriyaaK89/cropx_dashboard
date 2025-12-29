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
import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar" 
import { Config } from "../../utils/Config";

const AddProduct2 = () => {
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [childCategories, setChildCategories] = useState([]);

    
   

  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    sub_category_id: "",
    child_category_id
    : "",
    brand: "",
    product_description: "",
    product_type: "",
    mfg_date: "",
    exp_date: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  /* ================= GET APIs ================= */

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config?.get_categories}`);
      console.log(res,"response");
      setCategories(res?.data?.categories || []);
    } catch (error) {
         console.log("Category fetch error", error);
    }
         setCategoryLoading(false);
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `${Config.get_sub_category}?category_id=${categoryId}`
      );
      console.log("sub category", res)
      console.log(res, "res")
      if(res?.status === 200){
      setSubCategories(res?.data?.data || []);}
    } catch (err) {
      console.log(err, "Error")
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
    console.log(id, "id")
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
    const handleProductType = (e) => {
    const type = e.target.value;
    setFormData({ ...formData, product_type: type });
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
      <Flex justifyContent="space-between">
        <Box display={{base:"none",lg:"flex"}} >
             <LeftSidebar />
        </Box>
        
         
        <Box width={{base:"100%", md:"calc(100% -260px)"}}  mb={5}  ml={{base:0,lg:"260px"}}  px={{base:3, md:6,}}>
          <Box display={{base:"flex",md:"none"}}>
            <ResponsiveNavbar/>
          </Box>
          <Box display={{base:"none",md:"flex"}}>
            <TopBar />
        </Box>

          <Box bg="white" px={4}  py={2} mt={6}  boxShadow="lg" borderRadius="lg">
            <Heading fontSize="sm" mb={4}>
              Add New Product
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} spacing={6}>
              <VStack spacing={4} align="stretch">
                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Product Name</FormLabel>
                  <Input name="product_name" onChange={handleChange}/>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold"> Product Category</FormLabel>
                  <Select
                    placeholder="Select Category"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.cate_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Sub Category</FormLabel>
                  <Select
                   name="sub_category_id"
                    placeholder="Select Sub Category"
                    value={formData.sub_category_id}
                    onChange={handleSubCategoryChange}
                    isDisabled={!formData.category_id}
                  >
                    {subCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Child Category</FormLabel>
                  <Select
                    placeholder="Select Child Category"
                    value={formData.child_category_id}
                    onChange={handleChange}
                    name="child_category_id"
                    isDisabled={!formData.sub_category_id}
                  >
                    {childCategories.map((child) => (
                     <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Brand</FormLabel>
                  <Input name="brand" onChange={handleChange} />
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold"> Product Description</FormLabel>
                  <Textarea name="product_description" onChange={handleChange} />
                </FormControl>
                  <FormControl mb="4px">
                                  <FormLabel fontSize="14px" fontWeight="bold">Product Type</FormLabel>
                                  <Select
                                    name="product_type"
                                    value={formData.product_type}
                                    onChange={handleProductType}
                                    bg="#f1f4f9"
                                    fontSize="14px"
                                  >
                                    <option value="">Select Type</option>
                                    <option value="solid">Solid</option>
                                    <option value="liquid">Liquid</option>
                                  </Select>
                                </FormControl>
                    
              </VStack>

              <VStack spacing={4} align="stretch">
                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Mfg Date</FormLabel>
                  <Input type="date" name="mfg_date" onChange={handleChange} />
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Expiry Date</FormLabel>
                  <Input type="date" name="exp_date" onChange={handleChange} />
                </FormControl>

                <FormControl mb="4px">
                  <FormLabel fontSize="14px" fontWeight="bold">Upload Image</FormLabel>
                  <Input type="file" onChange={handleImage} />
                </FormControl>

                {preview && (
                  <Image src={preview} w="180px" borderRadius="md" />
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
