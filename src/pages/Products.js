import React from "react";
import { Box } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import ProductList from "../components/Products/ProductList";

const Products = () => {
  return (
    <Box
      w="100%"
      bg="#f8f8fb"
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
