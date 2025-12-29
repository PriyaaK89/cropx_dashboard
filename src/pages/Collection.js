import React from "react";
import { Box,  Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CollectionList from "../components/Collection/CollectionList";

const Collection = () => {
  return (
    <>
      <Box width="100%" backgroundColor="#f8f8fb"  >
        <Box display="flex" justifyContent="space-between">
          <Box display={{base:"none", lg:"flex"}}> <LeftSidebar /></Box>
           <CollectionList/>
        </Box>
      </Box>
    </>
  );
};

export default Collection;
