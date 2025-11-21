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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Config } from "../../utils/Config";
import axios from "axios";
import AddDetailsModal from "./DetailsPopup/AddDetailsModal";
import UpdateDetailsModal from "./DetailsPopup/UpdateDetailsModal";

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
    setProductId(id)
  };

  const handleUpdateDetailsModal = (id) => {
    onUpdateDetailsModalOpen();
    setProductId(id)
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
  const Section = ({ title, children }) => (
    <Box mt={10}>
      <Heading size="md" mb={4} color="gray.700">
        {title}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );

  // Grid List Format for Text Items
  const GridList = ({ data }) => (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {data?.map((item, i) => (
        <Card key={i} p={4} bg="white" shadow="sm" borderRadius="md">
          <Text>{item?.name}</Text>
        </Card>
      ))}
    </SimpleGrid>
  );

  return (
    <>
    <AddDetailsModal isOpen={isOpen} onClose={onClose} productId={productId} getProductDetails={getProductDetails}/>
    <UpdateDetailsModal isUpdateDetailsModalOpen={isUpdateDetailsModalOpen} onUpdateDetailsModalClose={onUpdateDetailsModalClose}  getProductDetails={getProductDetails} productId={productId} data={data}/>
      <Box bg="#f5f6f8" minH="100vh" py={6}>
        <Box maxW="1240px" mx="auto" p={4}>
          {/* ------------------ PAGE TITLE ------------------ */}
          <Heading size="lg" fontWeight="600" mb={6}>
            Product Details
          </Heading>

          <HStack>
            <Button onClick={()=>{handleUpdateDetailsModal(data?.id)}}>Edit Details</Button>
            <Button onClick={()=>{handleAddDetailsModal(data?.id)}}>Add Details</Button>
          </HStack>

          {/* ------------------ TOP MAIN SECTION ------------------ */}
          <Flex
            gap={6}
            flexDir={{ base: "column", md: "row" }}
            align="flex-start">
            {/* PRODUCT IMAGE */}
            <Box w={{ base: "100%", md: "35%" }}>
              <Card bg="white" p={4} borderRadius="lg" shadow="sm">
                <Image
                  src={data?.product_img}
                  alt={data?.product_name}
                  objectFit="contain"
                  w="100%"
                  h="300px"
                  bg="#fafafa"
                  borderRadius="md"
                  p={4}
                />
              </Card>
            </Box>

            {/* PRODUCT BASIC DETAILS */}
            <Box flex="1">
              <Card bg="white" p={6} borderRadius="lg" shadow="sm">
                <Stack spacing={3}>
                  <Heading size="md">{data?.product_name}</Heading>

                  <Badge
                    width="fit-content"
                    colorScheme="blue"
                    px={2}
                    py={1}
                    borderRadius="md">
                    {data?.product_category}
                  </Badge>

                  <Text color="gray.600">{data?.product_description}</Text>

                  <Text fontWeight="600" mt={2}>
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
            <Heading size="md" mb={3} color="gray.700">
              Single Pack Pricing
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {data?.single_packs?.map((item) => (
                <Card
                  key={item?.variant_id}
                  bg="white"
                  p={5}
                  borderRadius="lg"
                  shadow="sm"
                  border="1px solid #e2e8f0">
                  <Stack spacing={2}>
                    <Text fontSize="lg" fontWeight="600">
                      {item?.base_quantity_value} {item?.base_quantity_type}
                    </Text>

                    <Flex gap={3} align="center">
                      <Text fontSize="xl" fontWeight="bold" color="green.600">
                        ₹{item?.total_discounted_price}
                      </Text>
                      <Text
                        textDecoration="line-through"
                        color="gray.500"
                        fontSize="sm">
                        ₹{item?.total_actual_price}
                      </Text>
                    </Flex>

                    <Badge colorScheme="green" width="fit-content">
                      {item?.discount_percent}% OFF
                    </Badge>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          {/* ------------------ MULTIPACK PRICING ------------------ */}
          <Box mt={10}>
            <Heading size="md" mb={3} color="gray.700">
              Multipack Options
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {data?.multi_packs?.map((mp) => (
                <Card
                  key={mp?.multipack_id}
                  bg="white"
                  p={5}
                  borderRadius="lg"
                  shadow="sm"
                  border="1px solid #e2e8f0">
                  <Stack spacing={2}>
                    <Text fontWeight="600" fontSize="lg">
                      {mp?.pack_quantity} Packs × {mp?.base_quantity_value}{" "}
                      {mp?.base_quantity_type}
                    </Text>

                    <Text color="gray.600">
                      Total Quantity: {mp?.total_quantity_value}
                    </Text>

                    <Flex gap={3} align="center">
                      <Text fontSize="xl" fontWeight="bold" color="purple.600">
                        ₹{mp?.total_discounted_price}
                      </Text>
                      <Text
                        textDecoration="line-through"
                        color="gray.500"
                        fontSize="sm">
                        ₹{mp?.total_actual_price}
                      </Text>
                    </Flex>

                    <Badge colorScheme="purple" width="fit-content">
                      {mp?.discount_percentage}% OFF
                    </Badge>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          {/* ------------------ PRODUCT DETAILS BLOCKS ------------------ */}
          <Box mt={12}>
            {/* ---- IMAGES ---- */}
            <Section title="Product Images">
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
                {data?.details?.images?.map((img, i) => (
                  <Card key={i} p={2} shadow="sm" bg="white" borderRadius="lg">
                    <Image src={img.src} h="120px" objectFit="cover" />
                  </Card>
                ))}
              </SimpleGrid>
            </Section>

            {/* ---- OVERVIEW ---- */}
            <Section title="Product Overview">
              <GridList data={data?.details?.product_overview} />
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
    </>
  );
};

export default ProductDetails;
