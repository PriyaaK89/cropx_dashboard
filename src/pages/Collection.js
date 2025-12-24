import React from "react";
import { Box,  Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
// import CollectionForm from "../components/Collection/CollectionForm";
import CollectionList from "../components/Collection/CollectionList";

const Collection = () => {
  return (
    <>
      <Box width="100%" backgroundColor="#f8f8fb"  >
        <Box display="flex" justifyContent="space-between">
          <Box display={{base:"none", md:"flex"}}> <LeftSidebar /></Box>
           <CollectionList/>
          {/* <CollectionForm /> */}
        </Box>
      </Box>
    </>
  );
};

export default Collection;
