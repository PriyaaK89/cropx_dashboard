import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Card,
  CardBody,
  Text,
  Image,
  Flex,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

const ViewOrderListModal = ({ isOpen, onClose, selectedItems }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Orders</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* GRID START */}
          <SimpleGrid columns={2} spacing={4}>
            {selectedItems?.map((item) => (
              <Card
                key={item.id}
                p={3}
                boxShadow="sm"
                borderRadius="md"
              >
                <Flex align="center" gap={3}>
                  {/* Image */}
                  <Image
                    src={item.product_img}
                    alt={item.product_name}
                    boxSize="70px"
                    objectFit="contain"
                    flexShrink={0}
                  />

                  {/* Details */}
                  <Flex direction="column" flex="1" minW={0}>
                    <Text fontWeight="bold" fontSize="14px" noOfLines={1}>
                      {item.product_name}
                    </Text>

                    {/* Size single line */}
                    <Text
                      fontSize="13px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      Size{" "}
                      <Text as="span" fontWeight="bold">
                        {item.base_pack && item.pack_quantity
                          ? `${item.variant_quantity_value * item.pack_quantity} ${item.variant_quantity_type} (${item.variant_quantity_value}${item.variant_quantity_type} × ${item.pack_quantity})`
                          : `${item.variant_quantity_value} ${item.variant_quantity_type}`}
                      </Text>
                    </Text>

                    {/* Price */}
                    <HStack spacing={2} mt={1}>
                      <Text fontWeight="bold" fontSize="14px">
                        ₹{item.variant_discounted_price}
                      </Text>
                      <Text
                        fontSize="12px"
                        color="gray.500"
                        textDecoration="line-through"
                      >
                        ₹{item.variant_actual_price}
                      </Text>
                    </HStack>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </SimpleGrid>
          {/* GRID END */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewOrderListModal;
