import {
  Box,
  Text,
  Image,
  Flex,
  HStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";

const BestSelling = ({ p, cardBg, priceColor, handleOpenModal }) => {
  //use FIRST pack only for price & discount
  const firstSingle = p.single_packs?.[0];

  const actualPrice = firstSingle
    ? parseFloat(firstSingle.actual_price)
    : null;

  const discountedPrice = firstSingle
    ? parseFloat(firstSingle.discounted_price)
    : null;

  const discountPercent =
    actualPrice && discountedPrice
      ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
      : null;

  return (
      <Box
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
            bg="#2c7d19"
            color="white"
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
          h="200px"
          w="100%"
          pt="2rem"
          objectFit="contain"
        />

        <Box p={4}>
          <Text fontWeight="semibold" noOfLines={2}>
            {p.product_name}
          </Text>

          <Text fontSize="12px" color="gray.500">
            {p.product_category}
          </Text>

          {firstSingle && (
            <>
              {/* PRICE */}
              <Flex mt={2} align="center">
                <Text color={priceColor} fontSize="lg">
                  ₹{discountedPrice}
                </Text>
                <Text as="s" ml={2} fontSize="12px" color="gray.400">
                  ₹{actualPrice}
                </Text>
              </Flex>

              <HStack>
                <HiPercentBadge fill="green" />
                <Text fontSize="12px" color="green.500">
                  Save ₹{(actualPrice - discountedPrice).toFixed(2)}
                </Text>
              </HStack>

              {/* ✅ ALL QUANTITY BUTTONS */}
              {p.single_packs?.map((pack) => (
                <Flex
                  key={pack.id}
                  mt={2}
                  justify="space-between"
                  align="center"
                  border="1px solid #ccc"
                  borderRadius="lg"
                  px={4}
                  py={1}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenModal({
                      ...p,
                      selectedPack: pack,
                    });
                  }}
                >
                  <Text fontSize="14px">
                    {pack.quantity_value} {pack.quantity_type}
                  </Text>
                  <Icon as={FaChevronDown} />
                </Flex>
              ))}
            </>
          )}
        </Box>
      </Box>
  );
};

export default BestSelling;
