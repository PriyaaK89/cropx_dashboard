import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Home from "../components/Dashboard/Home";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";

const Dashboard = () => {
  return (
    <Box backgroundColor="#f8f8fb">
        <Box display="flex" justifyContent="space-between">
            <Box display={{base:"none",md:"flex"}}><LeftSidebar/></Box>
            <Home/>
        </Box>
    </Box>
  );
};

export default Dashboard;
