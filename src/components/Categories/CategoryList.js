import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";

import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import DeleteCategoryModal from "./DeleteCategoryModal";
import SubCategory from "./SubCategoryModal";
import ChildCategory from "./ChildCategoryModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSubOpen,
    onOpen: onSubOpen,
    onClose: onSubClose,
  } = useDisclosure();
  const {
    isOpen: isChildOpen,
    onOpen: onChildOpen,
    onClose: onChildClose,
  } = useDisclosure();

  /* ================= API CALLS ================= */

  const getCategories = async () => {
    try {
      const res = await axios.get(Config.get_categories);
      setCategories(res.data.categories || []);
      setFiltered(res.data.categories || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getSubCategories = async (catID) => {
    try {
      const res = await axios.get(
        `${Config.get_sub_category}?category_id=${catID}`
      );
      // backend response ke hisaab se data array extract karo
      setSubCategories(res.data?.data || []);
      setChildCategories([]);
      setSelectedSub("");
    } catch (err) {
      console.log(err);
      setSubCategories([]);
    }
  };


  const getChildCategories = async (subId) => {
    try {
      const res = await axios.get(
        `${Config.get_child_category}?sub_category_id=${subId}`
      );
      setChildCategories(res.data?.data || []);
    } catch (err) {
      console.log(err);
      setChildCategories([]);
    }
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(categories);
    } else {
      setFiltered(
        categories.filter((c) =>
          c.cate_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, categories]);

  /* ================= HANDLERS ================= */

  const handleDelete = (id) => {
    setCategoryId(id);
    onOpen();
  };

  return (
    <>
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryId={categoryId}
        fetchCategories={getCategories}
      />
      <SubCategory isOpen={isSubOpen} onClose={onSubClose} />
      <ChildCategory isOpen={isChildOpen} onClose={onChildClose} />

      <Box
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        ml={{ base: 0, lg: "260px" }}
        px={{ base: 0, lg: 6 }}
        minH="100vh"
      >
        {/* NAVBAR */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0">
          <TopBar />
        </Box>

        {/* CONTENT */}
        <Box bg="white" p={4} mt={4} borderRadius="lg" boxShadow="lg">
          <Flex justify="space-between" mb={5} flexWrap="wrap" gap={3}>
            <Text fontSize="2xl" fontWeight="600">
              Category List
            </Text>

            <Flex gap={3}>
              <Button colorScheme="blue" onClick={onSubOpen}>
                + Sub Category
              </Button>
              <Button colorScheme="blue" onClick={onChildOpen}>
                + Child Category
              </Button>
              <Link to="/add-category">
                <Button colorScheme="blue">+ Add Category</Button>
              </Link>
            </Flex>
          </Flex>

          {/* SEARCH */}
          <Flex mb={4} p={2} align="center" maxW="300px">
            <FiSearch />
            <Input
              ml={2}
              variant="unstyled"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Flex>

          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Table minW="1000px">
                <Thead bg="gray.100">
                  <Tr>
                    <Th>Category Name</Th>
                    <Th>Description</Th>
                    <Th>Created</Th>
                    <Th>Menu</Th>
                    <Th>Home</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filtered.map((item) => (
                    <Tr key={item.id}>
                      {/* CATEGORY NAME COLUMN */}
                      <Td>
                        {item.cate_name}

                        {/* Show dropdowns if this category is selected */}
                        {selectedCategory === item.id && (
                          <Box mt={2}>
                            <select
                              style={{
                                width: "140px",
                                padding: "5px",
                                marginTop: "6px",
                              }}
                              onChange={(e) => {
                                setSelectedSub(e.target.value);
                                getChildCategories(e.target.value);
                              }}
                              value={selectedSub}
                            >
                              <option value="">Select Sub</option>
                              {subCategories.map((sub) => (
                                <option key={sub.id
                                } value={sub.id}>
                                  {sub.name}
                                </option>
                              ))}
                            </select>

                            {childCategories.length > 0 && (
                              <select
                                style={{
                                  width: "140px",
                                  padding: "5px",
                                  marginTop: "6px",
                                }}
                              >
                                <option value="">Select Child</option>
                                {childCategories.map((child) => (
                                  <option key={child.id} value={child.id}>
                                    {child.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          </Box>
                        )}
                      </Td>

                      {/* OTHER COLUMNS */}
                      <Td>{item.description}</Td>
                      <Td>{new Date(item.created_at).toLocaleDateString()}</Td>
                      <Td>{item.show_in_menu === 1 ? "Yes" : "No"}</Td>
                      <Td>{item.show_on_menu === 1 ? "Yes" : "No"}</Td>

                      {/* ACTION COLUMN */}
                      <Td>
                        {/* VIEW BUTTON */}
                        <Button
                          size="sm"
                          bg="white"
                          mr={2}
                          onClick={() => {
                            setSelectedCategory(item.id);
                            getSubCategories(item.id);
                          }}
                        >
                          <FiEye size={18} color="#2563eb" />
                        </Button>

                        {/* DELETE BUTTON */}
                        <Button
                          bg="white"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <RiDeleteBin6Line size={18} color="#dc2626" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CategoryList;
