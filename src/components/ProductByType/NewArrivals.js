import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import BestSelling from "./BestSelling";

const NewArrivals = ({
  data,
  cardBg,
  priceColor,
  handleOpenModal,
}) => {
  return (
    <>
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
    </>
  );
};

export default NewArrivals;
