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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";
import { PiGreaterThan } from "react-icons/pi";
import { PiLessThan } from "react-icons/pi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("");

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* ================= FETCH PRODUCTS ================= */
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(Config.get_products, {
        params: {
          page,
          limit,
          search,
          category: categoryFilter,
          expiry_status: expiryFilter,
        },
      });

      if (res.data.success) {
        setProducts(res.data.data);
        setFiltered(res.data.data);
        setTotalPages(res?.data?.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [page, limit, search, expiryFilter]);

  /* ================= DELETE MODAL ================= */
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
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        ml={{ base: "0", lg: "260px" }}
        mb={5}
        px={{ base: 0, md: 0, lg: 6 }}
      >
        <Box display={{ base: "flex", md: "flex", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>

        <Box display={{ base: "none", lg: "flex" }}>
          <TopBar />
        </Box>

        <Box
          mt={4}
          bg="white"
          p={4}
          borderRadius="0.75rem"
          boxShadow="lg"
          mx={{ base: 3, md: 3, lg: 0 }}
        >
          <Text fontSize="2xl" fontWeight="600" mb={4}>
            Product List
          </Text>

          {/* ================= FILTERS ================= */}
          <Flex
            mb={4}
            gap={4}
            flexWrap="wrap"
            direction={{ base: "column", md: "row" }}
          >
            <Input
              placeholder="Search product..."
              w={{ base: "100%", sm: "100%", md: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              w={{ base: "100%", sm: "100%", md: "180px" }}
              value={expiryFilter}
              onChange={(e) => {
                setExpiryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Expiry</option>
              <option value="expired">Expired</option>
              <option value="near_expiry">Near Expiry</option>
              <option value="up_to_date">Up To Date</option>
            </Select>
          </Flex>

          {/* ================= TABLE ================= */}
          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <Box overflowX="auto" w="100%">
                <Table
                  variant="simple"
                  minW={{ base: "1200px", md: "1500px", xl: "1750px" }}
                  className="productsTable"
                >
                  <Thead bg="gray.100">
                    <Tr>
                      <Th minW="275px">Product</Th>
                      <Th minW="200px">Category</Th>
                      <Th minW="160px">Sub Category</Th>
                      <Th minW="170px">Child Category</Th>
                      <Th minW="140px">Brand</Th>
                      <Th minW="120px">Type</Th>
                      <Th minW="100px">Variants</Th>
                      <Th minW="120px">Stock</Th>
                      <Th minW="120px">Expiry</Th>
                      <Th minW="260px">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filtered.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                          <HStack spacing={3}>
                            <Image
                              src={item.product_img}
                              alt={item.product_name}
                              boxSize="50px"
                              rounded="md"
                              objectFit="cover"
                            />
                            <Box>
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                fontWeight="600"
                              >
                                {item.product_name}
                              </Text>
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                fontSize="sm"
                                color="gray.500"
                              >
                                {" "}
                                {item.product_description}{" "}
                              </Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td>{item.category_name}</Td>

                        <Td>{item.sub_category}</Td>
                        <Td>{item.child_category}</Td>
                        <Td>{item.brand}</Td>
                        <Td>{item.product_type}</Td>
                        <Td>
                          {item.single_packs.length + item.multi_packs.length}
                        </Td>

                        <Td>
                          <Badge
                            colorScheme={
                              item.single_packs.reduce(
                                (a, b) => a + b.stock_qty,
                                0
                              ) +
                                item.multi_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0
                                ) >
                              0
                                ? "green"
                                : "red"
                            }
                            px={3}
                            py={1}
                            rounded="lg"
                            textAlign="center"
                            display="inline-block"
                            minW="70px"
                          >
                            {item.single_packs.reduce(
                              (a, b) => a + b.stock_qty,
                              0
                            ) +
                              item.multi_packs.reduce(
                                (a, b) => a + b.stock_qty,
                                0
                              ) >
                            0
                              ? item.single_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0
                                ) +
                                item.multi_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0
                                )
                              : "Out of Stock"}
                          </Badge>
                        </Td>

                        <Td>
                          <Badge
                            colorScheme={
                              item.expiry_status === "Near Expiry"
                                ? "orange"
                                : "gray"
                            }
                            px={2}
                            py={1}
                            rounded="lg"
                          >
                            {item.expiry_status}
                          </Badge>
                        </Td>

                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => navigate(`/product/${item.id}`)}
                            >
                              {" "}
                              View{" "}
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={() =>
                                navigate(`/product-details/${item.id}`)
                              }
                            >
                              {" "}
                              Details{" "}
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="yellow"
                              onClick={() =>
                                navigate(`/update-product/${item.id}`)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => handleDeleteModal(item.id)}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              {/* ================= PAGINATION ================= */}
              <Flex
                mt={6}
                w={"100%"}
                direction={{base:"column",md:"row"}}
                gap={{base:4, md:0}}
              >
                <Flex w="100%" justify={{base:"space-between",md:"space-between"}} align="center">
                  <Text fontSize="md">
                    Page {page} Of {totalPages}
                  </Text>
                  <Select
                    width="120px"
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </Select>
                </Flex>
               <Flex w="100%" justify="center" align="center">
                    <HStack>

                  <Button
                    bg="blue.50"
                    onClick={() => setPage(page - 1)}
                  >
                    <PiLessThan size={18} color="black" />
                  </Button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      onClick={() => setPage(i + 1)}
                      colorScheme={page === i + 1 ? "blue" : "gray"}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    onClick={() => setPage(page + 1)}
                    bg="blue.50"
                  >
                    <PiGreaterThan size={18} color="black" />
                  </Button>
                  </HStack>
                   </Flex>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductList;
