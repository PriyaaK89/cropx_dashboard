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

  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [childCategoriesMap, setChildCategoriesMap] = useState({});
  const [selectedSubMap, setSelectedSubMap] = useState({});

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
    setLoading(true);
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
      setSubCategoriesMap((prev) => ({
        ...prev,
        [catID]: res.data?.data || [],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const getChildCategories = async (subId, catId) => {
    try {
      const res = await axios.get(
        `${Config.get_child_category}?sub_category_id=${subId}`
      );

      setChildCategoriesMap((prev) => ({
        ...prev,
        [catId]: res.data?.data || [],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
  filtered.forEach((item) => {
    if (!subCategoriesMap[item.id]) {
      getSubCategories(item.id);
    }
  });
}, [filtered]);


 
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
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0px" bottom="0px" left="0px" right="0px" zIndex="11">
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
              <Table
                variant="simple"
                minW={{ base: "900px", md: "1100px",  xl: "1400px" }}
                className="productsTable"
              >
                <Thead bg="gray.100">
                  <Tr>
                    <Th minW="100px">Category Name</Th>
                    <Th minW="150px">Sub Category</Th>
                    <Th minW="150px">Child Category</Th>
                    <Th minw="100px">Description</Th>
                    <Th minW="100px">Created</Th>
                    <Th minW="50px">Menu</Th>
                    <Th minW="50px">Home</Th>
                    <Th minW="150px">Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filtered.map((item) => (
                    <Tr key={item.id}>
                      {/* CATEGORY NAME + DROPDOWNS */}
                      <Td>
                        <Text fontWeight="500">{item.cate_name}</Text>
                      </Td>
                      <Td>
                        {/* Sub Category */}
                        <select
                          style={{ width: "150px", padding: "6px" }}
                          value={selectedSubMap[item.id] || ""}
                          onChange={(e) => {
                            const subId = e.target.value;

                            setSelectedSubMap((prev) => ({
                              ...prev,
                              [item.id]: subId,
                            }));

                            getChildCategories(subId, item.id);
                          }}
                        >
                          {(subCategoriesMap[item.id] || []).map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.name}
                            </option>
                          ))}
                        </select>
                      </Td>

                      {/* Child Category */}
                      <Td>
                        {(childCategoriesMap[item.id] || []).length > 0 && (
                          <select style={{ width: "150px", padding: "6px" }}>
                            {(childCategoriesMap[item.id] || []).map(
                              (child) => (
                                <option key={child.id} value={child.id}>
                                  {child.name}
                                </option>
                              )
                            )}
                          </select>
                        )}
                      </Td>

                      <Td>{item.description}</Td>
                      <Td>{new Date(item.created_at).toLocaleDateString()}</Td>
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
