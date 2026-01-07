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

  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSubOpen, onOpen: onSubOpen, onClose: onSubClose } =
    useDisclosure();
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

      // first category ke liye sub category load
      if (res.data.categories?.length > 0) {
        getSubCategories(res.data.categories[0].id);
      }
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
              <Table variant="simple" 
               minW={{base:"1200px",md:"1500px",xl:"1600px"}}
              >
                <Thead bg="gray.100">
                  <Tr>
                    <Th minW="250px">Category Name</Th>
                    <Th minw="250px">Description</Th>
                    <Th minW="250px">Created</Th>
                    <Th minW="100px">Menu</Th>
                    <Th minW="100px">Home</Th>
                    <Th minW="150px">Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filtered.map((item) => (
                    <Tr key={item.id}>
                      {/* CATEGORY NAME + DROPDOWNS */}
                      <Td>
                        <Flex align="center" gap={3} wrap="nowrap">
                          <Text fontWeight="500">{item.cate_name}</Text>

                          {/* Sub Category */}
                          <select
                            style={{ width: "150px", padding: "6px" }}
                            value={selectedSub}
                            onChange={(e) => {
                              const subId = e.target.value;
                              setSelectedSub(subId);
                              getChildCategories(subId);
                            }}
                          >
                            <option value="">Sub Category</option>
                            {subCategories.map((sub) => (
                              <option key={sub.id} value={sub.id}>
                                {sub.name}
                              </option>
                            ))}
                          </select>

                          {/* Child Category */}
                          {childCategories.length > 0 && (
                            <select
                              style={{ width: "150px", padding: "6px" }}
                            >
                              <option value="">Child Category</option>
                              {childCategories.map((child) => (
                                <option key={child.id} value={child.id}>
                                  {child.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </Flex>
                      </Td>

                      <Td>{item.description}</Td>
                      <Td>
                        {new Date(item.created_at).toLocaleDateString()}
                      </Td>
                      <Td>{item.show_in_menu === 1 ? "Yes" : "No"}</Td>
                      <Td>{item.show_on_menu === 1 ? "Yes" : "No"}</Td>

                      {/* ACTIONS */}
                      <Td>
                          <Link to="/view-category">
                        <Button size="sm" bg="white" mr={2}>
                          <FiEye size={18} color="#2563eb" />
                        </Button>
                      </Link>
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
