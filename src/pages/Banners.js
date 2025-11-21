import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import { Box } from "@chakra-ui/react";
import BannerList from "../components/Banner/BannerList";

const Banner = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box> <LeftSidebar /> </Box>
        <BannerList/>
      </Box>
    </>
  );
};

export default Banner;
