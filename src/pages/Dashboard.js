import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Home from "../components/Dashboard/Home";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";

const Dashboard = () => {
  return (
    <Flex
      w="100%"
      maxW="1500px"
      mx="auto"
      minH="100vh"
      gap= {5}
      px={5} // horizontal padding for both sides
      mt={5}
    >
      {/* LEFT SIDEBAR */}
      <Box w="250px" flexShrink={0}>
        <LeftSidebar />
      </Box>

      {/* RIGHT CONTENT */}
      <Box flex="1">
        <Home />
      </Box>
    </Flex>
  );
};

export default Dashboard;
