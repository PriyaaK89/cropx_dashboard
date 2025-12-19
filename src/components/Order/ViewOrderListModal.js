import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Text,
  Image,
  Flex,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";

const ViewOrderListModal = ({ isOpen, onClose, selectedItems,orderId }) => {
  console.log(orderId ,'orderID123')
  console.log("selected items", selectedItems);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Orders</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {selectedItems?.map((order, index) => (
            <Box
              key={index}
              p={5}
              mb={6}
              border="1px solid #e5e5e5"
              borderRadius="lg"
              bg="white"
            >
              {order.variant_quantity_value && (
                <Flex
                  p={4}
                  borderBottom="1px solid #e5e5e5"
                  gap={4}
                  align="center"
                >
                  <Image
                    src={order.product_img}
                    alt={order.product_name}
                    boxSize="70px"
                    objectFit="contain"
                  />
                  <Box flex="1">
                    <Text fontSize="16px" fontWeight="600">
                      {order.product_name}
                    </Text>

                    <Text fontSize="14px" mt={1}>
                      Size <b>{order.variant_quantity_value + " " + order.variant_quantity_type}</b>
                    </Text>

                    <HStack spacing={2} mt={1}>
                      <Text fontSize="16px" fontWeight="bold">
                        ₹{order.variant_discounted_price}
                      </Text>
                      <Text fontSize="14px" color="gray.500" as="s">
                        ₹{order.variant_actual_price}
                      </Text>
                    </HStack>
                    {
                      order.base_pack && (
                        <Text fontSize="14px" mt={1}>
                      Size <b>{order.variant_quantity_value + " " + order.variant_quantity_type}</b>
                    </Text>

                      )

                    }
                  </Box>
                </Flex>
              )}
            </Box>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewOrderListModal;
