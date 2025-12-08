import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import { Box } from "@chakra-ui/react";
import BannerList from "../components/Banner/BannerList";

const Banner = () => {
  return (
    <>
        <Box width="100%" backgroundColor="#EEF0FF" p="5" >
      <Box display="flex" justifyContent="space-between">
        <Box> <LeftSidebar /> </Box>
        <BannerList/>
      </Box>
      </Box>
    </>
  );
};

export default Banner;
