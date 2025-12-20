import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Home from "../components/Dashboard/Home";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";

const Dashboard = () => {
  return (
    <Box w="100%" minH="100vh" bg="#f8f8fb">
      <Flex>
        {/* Sidebar → Desktop only */}
        <Box
          display={{ base: "none", md: "block" }}
          w="260px"
          position="fixed"
          left="0"
          top="0"
          h="100vh"
        >
          <LeftSidebar />
        </Box>

        {/* Main Content */}
        <Box
          ml={{ base: 0, md: "260px" }}
          w="100%"
          p={4}
        >
          <Home />
        </Box>
    </Box>
  );
};

export default Dashboard;
