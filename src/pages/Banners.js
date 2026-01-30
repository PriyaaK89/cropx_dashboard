import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import { Box } from "@chakra-ui/react";
import BannerList from "../components/Banner/BannerList";
import { useColorModeValue } from "@chakra-ui/react";

const Banner = () => {
  const bgColor = useColorModeValue("gray.50", "#0E1629")
  return (
    <>
        <Box width="100%" pt={{base:"50px",lg:0}} backgroundColor={bgColor}>
      <Box display="flex">
        <Box display={{base:"none",lg:"flex"}}> <LeftSidebar /></Box>
        <BannerList/>
      </Box>
      </Box>
    </>
    
  );
};

export default Banner;
