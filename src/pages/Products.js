import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import ProductList from "../components/Products/ProductList";

const Products = () => {
  return (
    <>
      <Flex minH="100vh" bg="#EEF0FF">
        
        {/* LEFT SIDEBAR FIXED WIDTH */}
        <Box 
          width="250px"  
          minH="100vh"
          boxShadow="md"
        >
          <LeftSidebar />
        </Box>

        {/* RIGHT CONTENT AREA */}
        <Box 
          flex="1"
          px={{ base: 4, md: 6, lg: 14 }}  // equal left-right spacing
        >
          <ProductList />
        </Box>

      </Flex>
    </>
  );
};

export default Products;
