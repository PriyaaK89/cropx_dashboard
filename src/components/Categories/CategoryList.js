import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Spinner,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import DeleteCategory from "./DeleteCategory";
import SubCategory from "./SubCategoryModal";
import ChildCategory from "./ChildCategoryModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSubOpen, onOpen: onSubOpen, onClose: onSubClose } = useDisclosure();
  const { isOpen: isChildOpen, onOpen: onChildOpen, onClose: onChildClose } = useDisclosure();

  const getCategories = async () => {
    try {
      const res = await axios.get(Config?.get_categories);
      setCategories(res.data.categories);
      setFiltered(res.data.categories);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

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

  const handleDelete = (id) => {
    setCategoryId(id);
    onOpen();
  };

  return (
    <>
      <DeleteCategory
        isOpen={isOpen}
        onClose={onClose}
        categoryId={categoryId}
        fetchCategories={getCategories}
      />
      <SubCategory isOpen={isSubOpen} onClose={onSubClose} />
      <ChildCategory isOpen={isChildOpen} onClose={onChildClose} />

      <Box
        width={{ base: "100%", md: "calc(100% - 260px)" }}
        ml={{ base: 0, lg: "260px" }}
        px={{ base: 0, lg: 6}}
        mb={5}
      >
        {/* NAVBAR */}
        <Box display={{ base: "flex", md:"flex", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", lg: "flex" }}>
          <TopBar />
        </Box>

        {/* CONTENT */}
        <Box bg="white" p={4} mt={4} borderRadius="lg" boxShadow="lg">
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
            mb={5}
          >
            <Text fontSize="2xl" fontWeight="600">
              Category List
            </Text>

            <Flex gap={3} flexWrap="wrap">
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
          <Flex
            mb={4}
            p={2}
            align="center"
            borderRadius="md"
            boxShadow="sm"
            maxW="300px"
          >
            <FiSearch />
            <Input
              ml={2}
              variant="unstyled"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Flex>

          {/* LOADING */}
          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) 
           :
              (<Box   overflowX="auto">
                <Table
                  minW={{ md:"700px", lg: "1000px", xl: "1200px", "2xl": "1400px" }}
                >
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>Category Name</Th>
                      <Th>Description</Th>
                      <Th>Created</Th>
                      <Th>Show In Menu</Th>
                      <Th>Show On Home</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {filtered.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                            <Text>{item.cate_name}</Text>
                        </Td>

                        <Td>{item.description}</Td>

                        <Td>
                          {new Date(item.created_at).toLocaleDateString()}
                        </Td>
                        <Td>{item.show_in_menu ===1 ? "Yes" : "No"}</Td>
                           <Td>{item.show_on_menu ===1 ? "Yes" : "No"}</Td>

                          <Td>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
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
)};

export default CategoryList;
