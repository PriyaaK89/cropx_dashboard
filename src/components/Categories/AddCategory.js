import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Image,
  VStack,
  useToast,
  Text,
  Icon,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Link } from "react-router-dom";
import { Config } from "../../utils/Config";

const AddCategory = () => {
  const toast = useToast();
   const [file, setFile]= useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    cate_name: "",
    slug: "",
    description: "",
    show_in_menu: "",
    show_on_home: "",
    menu_order: "",
    home_order: "",
    image: null,
  });

  /* ================= HANDLE CHANGE ================= */

  const handleImage = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) setPreview(URL.createObjectURL(img));
  };
  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (
      !form.cate_name ||
      !form.slug ||
      !form.show_in_menu ||
      !form.show_on_home
    ) {
      return toast({
        title: "All required fields must be filled",
        status: "warning",
        duration: 2000,
      });
    }

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    try {
      const res = await axios.post(Config.add_categories, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast({
          title: "Category Added Successfully",
          status: "success",
          duration: 2000,
        });

        setForm({
          cate_name: "",
          slug: "",
          description: "",
          show_in_menu: "",
          show_on_home: "",
          menu_order: "",
          home_order: "",
          image: null,
        });
        setPreview(null);
      }
    } catch (error) {
      toast({
        title: "Error adding category",
        status: "error",
        duration: 2000,
      });
    }
  };

  /* ================= UI ================= */

  return (
    <Box width="100%" bg="#f8f8fb" pt={{base:"60px",md:"60px",lg:0}}>
      <Flex>
        {/* SIDEBAR */}
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>
 
        {/* MAIN CONTENT */}
        <Box
          width={{ base: "100%", lg: "calc(100% - 260px)" }}
          ml={{ base: 0, lg: "260px" }}
          px={{ base: 0, lg: 6 }}
          mb={5}
        >
          <Box display={{ base: "block",  lg: "none" }}>
            <ResponsiveNavbar />
          </Box>
          <Box display={{ base: "none", lg: "block"}} position="sticky" top="0px" bottom="0px" left="0px" right="0px" zIndex="11">
            <TopBar />
          </Box>

          <Box bg="white" px={4} py={2} mt={4} boxShadow="lg" borderRadius="0.75rem" mx={{base:3,lg:0}}>
            {/* BREADCRUMB */}
            <HStack justify="space-between" mb={4}>
              <Breadcrumb fontSize="13px">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/">
                    <GoHomeFill />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/categories-list">
                    Category List
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>Add Category</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <Heading size="sm">Add Category</Heading>
            </HStack>

            {/* FORM */}
            <Flex justify="center">
              <Box
                bg="white"
                w={{ base: "100%",lg: "700px" }}
                p={6}
                rounded="2xl"
                boxShadow="sm"
                border="1px solid #e2e8f0"
                mt={2}
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl mb="4px" isRequired>
                    <FormLabel co fontSize="14px" fontWeight="bold">Category Name</FormLabel>
                    <Input fontSize="14px" name="cate_name" value={form.cate_name} onChange={handleChange} placeholder="Enter your category name" />
                  </FormControl>

                  <FormControl mb="4px" isRequired>
                    <FormLabel fontSize="14px" fontWeight="bold">Slug</FormLabel>
                    <Input fontSize="14px" name="slug" value={form.slug} onChange={handleChange} placeholder="Enter your slug" />
                  </FormControl>

                  

                  <FormControl mb="4px" isRequired>
                    <FormLabel fontSize="14px" fontWeight="bold">Show In Menu (0 / 1)</FormLabel>
                    <Input fontSize="14px" name="show_in_menu" value={form.show_in_menu} onChange={handleChange} placeholder="Enter 0 or 1" />
                  </FormControl>

                  <FormControl isRequired mb="4px">
                    <FormLabel fontSize="14px" fontWeight="bold">Show On Home (0 / 1)</FormLabel>
                    <Input fontSize="14px" name="show_on_home" value={form.show_on_home} onChange={handleChange} placeholder="Enter 0 Or 1" />
                  </FormControl>

                  <FormControl mb="4px">
                    <FormLabel fontSize="14px" fontWeight="bold">Menu Order</FormLabel>
                    <Input fontSize="14px" type="number" name="menu_order" value={form.menu_order} onChange={handleChange} placeholder="Enter your menu order" />
                  </FormControl>

                  <FormControl mb="4px">
                    <FormLabel fontSize="14px" fontWeight="bold">Home Order</FormLabel>
                    <Input fontSize="14px" type="number" name="home_order" value={form.home_order} onChange={handleChange} placeholder="Enter your home order" />
                  </FormControl>
                   <FormControl mb="4px" gridColumn={{ md: "span 2" }}>
                    <FormLabel fontSize="14px" fontWeight="bold">Description</FormLabel>
                    <Textarea fontSize="14px" name="description" value={form.description} onChange={handleChange} placeholder="Enter your description" />
                  </FormControl>

                  {/* IMAGE */}
                  <FormControl mb="4px" gridColumn={{ md: "span 2" }}>
                    <FormLabel fontSize="14px" fontWeight="bold">Upload Image</FormLabel>
                  
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
                        onClick={() => document.getElementById("productImage").click()}
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
                            <FiUploadCloud  size={40} color="#4299E1"/>
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

                

                  <Button
                    gridColumn={{ md: "span 2" }}
                    colorScheme="blue"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Add Category
                  </Button>
                </SimpleGrid>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddCategory;
