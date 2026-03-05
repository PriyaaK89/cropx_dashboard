import React from "react";
import { Box} from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CollectionList from "../components/Collection/CollectionList";
import { useColorModeValue } from "@chakra-ui/react";

const Collection = () => {
  const bgColor = useColorModeValue("gray.50","#0E1629")
  return (
    <>
      <Box width="100%" pt={{base:"60px",lg:0}} backgroundColor={bgColor}  >
        <Box display="flex">
          <Box display={{base:"none", lg:"block"}}> <LeftSidebar /></Box>
           <CollectionList/>
        </Box>
      </Box>
    </>
  );
};


export default Collection;
