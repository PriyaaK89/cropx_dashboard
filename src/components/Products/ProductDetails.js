import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Spinner,
  Heading,
  SimpleGrid,
  Divider,
  Card,
  CardBody,
  Stack,
  Button,
  HStack,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Config } from "../../utils/Config";
import axios from "axios";
import AddDetailsModal from "./DetailsPopup/AddDetailsModal";
import UpdateDetailsModal from "./DetailsPopup/UpdateDetailsModal";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";


const ProductDetails = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [productId, setProductId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUpdateDetailsModalOpen,
    onOpen: onUpdateDetailsModalOpen,
    onClose: onUpdateDetailsModalClose,
  } = useDisclosure();

  const handleAddDetailsModal = (id) => {
    onOpen();
    setProductId(id);
  };

  const handleUpdateDetailsModal = (id) => {
    onUpdateDetailsModalOpen();
    setProductId(id);
  };

  const getProductDetails = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${Config?.get_Product_Details}/${id}`);

      if (response?.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log("Error fetching product details:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);
  // Simple Section Wrapper (Admin Style)
  const pageBg = useColorModeValue("gray.50", "#0E1629");
  const cardBg = useColorModeValue("white", "#1E293B");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const Section = ({ title, children }) => (
    <Box
      py={3}
      width="100%"
      bgColor={cardBg}
      textColor={textColor}
      height="auto"
      borderRadius="lg"
      boxShadow="md"
      mb={4}
    >
      <Heading fontSize="14px" px={4} fontWeight="700" color={textColor} mb={1}>
        {title}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );

  // Grid List Format for Text Items
  const GridList = ({ data }) => (
    <Stack spacing={0}>
      {data?.map((item, i) => (
        <Box
          key={i}
          px={3}
          py={1}
          bg="transparent"
          color="#575864;
"
          fontSize="14px"
        >
          <Text>{item?.name}</Text>
        </Box>
      ))}
    </Stack>
  );

  return (
    <>
      <AddDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        getProductDetails={getProductDetails}
      />
      <UpdateDetailsModal
        isUpdateDetailsModalOpen={isUpdateDetailsModalOpen}
        onUpdateDetailsModalClose={onUpdateDetailsModalClose}
        getProductDetails={getProductDetails}
        productId={productId}
        data={data}
      />
      <Box w="100%" bg={pageBg} pt={{ base: "60px", lg: 0 }}>
        <Flex>
          <Box display={{ base: "none", lg: "flex" }}>
            <LeftSidebar />
          </Box>
          <Box
            w={{ base: "100%", lg: "calc(100% - 260px)" }}
            ml={{ base: 0, lg: "260px" }}
            px={{ base: 0, lg: 6 }}
            mb={5}
          >
            <Box display={{ base: "block", lg: "none" }}>
              <ResponsiveNavbar />
            </Box>
            <Box
              display={{ base: "none", lg: "block" }}
              position="sticky"
              top="0px"
              left="0px"
              bottom="0px"
              zIndex="11"
            >
              <TopBar />
            </Box>
            <Box
              bg={cardBg}
              textColor={textColor}
              p={4}
              mt={4}
              boxShadow="lg"
              borderRadius="0.75rem"
              mx={{ base: 3, lg: 0 }}
            >
              {/* ------------------ PAGE TITLE ------------------ */}
              <HStack justifyContent="space-between" mb={4}>
                <Breadcrumb fontSize="13px">
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">
                      <GoHomeFill />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/product-list">
                      Product List
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink> Product Details</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                <Heading size="md" fontWeight="600" mb={6}>
                  Product Details
                </Heading>
              </HStack>

              <HStack>
                <Button
                  onClick={() => {
                    handleUpdateDetailsModal(data?.id);
                  }}
                >
                  Edit Details
                </Button>
                <Button
                  onClick={() => {
                    handleAddDetailsModal(data?.id);
                  }}
                >
                  Add Details
                </Button>
              </HStack>

              {/* ------------------ TOP MAIN SECTION ------------------ */}
              <Flex
                gap={6}
                flexDir={{ base: "column", md: "row" }}
                align="flex-start"
              >
                {/* PRODUCT IMAGE */}
                <Box w={{ base: "100%", md: "35%" }}>
                  <Card bg={cardBg} p={4} mt={3}>
                    <Image
                      src={data?.product_img}
                      alt={data?.product_name}
                      objectFit="contain"
                      w="100%"
                      h="300px"
                      bg={cardBg}
                      p={4}
                      boxShadow="sm"
                    />
                  </Card>
                </Box>

                {/* PRODUCT BASIC DETAILS */}
                <Box flex="1">
                  <Card bg={cardBg}>
                    <Stack spacing={3} px={3} py={1}>
                      <Heading textColor={textColor} size="md">{data?.product_name}</Heading>

                      <Text color={textColor}>{data?.product_description}</Text>

                      <Text textColor={textColor} fontWeight="600" mt={2}>
                        Type:{" "}
                        <span style={{ color: "#2b6cb0" }}>
                          {data?.product_type}
                        </span>
                      </Text>
                    </Stack>
                  </Card>
                </Box>
              </Flex>

              {/* ------------------ SINGLE PACK PRICING ------------------ */}
              <Box mt={8}>
                <Heading textColor={textColor} size="md" mb={3} color={textColor}>
                  Single Pack Pricing
                </Heading>

                <Stack spacing={5}>
                  {data?.single_packs?.map((item) => (
                    <Card
                      key={item?.variant_id}
                      position="relative"
                      bgColor={cardBg}
                      border="1px solid rgb(46, 125, 50)"
                      p={5}
                      w="100%"
                      maxW="180px"
                      height="100px"
                      boxShadow="md"
                    >
                      <Stack spacing={2}>
                        <Text textColor={textColor} fontSize="14px" fontWeight="700">
                          {item?.base_quantity_value} {item?.base_quantity_type}
                        </Text>

                        <Flex gap={3} align="center">
                          <Text fontSize="14px" fontWeight="700" textColor={textColor}>
                            ₹{item?.discounted_price}
                          </Text>
                          <Text
                            textDecoration="line-through"
                            fontSize="13px"
                            color={textColor}
                          >
                            ₹{item?.actual_price}
                          </Text>
                        </Flex>

                        <Badge
                          bgColor="#ffa726"
                          color="textColor"
                          width="fit-content"
                          position="absolute"
                          top="-1px"
                          left="47px"
                          borderBottomRadius="12px"
                          p="0px 6px 2px"
                          mb={4}
                        >
                          {item?.discount_percent}% OFF
                        </Badge>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Box>

              {/* ------------------ MULTIPACK PRICING ------------------ */}
              <Box mt={10} mb={4}>
                <Heading textColor={textColor} size="md" mb={3} color={textColor}>
                  Multipack Options
                </Heading>

                <Stack spacing={5}>
                  {data?.multi_packs?.map((mp) => (
                    <Card
                      key={mp?.multipack_id}
                      position="relative"
                      bgColor={cardBg}
                      border="1px solid #e0e0e0"
                      p={5}
                      w="100%"
                      maxW="250px"
                      height="150px"
                      boxShadow="md"
                    >
                      <Stack spacing={2}>
                        <Text fontSize="14px" textColor={textColor}>
                          {mp?.pack_quantity} Packs × {mp?.base_quantity_value}{" "}
                          {mp?.base_quantity_type}
                        </Text>

                        <Text color="gray.600" fontSize="14px" textColor={textColor}>
                          Total Quantity: {mp?.total_quantity_value}
                        </Text>

                        <Flex gap={3} align="center">
                          <Text
                            fontSize="14px"
                            fontWeight="bold"
                            textColor={textColor}
                          >
                            ₹{mp?.discounted_price}
                          </Text>
                          <Text
                            textDecoration="line-through"
                            textColor={textColor}
                            fontSize="13px"
                          >
                            ₹{mp?.actual_price}
                          </Text>
                        </Flex>

                        <Badge bgColor="#ffa726"
                          color={textColor}
                          width="fit-content"
                          position="absolute"
                          top="-1px"
                          left="70px"
                          borderBottomRadius="12px"
                          p="0px 6px 2px"
                          mb={4}>
                          {mp?.discount_percentage}% OFF
                        </Badge>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Box>

              {/* ------------------ PRODUCT DETAILS BLOCKS ------------------ */}
              <Box>
                {/* ---- IMAGES ---- */}
                <Section title="Product Images">
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2}>
                    {data?.details?.images?.map((img, i) => (
                      <Card key={i} p={2} shadow="sm" borderRadius="lg" bg={cardBg}>
                        <Image src={img.src} h="120px" objectFit="cover" />
                      </Card>
                    ))}
                  </SimpleGrid>
                </Section>

                {/* ---- OVERVIEW ---- */}
                <Section title="Product Overview">
                  <Text textColor={textColor} data={data?.details?.product_overview} />
                </Section>

                {/* ---- FEATURES ---- */}
                <Section title="Key Features & Benefits">
                  <GridList data={data?.details?.key_features_and_benefits} />
                </Section>

                {/* ---- EXPERT ---- */}
                <Section title="Expert Advice">
                  <GridList data={data?.details?.expert_advice} />
                </Section>

                {/* ---- ADDITIONAL ---- */}
                <Section title="Additional Information">
                  <GridList data={data?.details?.additional_information} />
                </Section>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ProductDetails;
