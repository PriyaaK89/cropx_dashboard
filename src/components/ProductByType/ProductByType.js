import {
  Button,
  Box,
  Flex,
  useDisclosure,
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("best");
  const [newArrivals, setNewArrivals] = useState([]);

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

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };
  const fetchBestSelling = async () => {
    try {
      const res = await axios.get(`${Config?.best_selling}`);
      setProducts(res.data.data);
      console.log(res.data.data, "best selling");
    } catch (error) {
      console.log("Error fetching collection", error);
    }
  };
  const fetchNewArrivals = async () => {
    try {
      const res = await axios.get(`${Config?.new_arrivals}`);
      setNewArrivals(res.data.data);
    } catch (error) {
      console.log("Error fetching new arrivals", error);
    }
  };

  useEffect(() => {
    if (activeTab === "best") {
      fetchBestSelling();
    } else {
      fetchNewArrivals();
    }
  }, [activeTab]);

  return (
    <>
      <ProductQuantityModal
        isQuantityModalOpen={isQuantityModalOpen}
        onQuantityModalClose={onQuantityModalClose}
        product={selectedProduct}
      />
      <Box
        w={{ base: "100%", lg: "calc(100% - 260px )" }}
        ml={{ base: 0, lg: "260px" }}
        px={{ base: 0, lg: 6 }}
        mb={5}
        minH="100vh"
      >
        {/* Navbar */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="0"
          zIndex={100}
        >
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
          <Flex justify="space-between" mb={4}>
            <Button
              colorScheme={activeTab === "best" ? "green" : "gray"}
              onClick={() => setActiveTab("best")}
            >
              Best Selling
            </Button>
            <Button
              colorScheme={activeTab === "new" ? "green" : "gray"}
              onClick={() => setActiveTab("new")}
            >
              New Arrivals
            </Button>
          </Flex>
          {activeTab === "best" ? (
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
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductByType;
