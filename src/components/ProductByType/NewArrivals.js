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
  return (
    <>
      {/* PRODUCT LIST */}
      <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
        {data.length > 0 ? (
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

      {/* PAGINATION */}
      <Flex
        w="100%"
        mt={6}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
        justify="space-between"
        align="center"
      >
        {/* PAGE INFO + LIMIT */}
        <Flex align="center" gap={4}>
          <Text fontSize="md">
            Page {page} of {totalPages}
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

        {/* PAGE BUTTONS */}
        <HStack>
          {/* Previous */}
          <Button
            bg="blue.50"
            isDisabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <PiLessThan size={18} />
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages || 1 }).map((_, i) => (
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
            bg="blue.50"
            isDisabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            <PiGreaterThan size={18} />
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default NewArrivals;
