import {
  Button,
  Box,
  Flex,
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

  /* ================= FETCH BEST SELLING ================= */
  const fetchBestSelling = async () => {
    setLoading(true);
    try {
      const res = await axios.get(Config.best_selling);
      setProducts(res.data.data);
    } catch (error) {
      console.log("Error fetching Best Selling:", error);
    }
    setLoading(false);
  };

  /* ================= FETCH NEW ARRIVALS ================= */
  const fetchNewArrivals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(Config.new_arrivals, {
        params: { page, limit },
      });

      if (res.data.success) {
        setNewArrivals(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log("Error fetching New Arrivals:", error);
    }
    setLoading(false);
  };

  /* ================= USE EFFECT ================= */
  useEffect(() => {
    if (activeTab === "best") {
      fetchBestSelling();
    }

    if (activeTab === "new") {
      fetchNewArrivals();
    }
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
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0" zIndex={100}>
          <TopBar />
        </Box>

        <Box
          mt={4}
          bg="white"
          p={4}
          borderRadius="0.75rem"
          boxShadow="lg"
          mx={{ base: 3, lg: 0 }}
        >
          <Flex justify="center" mb={4} gap="10px">
            <Button
              colorScheme={activeTab === "best" ? "green" : "gray"}
              onClick={() => setActiveTab("best")}
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

          {/* ================= TAB CONTENT ================= */}
          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : activeTab === "best" ? (
            <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
              {products.map((p) => (
                <BestSelling
                  key={p.id}
                  p={p}
                  cardBg={cardBg}
                  priceColor={priceColor}
                  handleOpenModal={handleOpenModal}
                />
              ))}
            </Flex>
          ) : (
            <NewArrivals
              data={newArrivals}
              cardBg={cardBg}
              priceColor={priceColor}
              handleOpenModal={handleOpenModal}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              limit={limit}
              setLimit={setLimit}
              loading={loading}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductByType;
