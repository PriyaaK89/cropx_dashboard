import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  SimpleGrid,
  Spinner,
  Input,
  IconButton,
  useToast,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import { Config } from "../../utils/Config";
import DeleteCategory from "./DeleteCategory";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [categoryId, setCategoryId] = useState();

  const toast = useToast();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config?.get_categories}`);
      setCategories(res.data.categories);
      setFiltered(res.data.categories);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Failed to load categories",
        status: "error",
        duration: 1500,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filteredList = categories.filter((item) =>
      item.cate_name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredList);
  };

  const handleDeleteModal = (id)=>{
    onOpen();
    setCategoryId(id)
  }

  return (
    <>
    <DeleteCategory isOpen={isOpen} onClose={onClose} categoryId={categoryId} fetchCategories={fetchCategories}/>
    <Box width="82.5%"  minH="100vh" pl="10">
      {/* HEADER */}
      <TopBar />
      <Box px="2rem"  pt="1rem" mt="5" backgroundColor="white" rounded="lg">
        <Flex justify="space-between" align="center" mb="25px">
          <Text fontSize="2xl" fontWeight="bold" color="#333">
            Categories
          </Text>

          <Link to="/add-category">
            <Button colorScheme="blue" px="6" >
              {" "}
              + Add Category
            </Button>
          </Link>
        </Flex>

        {/* SEARCH BAR */}
        <Flex
          bg="white"
          p="10px"
          borderRadius="md"
          align="center"
          boxShadow="sm"
          mb="25px"
          w="350px">
          <FiSearch size={18} color="#888" />
          <Input
            ml="10px"
            variant="unstyled"
            placeholder="Search category..."
            value={search}
            onChange={handleSearch}
          />
        </Flex>

        {/* LOADING STATE */}
        {loading && (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="lg" />
          </Flex>
        )}

        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <Flex justify="center" align="center" mt="50px">
            <Text fontSize="lg" color="gray.500">
              No categories found.
            </Text>
          </Flex>
        )}

        {/* CATEGORY GRID */}
        {!loading && filtered.length > 0 && (
          <SimpleGrid columns={[1, 2, 3]} spacing="25px">
            {filtered.map((cat) => (
              <Box
                key={cat.id}
                bg="#f8f8fb"
                borderRadius="lg"
                p="18px"
                boxShadow="md"
                transition="0.2s"
                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}>
                <Image
                  src={cat.image}
                  alt={cat.cate_name}
                  height="160px"
                  width="100%"
                  objectFit="cover"
                  borderRadius="md"
                  mb="12px"
                />

                <Text fontSize="lg" fontWeight="bold" color="#222">
                  {cat.cate_name}
                </Text>

                <Text fontSize="sm" color="gray.600" mt="4px">
                  {cat.description}
                </Text>

                <Text fontSize="xs" color="gray.500" mt="8px">
                  Created: {new Date(cat.created_at).toLocaleDateString()}
                </Text>

                <Flex justify="flex-end" mt="12px" gap="10px">
                  <IconButton
                    icon={<FiEdit />}
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                  />
                  <IconButton
                    icon={<FiTrash2 />} onClick={()=>{handleDeleteModal(cat?.id)}}
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                  />
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
    </>
  );
};

export default CategoryList;
