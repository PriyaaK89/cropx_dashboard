import React from "react";

import { Box } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import ProductList from "../components/Products/ProductList";

const Products = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
      <Box>  <LeftSidebar/></Box>
        <ProductList />
        {/* <ProductList/> */}
      </Box>
    </>
  );
};

export default Products
