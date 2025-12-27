import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Button,
  SimpleGrid,
  Divider,
  Badge,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../../utils/Config";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
import SinglePackVarientModal from "./SinglePackVarientModal";
import MultiPackVariantModal from "./MultiPackVarientModal";
import UpdateSingleVariantModal from "./UpdateSingleVariantModal";
import UpdateMultiVariantModal from "./UpdateMultiVariantModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteSingleVariantModal from "./DeleteSingleVariantModal";

const ViewProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [variantID, setVariantID] = useState(null);
  const [multiPackId, setMultiPackId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMultiVariantOpen,
    onOpen: onMultiVariantOpen,
    onClose: onMultiVariantClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateSinglePackVariantOpen,
    onOpen: onUpdateSinglePackVariantOpen,
    onClose: onUpdateSinglePackVariantClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateMultiVariantOpen,
    onOpen: onUpdateMultiVariantOpen,
    onClose: onUpdateMultiVariantClose,
  } = useDisclosure();

  const {
    isOpen: isSinglePackVariantModalOpen,
    onOpen: onSinglePackVariantModalOpen,
    onClose: onSinglePackVariantModalClose,
  } = useDisclosure();

  const handleSinglePackDeleteClick = (id) => {
    console.log("clicked varient id", id);
    setVariantID(id);
    onSinglePackVariantModalOpen();
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${Config?.get_product_by_id}/${id}`);
      setProductData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, []);

  if (!productData) return <p>Loading...</p>;
  const { product, variants } = productData;

  const handleDeleteModal = () => {
    onSinglePackVariantModalOpen();
  };

  return (
    <>
      <DeleteSingleVariantModal
        isSinglePackVariantModalOpen={isSinglePackVariantModalOpen}
        onSinglePackVariantModalClose={onSinglePackVariantModalClose}
        variantID={variantID}
        fetchDetails={fetchDetails}
      />
      <SinglePackVarientModal
        isOpen={isOpen}
        onClose={onClose}
        productId={product?.id}
        productType={product?.product_type}
        fetchDetails={fetchDetails}
      />

      <MultiPackVariantModal
        isMultiVariantOpen={isMultiVariantOpen}
        onMultiVariantClose={onMultiVariantClose}
        productId={product?.id}
        variants={variants}
        variantID={variantID}
        fetchDetails={fetchDetails}
      />

      <UpdateSingleVariantModal
        isUpdateSinglePackVariantOpen={isUpdateSinglePackVariantOpen}
        onUpdateSinglePackVariantClose={onUpdateSinglePackVariantClose}
        productId={product?.id}
        variantID={variantID}
        fetchDetails={fetchDetails}
        variants={variants}
      />

      <UpdateMultiVariantModal
        isUpdateMultiVariantOpen={isUpdateMultiVariantOpen}
        onUpdateMultiVariantClose={onUpdateMultiVariantClose}
        productId={product?.id}
        variantID={variantID}
        multiPackId={multiPackId}
        fetchDetails={fetchDetails}
        variants={variants}
      />

      {/* ===================== LAYOUT FIXED HERE ===================== */}
      <Box
        display="flex"
        gap={5}
        bg="#f8f8fb"
        minH="100vh"
        pl="1rem"
        mr="1rem"
        mt={2}
      >
        {/* LEFT SIDEBAR */}
        <Box width="17.5%">
          <LeftSidebar />
        </Box>

        {/* RIGHT MAIN AREA */}
        <Box
          width="77.5%"
          minH="100vh"
          pl="1.5rem" // Same spacing left
          mr="0.5rem"
        >
          <TopBar />

          <Box
            mt="30px"
            backgroundColor="white"
            rounded="lg"
            boxShadow="lg"
            p={5}
          >
            {/* PRODUCT HEADER */}
            <Flex gap="30px" align="flex-start">
              <Image
                src={product.product_img}
                alt={product.product_name}
                boxSize="170px"
                borderRadius="lg"
                shadow="md"
              />

              <Box>
                <Heading size="lg">{product.product_name}</Heading>
                <Flex gap="10px" mt="10px">
                  <Badge colorScheme="green" fontSize="14px">
                    {product.product_category}
                  </Badge>
                  <Badge colorScheme="blue" fontSize="14px">
                    {product.product_type}
                  </Badge>
                </Flex>
                <Text mt="15px" fontSize="16px" color="gray.600">
                  {product.product_description}
                </Text>
              </Box>
            </Flex>

            {/* ====================== SINGLE PACKS ====================== */}
            <Flex justify="space-between" align="center" mb="15px">
              <Heading size="md">Single Pack Variants</Heading>
              <Button colorScheme="blue" size="sm" onClick={onOpen}>
                + Add Single Pack
              </Button>
            </Flex>

            {variants.single_packs.length === 0 ? (
              <Text>No single packs available</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing="20px">
                {variants.single_packs.map((v) => (
                  <Box
                    key={v.variant_id}
                    border="1px solid #eaeaea"
                    borderRadius="lg"
                    p="16px"
                    shadow="sm"
                    _hover={{ shadow: "md", transform: "translateY(-3px)" }}
                    transition="0.2s"
                  >
                    <Stack spacing="6px">
                      <Flex justifyContent="space-between" mr={2}>
                        <Text fontSize="17px" fontWeight="bold">
                          {v.base_quantity_value} {v.base_quantity_type}
                        </Text>
                        <Box
                          border="1px solid red"
                          borderRadius="4px"
                          p={2}
                          onClick={() =>
                            handleSinglePackDeleteClick(v.variant_id)
                          }
                        >
                          <RiDeleteBin6Line color="red" />
                        </Box>
                      </Flex>

                      <Text color="gray.600">
                        Actual Price: ₹{v.actual_price}
                      </Text>

                      <Text>Discount Price: ₹{v.discounted_price}</Text>

                      <Badge mt="5px" colorScheme="purple" width="fit-content">
                        {v.discount_percent}% OFF
                      </Badge>

                      <Button
                        mt="12px"
                        size="sm"
                        width="100%"
                        colorScheme="teal"
                        onClick={() =>
                          onUpdateSinglePackVariantOpen(v.variant_id)
                        }
                      >
                        Update Variant
                      </Button>

                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => {
                          setVariantID(v.variantID);
                          onMultiVariantOpen();
                        }}
                      >
                        + Add Multi Pack
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            )}

            <Divider my="35px" />

            {/* ====================== MULTI PACKS ====================== */}
            <Flex justify="space-between" align="center" mb="15px">
              <Heading size="md">Multi Pack Variants</Heading>
            </Flex>

            {variants.multi_packs.length === 0 ? (
              <Text>No multi packs available</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing="20px">
                {variants.multi_packs.map((m) => (
                  <Box
                    key={m.multipack_id}
                    border="1px solid #eaeaea"
                    borderRadius="lg"
                    p="20px"
                    shadow="sm"
                    _hover={{ shadow: "md", transform: "translateY(-3px)" }}
                    transition="0.2s"
                  >
                    <Stack spacing="6px">
                      <Text fontSize="17px" fontWeight="bold">
                        {m.pack_quantity} Packs × {m.base_quantity_value}{" "}
                        {m.base_quantity_type}
                      </Text>

                      <Text color="gray.600">
                        Total Qty: {m.quantity_value}
                      </Text>

                      <Text>Actual Price: ₹{m.actual_price}</Text>
                      <Text>Discount Price: ₹{m.discounted_price}</Text>

                      <Badge mt="5px" colorScheme="pink" width="fit-content">
                        {m.discount_percentage}% OFF
                      </Badge>

                      <Button
                        mt="12px"
                        size="sm"
                        width="100%"
                        colorScheme="teal"
                        onClick={() =>
                          onUpdateMultiVariantOpen(m.multipack_id, m.variant_id)
                        }
                      >
                        Update Variant
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ViewProduct;
