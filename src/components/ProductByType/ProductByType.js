import {
  Button,
  Box,
  Flex,
  Text,
  Image,
  HStack,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import ProductQuantityModal from "./ProductQuantityModal";

import { Config } from "../../utils/Config";
const ProductByType = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
     const {
  isOpen: isQuantityModalOpen,
  onOpen: onQuantityModalOpen,
  onClose: onQuantityModalClose,
} = useDisclosure();

  
   const handleOpenModal = (product) =>{
    setSelectedProduct(product);
    onQuantityModalOpen();
   }
  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config?.best_selling}`);
      setProducts(res.data.data);
      console.log(res.data.data, "best selling");
    } catch (error) {
      console.log("Error fetching collection", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
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
            <Button>Best Selling</Button>
            <Button>New Arrivals</Button>
          </Flex>
          <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
            {products.map((p) => {
              const firstSingle = p.single_packs?.[0];

              const actualPrice = firstSingle
                ? parseFloat(firstSingle.actual_price)
                : null;
              const discountedPrice = firstSingle
                ? parseFloat(firstSingle.discounted_price)
                : null;
              const discountPercent =
                actualPrice && discountedPrice
                  ? getDiscountPercent(actualPrice, discountedPrice)
                  : null;

              return (
                <>
                  <Link key={p?.id} to={`/product-details/${p?.id}`}>
                    <Box
                      key={p?.id}
                      bg={cardBg}
                      rounded="2xl"
                      shadow="md"
                      overflow="hidden"
                      position="relative"
                      transition="all 0.3s"
                      width="250px"
                      _hover={{ transform: "scale(1.03)", shadow: "lg" }}
                    >
                      {discountPercent && (
                        <Badge
                          position="absolute"
                          top={0}
                          left={0}
                          background="#2c7d19"
                          color="white"
                          fontWeight={400}
                          rounded="0px 0px 24px"
                          px={3}
                          py={1}
                          fontSize="12px"
                        >
                          {discountPercent}% OFF
                        </Badge>
                      )}

                      <Box position="absolute" top={2} right={2}>
                        <FaHeart color="gray" />
                      </Box>

                      <Image
                        src={p.product_img}
                        alt={p.product_name}
                        w="100%"
                        h="200px"
                        paddingTop="2rem"
                        objectFit="contain"
                        bg="white"
                      />

                      <Box p={4}>
                        <Text
                          fontWeight="semibold"
                          fontFamily="Inter-SemiBold"
                          fontSize="md"
                          noOfLines={2}
                          lineHeight="19px"
                        >
                          {p.product_name}
                        </Text>
                        <Text fontSize="12px" color="gray.500">
                          {" "}
                          {p.product_category}{" "}
                        </Text>

                        {firstSingle ? (
                          <>
                            <Flex align="center" mt={2}>
                              <Text
                                fontSize="lg"
                                fontFamily="Inter-SemiBold"
                                color={priceColor}
                              >
                                ₹{discountedPrice}
                              </Text>
                              <Text
                                as="s"
                                fontSize="12px"
                                color="gray.400"
                                ml={2}
                              >
                                ₹{actualPrice}
                              </Text>
                            </Flex>

                            <HStack gap="3px">
                              <HiPercentBadge fill="green" />
                              <Text fontSize="12px" color="green.500">
                                Save ₹
                                {(actualPrice - discountedPrice).toFixed(2)}
                              </Text>
                            </HStack>

                            <HStack justifyContent={"space-between"} mt="8px">
                              <Text fontSize="14px">Size</Text>
                              <Flex
                                align="center"
                                justify="space-between"
                                px={4}
                                py={1}
                                gap={2}
                                borderWidth="1px"
                                borderRadius="lg"
                                cursor="pointer"
                                _hover={{ bg: "gray.100" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                    handleOpenModal(p)
                                }}
                              >
                                <Text fontSize="14px">
                                  {firstSingle.quantity_value}{" "}
                                  {firstSingle.quantity_type}
                                </Text>
                                <Icon
                                  as={FaChevronDown}
                                  boxSize={4}
                                  color="gray.500"
                                  mt="3px"
                                />
                              </Flex>
                            </HStack>
                          </>
                        ) : (
                          <Text fontSize="sm" color="red.400" mt={3}>
                            {" "}
                            Variant not available{" "}
                          </Text>
                        )}
                      </Box>
                    </Box>
                  </Link>
                </>
              );
            })}
          </Flex>
          {selectedProduct && (
        <ProductQuantityModal
          isQuantityModalOpen={isQuantityModalOpen}
          onQuantityModalClose={onQuantityModalClose}
          product={selectedProduct}
        />
      )}
        </Box>
      </Box>
    </>
  );
};

export default ProductByType;
