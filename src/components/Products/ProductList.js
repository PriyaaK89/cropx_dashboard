import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  Flex,
  Input,
  Select,
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
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProducts = async () => {
    try {
      const res = await axios.get(Config?.get_products);
      if (res.data.success) {
        setProducts(res.data.data);
        setFiltered(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter(
        (p) => p.product_category === categoryFilter
      );
    }

    setFiltered(result);
  }, [search, categoryFilter, products]);

  const handleDeleteModal = (id) => {
    setProductId(id);
    onOpen();
  };

  return (
    <>
      <DeleteProductModal
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        getProducts={getProducts}
      />

      <Box
        width={{ base: "100%", md: "calc(100% - 260px)" }}
        ml={{ base: 0, md: "260px" }}
        px={{ base:3, md:6}}
        bg="gray.50"
        mb={5}
      >
        {/* NAVBARS */}
        <Box display={{ base: "flex", md: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", md: "flex" }}>
          <TopBar />
        </Box>

        {/* CONTENT */}
        <Box bg="white" p={4} mt={6} borderRadius="0.75rem" boxShadow="lg">
          <Text fontSize="2xl" fontWeight="600" mb={5}>
            Product List
          </Text>

          {/* FILTERS */}
          <Flex
            gap={4}
            mb={4}
            direction={{ base: "column", md: "row" }}
          >
            <Input
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxW="300px"
            />

            <Select
              placeholder="Filter by category"
              maxW="300px"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {[...new Set(products.map(p => p.product_category))].map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </Select>
          </Flex>

          {/* LOADER */}
          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              {/* MOBILE CARD VIEW */}
              <SimpleGrid
                columns={1}
                spacing={4}
                display={{ base: "grid", md: "none" }}
              >
                {filtered.map(item => (
                  <Box
                    key={item.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                  >
                    <HStack spacing={3}>
                      <Image
                        src={item.product_img}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontWeight="600">{item.product_name}</Text>
                        <Badge
                          mt={1}
                          colorScheme={item.stock_qty > 0 ? "green" : "#f5eded"}
                        >
                          {item.stock_qty > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </Box>
                    </HStack>

                    <Button
                      mt={3}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteModal(item.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>

              {/* DESKTOP TABLE */}
              <Box
                display={{ base: "none", md: "block" }}
                overflowX="auto"
              >
                <Table
                  minW={{ md: "700px", lg: "900px", xl: "1000px", "2xl":"1200px"}}
                    className="prouctsTable"
               >
                  <Thead bg="gray.100">
                    <Tr>
                      <Th >Product</Th>
                      <Th width="20%">Category Name</Th>
                      <Th>Product Description</Th>
                      <Th>Stock</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {filtered.map(item => (
                      <Tr key={item.id}>
                        <Td>
                          <HStack>
                            <Image
                              src={item.product_img}
                              boxSize="45px"
                              objectFit="cover"
                            />
                            <Text>{item.product_name}</Text>
                          </HStack>
                        </Td>

                        <Td>{item.category_name}</Td>
                         <Td>{item.product_description}</Td>
                        <Td>
                          <Badge
                          px={4}
                          py={2}
                          borderRadius="4px"
                            colorScheme={item.stock_qty > 0 ? "green" : "red"}
                          >
                            {item.stock_qty > 0
                              ? item.stock_qty
                              : "Out Of Stock"}
                          </Badge>
                        </Td>

                        <Td>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() =>
                              handleDeleteModal(item.id)
                            }
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductList;
