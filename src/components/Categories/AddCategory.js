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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
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
          <Box display={{ base: "none", lg: "block"}} position="sticky" top="0px" bottom="0px" left="0px" right="0px" z-index={100}>
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
                  <FormControl>
                    <FormLabel>Category Name</FormLabel>
                    <Input name="cate_name" value={form.cate_name} onChange={handleChange} placeholder="Enter your category name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Slug</FormLabel>
                    <Input name="slug" value={form.slug} onChange={handleChange} placeholder="Enter your slug" />
                  </FormControl>

                  <FormControl gridColumn={{ md: "span 2" }}>
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter your description" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Show In Menu (0 / 1)</FormLabel>
                    <Input name="show_in_menu" value={form.show_in_menu} onChange={handleChange} placeholder="Enter 0 or 1" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Show On Home (0 / 1)</FormLabel>
                    <Input name="show_on_home" value={form.show_on_home} onChange={handleChange} placeholder="Enter 0 Or 1" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Menu Order</FormLabel>
                    <Input type="number" name="menu_order" value={form.menu_order} onChange={handleChange} placeholder="Enter your menu order" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Home Order</FormLabel>
                    <Input type="number" name="home_order" value={form.home_order} onChange={handleChange} placeholder="Enter your home order" />
                  </FormControl>

                  {/* IMAGE */}
                  <FormControl gridColumn={{ md: "span 2" }}>
                    <FormLabel>Upload Image</FormLabel>
                    <Box
                      border="2px dashed #CBD5E0"
                      p={6}
                      rounded="xl"
                      textAlign="center"
                      position="relative"
                      cursor="pointer"
                    >
                      <Input
                        type="file"
                        name="image"
                        opacity="0"
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        onChange={handleChange}
                      />
                      <Icon as={FiUploadCloud} boxSize={10} />
                      <Text mt={2}>Click to upload image</Text>
                    </Box>
                  </FormControl>

                  {preview && (
                    <Image
                      src={preview}
                      gridColumn={{ md: "span 2" }}
                      h="220px"
                      objectFit="cover"
                      rounded="xl"
                    />
                  )}

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
