import {
  Button,
  Box,
  Flex,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import ProductQuantityModal from "./ProductQuantityModal";
import BestSelling from "./BestSelling";
import NewArrivals from "./NewArrivals";
import { Config } from "../../utils/Config";

const ProductByType = () => {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("best");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const {
    isOpen: isQuantityModalOpen,
    onOpen: onQuantityModalOpen,
    onClose: onQuantityModalClose,
  } = useDisclosure();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    onQuantityModalOpen();
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");

  /* ================= FETCH DATA (COMMON) ================= */
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url =
        activeTab === "best"
          ? Config.best_selling
          : Config.new_arrivals;

      const res = await axios.get(url, {
        params: { page, limit },
      });

      if (res.data.success) {
        activeTab === "best"
          ? setProducts(res.data.data)
          : setNewArrivals(res.data.data);

        setTotal(res.data.pagination.total);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
    setLoading(false);
  };

  /* ================= USE EFFECT ================= */
  useEffect(() => {
    fetchProducts();
  }, [activeTab, page, limit]);

  return (
    <>
      <ProductQuantityModal
        isQuantityModalOpen={isQuantityModalOpen}
        onQuantityModalClose={onQuantityModalClose}
        product={selectedProduct}
      />

      <Box
        w={{ base: "100%", lg: "calc(100% - 260px)" }}
        ml={{ base: 0, lg: "260px" }}
        px={{ base: 0, lg: 6 }}
        mb={5}
        minH="100vh"
      >
        {/* Navbar */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0">
          <TopBar />
        </Box>

        <Box mt={4} bg="white" p={4} borderRadius="lg" boxShadow="lg">
          {/* Tabs */}
          <Flex justify="center" mb={4} gap="10px">
            <Button
              colorScheme={activeTab === "best" ? "green" : "gray"}
              onClick={() => {
                setActiveTab("best");
                setPage(1);
              }}
            >
              Best Selling
            </Button>
            <Button
              colorScheme={activeTab === "new" ? "green" : "gray"}
              onClick={() => {
                setActiveTab("new");
                setPage(1);
              }}
            >
              New Arrivals
            </Button>
          </Flex>

          {/* CONTENT */}
          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
                {(activeTab === "best" ? products : newArrivals).map((p) => (
                  <BestSelling
                    key={p.id}
                    p={p}
                    cardBg={cardBg}
                    priceColor={priceColor}
                    handleOpenModal={handleOpenModal}
                  />
                ))}
              </Flex>

              {/* PAGINATION (COMMON) */}
              <Flex
                mt={6}
                px={4}
                py={3}
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={3}
              >
                <Text fontSize="12px" color="gray.600">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, total)} of {total} entries
                </Text>

                <Flex gap={1}>
                  <Button
                   fontWeight="medium"
                    size="sm"
                    variant="outline"
                    isDisabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      colorScheme="blue"
                      variant={page === i + 1 ? "solid" : "outline"}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    size="sm"
                    fontWeight="medium"
                    variant="outline"
                    isDisabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductByType;
