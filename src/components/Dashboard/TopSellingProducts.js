import {
  Box,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";

const products = [
  {
    id: "RT15246630",
    name: "Bracelet Platinum plated",
    image: "https://via.placeholder.com/40",
    price: 65,
    orders: 6,
  },
  {
    id: "RT15246680",
    name: "Sofa Single light coco",
    image: "https://via.placeholder.com/40",
    price: 50,
    orders: 4,
  },
  {
    id: "RT152461850",
    name: "Sandals women low heel",
    image: "https://via.placeholder.com/40",
    price: 55,
    orders: 4,
  },
  {
    id: "RT15249630",
    name: "Light Bulb WiFi BT control",
    image: "https://via.placeholder.com/40",
    price: 48,
    orders: 3,
  },
  {
    id: "RT15246745",
    name: "Sandals women High heel",
    image: "https://via.placeholder.com/40",
    price: 63,
    orders: 3,
  },
];

const TopSellingProducts = () => {
  return (
    <Box bg="white" p={4} borderRadius="xl" boxShadow="md">
      <Text fontWeight="semibold" fontSize="lg">
        Top selling products
      </Text>
      <Text fontSize="sm" color="gray.500" mb={4}>
        New product in top 5 list <b>2 items</b>
      </Text>

      <VStack spacing={4} align="stretch">
        {products.map((item) => (
          <Flex key={item.id} justify="space-between" align="center">
            <HStack spacing={3}>
              <Image
                src={item.image}
                boxSize="40px"
                borderRadius="md"
              />
              <Box>
                <Text fontSize="sm" noOfLines={1} maxW="140px">
                  {item.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  ID: {item.id}
                </Text>
              </Box>
            </HStack>

            <Box textAlign="right">
              <Text fontWeight="semibold">
                {item.price}.00
              </Text>
              <Text fontSize="xs" color="gray.500">
                {item.orders} Orders
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>

      {/* Footer */}
      <Flex mt={6} align="center" gap={3}>
        <Box
          w="42px"
          h="42px"
          borderRadius="full"
          border="4px solid #CBD5E0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
          fontWeight="500"
        >
          35%
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            3,201.00
          </Text>
          <Text fontSize="sm" color="gray.500">
            From total revenue made
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TopSellingProducts;
