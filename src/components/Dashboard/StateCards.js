import { Box, Flex, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import { FiShoppingCart, FiDollarSign, FiUsers } from "react-icons/fi";
import { BsClipboardCheck } from "react-icons/bs";

const StateCards = () => {
  const cards = [
    {
      title: "Total Sales",
      value: "34,945",
      percent: "1.56%",
      icon: FiShoppingCart,
      color: "green.500",
    },
    {
      title: "Total Income",
      value: "$37,802",
      percent: "1.56%",
      icon: FiDollarSign,
      color: "red.500",
    },
    {
      title: "Orders Paid",
      value: "34,945",
      percent: "0.00%",
      icon: BsClipboardCheck,
      color: "gray.400",
    },
    {
      title: "Total Visitor",
      value: "34,945",
      percent: "1.56%",
      icon: FiUsers,
      color: "blue.500",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5} alignItems="stretch">
      {cards.map((card, index) => (
        <Box
          key={index}
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          minH="110px"
          display="flex"
          alignItems="center"
        >
          <Flex w="100%" justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <Flex
                bg={card.color}
                w="42px"
                h="42px"
                p={3}
                align="center"
                justify="center"
                borderRadius="full"
                color="white"
              >
                <Icon as={card.icon} boxSize={5} />
              </Flex>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  {card.title}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  {card.value}
                </Text>
              </Box>
            </Flex>
          {/* Right Section */}
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="green.500"
              whiteSpace="nowrap"
            >
              ↑ {card.percent}
            </Text>


           
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default StateCards;
