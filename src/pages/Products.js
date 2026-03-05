import React from "react";
import { Box } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import ProductList from "../components/Products/ProductList";
import { useColorModeValue } from "@chakra-ui/react";

const Products = () => {
  return (
    <Box
      w="100%"
      bg={useColorModeValue("gray.50", "#0E1629")}
      pt={{ base: "60px",  lg: 0 }}
    >
      <Box display="flex">
        {/* Sidebar only on lg */}
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>

        <ProductList />
      </Box>
    </Box>
  );
};

export default Products;
