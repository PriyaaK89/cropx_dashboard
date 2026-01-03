import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import { Box } from "@chakra-ui/react";
import BannerList from "../components/Banner/BannerList";

const Banner = () => {
  return (
    <>
        <Box width="100%" pt={{base:"50px",lg:0}} backgroundColor="#f8f8fb">
      <Box display="flex">
        <Box display={{base:"none",lg:"flex"}}> <LeftSidebar /></Box>
        <BannerList/>
      </Box>
      </Box>
    </>
    
  );
};

export default Banner;
