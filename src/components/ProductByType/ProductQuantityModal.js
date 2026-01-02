import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

const ProductQuantityModal = ({
  isQuantityModalOpen,
  onQuantityModalClose,
  product,
}) => {
  const [quantities, setQuantities] = useState({});
  const cardBg = useColorModeValue("white", "gray.800");

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    return Math.round((diff / actual) * 100);
  };

  const handleIncrease = ({ variant_id, multipack_id }) => {
    const key = multipack_id ?? variant_id;
    setQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const handleDecrease = ({ variant_id, multipack_id }) => {
    const key = multipack_id ?? variant_id;
    setQuantities((prev) => {
      const newQty = (prev[key] || 0) - 1;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return { ...prev, [key]: newQty };
    });
  };

  return (
    <Modal
      isOpen={isQuantityModalOpen}
      onClose={onQuantityModalClose}
      size="lg"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent rounded="2xl" p={2}>
        <ModalHeader>
          <Flex align="center" gap={4}>
            <Image
              src={product?.product_img}
              alt={product?.product_name}
              boxSize="70px"
              objectFit="cover"
              rounded="lg"
            />
            <Box>
              <Text fontWeight="bold">{product?.product_name}</Text>
              <Text fontSize="sm" color="gray.500">
                {product?.product_description}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* ---------- SINGLE PACKS ---------- */}
          {product?.single_packs?.length > 0 && (
            <Box mb={6}>
              <Text fontWeight="semibold" mb={3}>
                Single Packs
              </Text>

              <VStack spacing={4} align="stretch">
                {product.single_packs.map((v) => {
                  const actual = Number(v.actual_price);
                  const discounted = Number(v.discounted_price);
                  const discountPercent = getDiscountPercent(
                    actual,
                    discounted
                  );

                  return (
                    <Box
                      key={v.variant_id}
                      p={3}
                      rounded="xl"
                      bg={cardBg}
                      borderWidth="1px"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="medium">
                            {v.quantity_value} {v.quantity_type}
                          </Text>

                          <Flex align="center" gap={2}>
                            <Text fontWeight="bold" color="green.600">
                              ₹{discounted}
                            </Text>
                            <Text as="s" fontSize="sm" color="gray.400">
                              ₹{actual}
                            </Text>
                            <Badge colorScheme="orange">
                              {discountPercent}% OFF
                            </Badge>
                          </Flex>

                          <Text fontSize="sm" color="green.500">
                            Save ₹{(actual - discounted).toFixed(2)}
                          </Text>
                        </Box>

                        {quantities[v.variant_id] ? (
                          <Flex
                            border="1px solid #ddd"
                            rounded="lg"
                            overflow="hidden"
                          >
                            <Button
                              onClick={() =>
                                handleDecrease({
                                  variant_id: v.variant_id,
                                })
                              }
                              bg="white"
                              color="red.500"
                            >
                              -
                            </Button>

                            <Box
                              bg="green.600"
                              color="white"
                              px={5}
                              py={1}
                              fontWeight="bold"
                            >
                              {quantities[v.variant_id]}
                            </Box>

                            <Button
                              onClick={() =>
                                handleIncrease({
                                  variant_id: v.variant_id,
                                })
                              }
                              bg="white"
                              color="green.600"
                            >
                              +
                            </Button>
                          </Flex>
                        ) :null}
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          )}

          {product?.single_packs?.length > 0 &&
            product?.multi_packs?.length > 0 && <Divider my={4} />}

          {/* ---------- MULTI PACKS ---------- */}
          {product?.multi_packs?.length > 0 && (
            <Box>
              <Text fontWeight="semibold" mb={3}>
                Multi Packs
              </Text>

              <VStack spacing={4} align="stretch">
                {product.multi_packs.map((m) => {
                  const actual = Number(m.total_actual_price);
                  const discounted = Number(m.total_discounted_price);
                  const discountPercent = getDiscountPercent(
                    actual,
                    discounted
                  );
                  const key = m.multipack_id;

                  return (
                    <Box
                      key={key}
                      p={3}
                      rounded="xl"
                      bg={cardBg}
                      borderWidth="1px"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="medium">
                            {m.pack_quantity} Packs of {m.base_quantity_value}{" "}
                            {m.base_quantity_type}
                          </Text>

                          <Flex align="center" gap={2}>
                            <Text fontWeight="bold" color="green.600">
                              ₹{discounted}
                            </Text>
                            <Text as="s" fontSize="sm" color="gray.400">
                              ₹{actual}
                            </Text>
                            <Badge colorScheme="orange">
                              {discountPercent}% OFF
                            </Badge>
                          </Flex>

                          <Text fontSize="sm" color="green.500">
                            Save ₹{(actual - discounted).toFixed(2)}
                          </Text>
                        </Box>

                        {quantities[key] ? (
                          <Flex
                            border="1px solid #ddd"
                            rounded="lg"
                            overflow="hidden"
                          >
                            <Button
                              onClick={() =>
                                handleDecrease({
                                  multipack_id: key,
                                })
                              }
                              bg="white"
                              color="red.500"
                            >
                              -
                            </Button>

                            <Box
                              bg="green.600"
                              color="white"
                              px={5}
                              py={1}
                              fontWeight="bold"
                            >
                              {quantities[key]}
                            </Box>

                            <Button
                              onClick={() =>
                                handleIncrease({
                                  multipack_id: key,
                                })
                              }
                              bg="white"
                              color="green.600"
                            >
                              +
                            </Button>
                          </Flex>
                        ) : null}
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          )}

          {!product?.single_packs?.length && !product?.multi_packs?.length && (
            <Text color="gray.500">No variants available</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductQuantityModal;
