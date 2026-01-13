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
  limit,
  setLimit,
}) => {

  // SAFE total pages (NaN issue fix)
  const safeTotalPages = Number(totalPages) || 1;

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
        w="100%"
        mt={6}
        direction={{ base: "column", md: "row" }}
        gap={4}
        justify="space-between"
        align="center"
      >
        {/* Page info + limit */}
        <Flex align="center" gap={4}>
          <Text>
            Page {page} of {safeTotalPages}
          </Text>

          <Select
            w="120px"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </Select>
        </Flex>

        {/* Pagination buttons */}
        <HStack>
          {/* Previous */}
          <Button
            isDisabled={page === 1}
            onClick={() =>
              setPage((prev) => Math.max(Number(prev) - 1, 1))
            }
          >
            <PiLessThan />
          </Button>

          {/* Page numbers */}
          {Array.from({ length: safeTotalPages }).map((_, i) => (
            <Button
              key={i}
              size="sm"
              onClick={() => setPage(i + 1)}
              colorScheme={page === i + 1 ? "blue" : "gray"}
            >
              {i + 1}
            </Button>
          ))}

          {/* Next */}
          <Button
            isDisabled={page === safeTotalPages}
            onClick={() =>
              setPage((prev) =>
                Math.min(Number(prev) + 1, safeTotalPages)
              )
            }
          >
            <PiGreaterThan />
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default NewArrivals;
