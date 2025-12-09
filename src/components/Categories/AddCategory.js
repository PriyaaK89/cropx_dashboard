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
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import { Link } from "react-router-dom";
import { Config } from "../../utils/Config";

const AddCategory = () => {
  const toast = useToast();

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    cate_name: "",
    cate_des: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!form.cate_name || !form.cate_des || !form.image) {
      return toast({
        title: "All fields required",
        status: "warning",
        duration: 2000,
      });
    }

    const fd = new FormData();
    fd.append("cate_name", form.cate_name);
    fd.append("cate_des", form.cate_des);
    fd.append("image", form.image);

    try {
      const res = await axios.post(`${Config?.add_categories}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast({
          title: "Category Added",
          status: "success",
          duration: 2000,
        });

        setForm({ cate_name: "", cate_des: "", image: null });
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

  return (
    <Box width="100%">
      <HStack justifyContent="space-between" alignItems="flex-start">
        
        {/* LEFT SIDEBAR */}
        <Box>
          <LeftSidebar />
        </Box>

        {/* MAIN CONTENT */}
        <Box width="82.5%" minH="100vh" pl={10}>
          <TopBar />

          <Box width="100%" backgroundColor="#f8f8fb" p={5} rounded="lg">

            <HStack justifyContent="space-between" alignItems="flex-start">
              <Breadcrumb color="#8B8D97" mt="1rem" ml="10px" height="20px">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/">
                    <GoHomeFill color="#5570F1" />
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={Link}
                    to="/categories-list"
                    color="#8B8D97"
                    fontSize="13px"
                  >
                    Category List
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink color="#8B8D97" fontSize="13px">
                    Add Categories
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <Heading
                size="sm"
                ml="10px"
                mb={8}
                fontWeight="600"
                color="#2b2d42"
              >
                Add Category
              </Heading>
            </HStack>

            {/* FORM CARD */}
            <Flex justify="center">
              <Box
                bg="whiteAlpha.700"
                backdropFilter="blur(10px)"
                w="500px"
                p={8}
                rounded="2xl"
                boxShadow="0 8px 30px rgba(0,0,0,0.08)"
                border="1px solid #e2e8f0"
              >
                <VStack spacing={4}>
                  
                  {/* INPUT: NAME */}
                  <FormControl>
                    <FormLabel fontWeight="600" color="#2d3748">
                      Category Name
                    </FormLabel>
                    <Input
                      name="cate_name"
                      value={form.cate_name}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      bg="white"
                      p={3}
                      rounded="lg"
                    />
                  </FormControl>

                  {/* INPUT: DESCRIPTION */}
                  <FormControl>
                    <FormLabel fontWeight="600" color="#2d3748">
                      Description
                    </FormLabel>
                    <Textarea
                      name="cate_des"
                      value={form.cate_des}
                      onChange={handleChange}
                      placeholder="Write a short description..."
                      bg="white"
                      p={3}
                      rounded="lg"
                    />
                  </FormControl>

                  {/* IMAGE UPLOAD */}
                  <FormControl>
                    <FormLabel fontWeight="600" color="#2d3748">
                      Upload Image
                    </FormLabel>

                    <Box
                      border="2px dashed #a0aec0"
                      rounded="xl"
                      p={6}
                      textAlign="center"
                      cursor="pointer"
                      _hover={{ bg: "#f1f5f9" }}
                      position="relative"
                    >
                      <Input
                        type="file"
                        name="image"
                        opacity="0"
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        cursor="pointer"
                        onChange={handleChange}
                      />

                      <Icon as={FiUploadCloud} boxSize={10} color="gray.500" />
                      <Text mt={2} color="gray.600">
                        Click to upload category image
                      </Text>
                    </Box>
                  </FormControl>

                  {/* IMAGE PREVIEW */}
                  {preview && (
                    <Image
                      src={preview}
                      alt="Preview"
                      w="100%"
                      h="220px"
                      objectFit="cover"
                      rounded="xl"
                      border="1px solid #e2e8f0"
                    />
                  )}

                  {/* BUTTON */}
                  <Button
                    colorScheme="blue"
                    size="lg"
                    w="100%"
                    mt={3}
                    rounded="xl"
                    fontWeight="600"
                    onClick={handleSubmit}
                    boxShadow="0 4px 10px rgba(66,153,225,0.3)"
                  >
                    Add Category
                  </Button>
                </VStack>
              </Box>
            </Flex>

          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default AddCategory;
