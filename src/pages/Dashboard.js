import React from "react";
import { Box } from "@chakra-ui/react";   
import Home from "../components/Dashboard/Home";
import { useColorModeValue } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar"; 

const Dashboard = () => {
  const bgColor = useColorModeValue("gray.50", "#0E1629")
  return (
    <Box bg={bgColor} minH="100vh" pt={{base:"60px",lg:0}}>
      <Box display="flex">
        {/* Sidebar → only LG and above */}
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>

        {/* Main Content */}
        <Home />
      </Box>
    </Box>
  );
};

export default Dashboard;
