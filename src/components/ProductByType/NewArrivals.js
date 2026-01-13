import React from "react";
import { Flex, Button, Select, Text, HStack } from "@chakra-ui/react";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import BestSelling from "./BestSelling";

const NewArrivals = ({
  data,
  cardBg,
  priceColor,
  handleOpenModal,
  page,
  setPage,
  totalPages,
  totalItems,
  limit,
}) => {
  // // SAFE total pages (NaN issue fix)
  const safeTotalPages = Number(totalPages) || 1;
  const paginationBtnStyle = {
  fontWeight: "semibold",
  _hover: { fontWeight: "semibold" },
  _active: { fontWeight: "semibold" },
  _focus: { fontWeight: "semibold" },
};

  return (
    <>
      {/* ================= PRODUCT LIST ================= */}
      <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
        {data && data.length > 0 ? (
          data.map((p) => (
            <BestSelling
              key={p.id}
              p={p}
              cardBg={cardBg}
              priceColor={priceColor}
              handleOpenModal={handleOpenModal}
            />
          ))
        ) : (
          <Text>No products found</Text>
        )}
      </Flex>

      {/* ================= PAGINATION ================= */}
      <Flex
        mt={6}
        px={4}
        py={3}
        borderRadius="lg"
        justifyContent="space-between"
        align="center"
        flexWrap="wrap"
        gap={3}
      >
        <Text fontSize="12px" color="gray.600">
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, totalItems)} of {totalItems} entries
        </Text>
        <HStack spacing={1}>
          <Button
            {...paginationBtnStyle}

            size="12px"
            variant="outline"
            onClick={() => setPage(page - 1)}
            px={2}
            py={1}
            isDisabled={page === 1}
          >
            
            Previous
          </Button>
          {Array.from({ length: safeTotalPages }).map((_, index) => (
            <Button
              key={index}
              fontSize="sm"
              colorScheme="blue"
              variant={page === index + 1 ? "solid" : "outline"}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            {...paginationBtnStyle}

            size="12px"
            variant="outline"
            isDisabled={page === totalPages}
            onClick={() => setPage(page + 1)}
           
            p={1}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default NewArrivals;
