import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import ProductList from "../components/Products/ProductList";

const Products = () => {
  return (
    <>
      <Box width="100%" backgroundColor="#f8f8fb"  >
        <Box display="flex" justifyContent="space-between">
          <Box> <LeftSidebar /></Box>
          <ProductList />
        </Box>
      </Box>
    </>
  );
};

export default Products;
