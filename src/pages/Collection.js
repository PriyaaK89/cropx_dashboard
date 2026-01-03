import React from "react";
import { Box,  Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CollectionList from "../components/Collection/CollectionList";

const Collection = () => {
  return (
    <>
      <Box width="100%" pt={{base:"60px",lg:0}} backgroundColor="#f8f8fb"  >
        <Box display="flex">
          <Box display={{base:"none", lg:"block"}}> <LeftSidebar /></Box>
           <CollectionList/>
        </Box>
      </Box>
    </>
  );
};

export default Collection;
