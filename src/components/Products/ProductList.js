import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  Flex,
  Input,
  Select,
  IconButton,
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
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { FiEye, FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Config } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";
import { FaInfoCircle } from "react-icons/fa";
import ExportButton from "../Button/ExportBtn";
import ProductImageViewModal from "./ProductImageViewModal";
import { useColorModeValue } from "@chakra-ui/react";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("");

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Modal disclosures

  const {
    isOpen: isProductImageModalOpen,
    onOpen: onProductImageModalOpen,
    onClose: onProductImageModalClose,
  } = useDisclosure();

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
        setTotalItems(res.data.totalItems);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [page, limit, search, expiryFilter]);
  const productHeader = [
    "name",
    "category",
    "sub_category",
    "child_category",
    "brand",
    "type",
     "stock",
    "expiry_status",
  ];

  const productExportData = filtered.map((item) => ({
    name: item.product_name,
    category: item.category_name,
    sub_category: item.sub_category,
    child_category: item.child_category,
    brand: item.brand,
    type: item.product_type,
    stock:
      (item.single_packs || []).reduce((a, b) => a + b.stock_qty, 0) +
      (item.multi_packs || []).reduce((a, b) => a + b.stock_qty, 0),
    expiry_status: item.expiry_status,
  }));

  const handleImagePreview = (image) => {
    setPreviewImage(image);
    onProductImageModalOpen();
  };

  /* ================= DELETE MODAL ================= */
  const handleDeleteModal = (id) => {
    setProductId(id);
    onOpen();
  };

  const bgColor = useColorModeValue("white", "#1E293B");
  const textColor = useColorModeValue("gray.800", "white");
   const rowHoverBg = useColorModeValue("gray.50", "gray.700")
  
  return (
    <>
      <DeleteProductModal
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        getProducts={getProducts}
      />
      {previewImage && (
        <ProductImageViewModal
          isOpen={isProductImageModalOpen}
          onClose={onProductImageModalClose}
          previewImage={previewImage}
        />
      )}

      <Box
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        ml={{ base: "0", lg: "260px" }}
        mb={5}
        minH="100vh"
        px={{ base: 0, lg: 6 }}
      >
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>

        <Box
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="0px"
          bottom="0px"
          left="0px"
          right="0px"
          zIndex="11"
        >
          <TopBar />
        </Box>

        <Box
          mt={4}
          bg={bgColor}
          color={textColor}
          p={4}
          borderRadius="0.75rem"
          boxShadow="lg"
          mx={{ base: 3, lg: 0 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="2xl" fontWeight="600" mb={4}>
              Product List
            </Text>

            <Button
              variant="outline"
              border="1px"
              borderColor="#2275FC"
              borderRadius="8px"
              color="#2275FC"
              bg="white"
              px={6}
              py={5}
              fontSize="14px"
              fontWeight="500"
              onClick={() => navigate("/add-product")}
              _hover={{
                bg: "#1357c4",
                color: "white",
              }}
            >
              + Add Product
            </Button>
          </Box>
          {/* ================= FILTERS ================= */}
          <Flex
            mb={4}
            gap={4}
            flexWrap="wrap"
            direction={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <Input
              placeholder="Search product..."
              w={{ base: "100%", md: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              w={{ base: "100%", md: "200px" }}
              value={expiryFilter}
              onChange={(e) => {
                setExpiryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              <option value="expired">Expired</option>
              <option value="near_expiry">Near Expiry</option>
              <option value="up_to_date">Up To Date</option>
            </Select>
            <Box ml={{ base: "0", md: "auto" }}>
              <ExportButton
                data={productExportData}
                headers={productHeader}
                fileName="products.csv"
              />
            </Box>
          </Flex>

          {/* ================= TABLE ================= */}
          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <Box overflowX="auto">
                <Table
                  variant="simple"
                  minW={{ base: "1200px", md: "1500px", xl: "1750px" }}
                  className="productsTable"
                >
                  <Thead bg="gray.100" mb={2}>
                    <Tr>
                      <Th minW="275px">Product</Th>
                      <Th minW="200px">Category</Th>
                      <Th minW="180px">Sub Category</Th>
                      <Th minW="170px">Child Category</Th>
                      <Th minW="160px">Brand</Th>
                      <Th minW="120px">Type</Th>
                      <Th minW="120px">Stock</Th>
                      <Th minW="120px">Expiry</Th>
                      <Th minW="260px">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filtered.map((item) => (
                      <Tr key={item.id} _hover={{ bg: rowHoverBg }}>
                        <Td>
                          <Box position="relative" w="50px" h="50px">
                            <Image
                              src={item.product_img}
                              alt={item.product_name}
                              boxSize="50px"
                              objectFit="cover"
                              rounded="md"
                            />
                            {/* Overlay Icon */}
                            <IconButton
                              icon={<FiEye />}
                              size="xs"
                              position="absolute"
                              top="-2%"
                              left="90%"
                              bg="blackAlpha.600"
                              color="white"
                              _hover={{ bg: "blackAlpha.800" }}
                              onClick={() =>
                                handleImagePreview(item.product_img)
                              }
                              aria-label="Preview Image"
                            />
                          </Box>
                        </Td>
                        <Td>{item.category_name}</Td>

                        <Td>{item.sub_category}</Td>
                        <Td>{item.child_category}</Td>
                        <Td>{item.brand}</Td>
                        <Td>{item.product_type}</Td>

                        <Td>
                          <Badge
                            bg={
                              item.single_packs.reduce(
                                (a, b) => a + b.stock_qty,
                                0,
                              ) +
                                item.multi_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0,
                                ) >
                              0
                                ? " #FFDCDC"
                                : "#D9ECFF"

                            }
                            color={
                              item.single_packs.reduce(
                                (a, b) => a + b.stock_qty,
                                0,
                              ) +
                                item.multi_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0,
                                ) >
                              0
                                ? " #990000"
                                : "#004B9A"
                            }
                            fontSize="10px"
                            px="6px"
                            py={1}
                            rounded="lg"
                            textAlign="center"
                            display="inline-block"
                            minW="70px"
                          >
                            {item.single_packs.reduce(
                              (a, b) => a + b.stock_qty,
                              0,
                            ) +
                              item.multi_packs.reduce(
                                (a, b) => a + b.stock_qty,
                                0,
                              ) >
                            0
                              ? item.single_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0,
                                ) +
                                item.multi_packs.reduce(
                                  (a, b) => a + b.stock_qty,
                                  0,
                                )
                              : "Out of Stock"}
                          </Badge>
                        </Td>

                        <Td>
                          <Badge
                          fontSize="10px"
                            bg={
                              item.expiry_status === "near_expiry"
                                ? "#FFDCDC"
                                : "#D9ECFF"
                            }
                            color={
                              item.expiry_status === "near_expiry"
                                ? "#990000"
                                : "#004B9A"
                            }
                            px="6px"
                            py={1}
                            rounded="lg"
                          >
                            {item.expiry_status === "near_expiry"
                              ? "Near Expiry"
                              : "Up to Date"}
                          </Badge>
                        </Td>

                        <Td>
                          <HStack spacing={2}>
                            <Button
                              bgColor={bgColor}
                              size="sm"
                              onClick={() => navigate(`/product/${item.id}`)}
                            >
                              <FiEye size={18} color="#2563eb" />
                            </Button>
                            <Button
                              bgColor={bgColor}
                              size="sm"
                              onClick={() =>
                                navigate(`/product-details/${item.id}`)
                              }
                            >
                              <FaInfoCircle size={18} color="#FFA500" />
                            </Button>
                            <Button
                              bgColor={bgColor}
                              size="sm"
                              onClick={() =>
                                navigate(`/update-product/${item.id}`)
                              }
                            >
                              <FiEdit size={18} color="#16a34a" />
                            </Button>
                            <Button
                              bg={bgColor}
                              size="sm"
                              onClick={() => handleDeleteModal(item.id)}
                            >
                              <RiDeleteBin6Line size={18} color="#dc2626" />
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
                px={4}
                py={3}
                bg={bgColor}
                color={textColor}
                borderRadius="lg"
                justifyContent="space-between"
                align="center"
                flexWrap="wrap"
                gap={3}
              >
                <Text fontSize="sm" color="gray.600">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, totalItems)} of {totalItems} entries
                </Text>
                <HStack spacing={1}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    isDisabled={page === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      colorScheme="blue"
                      variant={page === index + 1 ? "solid" : "outline"}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    isDisabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </HStack>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductList;
