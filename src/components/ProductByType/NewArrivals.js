import { Flex } from "@chakra-ui/react";
import BestSelling from "./BestSelling";

const NewArrivals = ({
  data,
  cardBg,
  priceColor,
  handleOpenModal,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
      {data.map((p) => (
        <BestSelling
          key={p.id}
          p={p}
          cardBg={cardBg}
          priceColor={priceColor}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </Flex>
  );
};

export default NewArrivals;
