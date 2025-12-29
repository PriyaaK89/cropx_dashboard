import React from "react";
import { Box } from "@chakra-ui/react";   
import Home from "../components/Dashboard/Home";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar"; 

const Dashboard = () => {
  return (
    <Box bg="#f8f8fb" minH="100vh">
      <Box display="flex">
        {/* Sidebar → only LG and above */}
        <Box display={{ base: "none", lg: "flex" }}>
          <LeftSidebar />
        </Box>

        {/* Main Content */}
        <Home />
      </Box>
    </Box>
  );
};

export default Dashboard;
