import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Heading,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const ViewOrderListModal = ({
  
  isOpen,
  onClose,
  selectedItems = [],

  
}) =>{
  const bgColor = useColorModeValue("#2664a7", "#1E293B");
   const textColor = useColorModeValue("white", "gray.100");
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>

        {/* HEADER */}
        <Flex
          bg={bgColor}
          color={textColor}
          justify="space-between"
          align="center"
          px="16px"
          py="8px"
          borderTopRadius="md"
        >
          <Text fontWeight="bold">View Order</Text>
          <ModalCloseButton position="static" />
        </Flex>

        <ModalBody p={4}>

          {/* ================= SINGLE PACK ================= */}
          <Heading size="md" mb={3}>
            Single Pack Variants
          </Heading>

          {selectedItems.every(i => !i.variant_quantity_value) ? (
            <Text>No single packs available</Text>
          ) : (
            <SimpleGrid columns={1} spacing={4}>
              {selectedItems.map(item => (
                <Box key={`single-${item.id}`} border="1px solid #eaeaea" p={4}>
                  <Flex gap={3} align="center">
                    <Image
                      src={item.product_img}
                      boxSize="70px"
                      objectFit="contain"
                    />
                    <Box>
                      <Text fontWeight="bold">{item.product_name}</Text>
                      <Text fontSize="sm">
                        {item.variant_quantity_value} {item.variant_quantity_type}
                      </Text>
                    </Box>
                  </Flex>

                  <Text fontWeight="bold" mt={2}>
                    ₹{item.variant_discounted_price}
                  </Text>
                  <Text as="s" mr="1rem">
                    ₹{item.variant_actual_price}
                  </Text>

                  <Badge colorScheme="purple">
                    {item.variant_discount_percent}% OFF
                  </Badge>
                </Box>
              ))}
            </SimpleGrid>
          )}

          {/* ================= MULTI PACK ================= */}
          <Heading size="md" mt={8} mb={3}>
            Multi Pack Variants
          </Heading>

          {selectedItems.every(i => !i.multipack_id) ? (
            <Text>No multi packs available</Text>
          ) : (
            <SimpleGrid columns={1} spacing={4}>
              {selectedItems
                .filter(i => i.multipack_id)
                .map(item => (
                  <Box key={`multi-${item.id}`} border="1px solid #eaeaea" p={4}>
                    <Flex gap={3} align="center">
                      <Image
                        src={item.product_img}
                        boxSize="60px"
                        objectFit="contain"
                      />
                      <Box>
                        <Text fontWeight="bold">Multi Pack Variant</Text>
                        <Text fontSize="sm">{item.product_name}</Text>
                      </Box>
                    </Flex>

                    <Text mt={2}>
                      {item.pack_quantity} Packs ×{" "}
                      {item.variant_quantity_value}{" "}
                      {item.variant_quantity_type}
                    </Text>

                    <Text>
                      Total Qty: {item.total_quantity_value}
                    </Text>

                    <Text fontWeight="bold">
                      ₹{item.multipack_discounted_price}
                    </Text>
                    <Text as="s">
                      ₹{item.multipack_actual_price}
                    </Text>

                    <Badge colorScheme="pink" mr="1rem" >
                      {item.multipack_discount_percentage}% OFF
                    </Badge>
                  </Box>
                ))}
            </SimpleGrid>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


export default ViewOrderListModal;
