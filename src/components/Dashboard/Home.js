import React from "react";
import TopBar from "../TopBar/TopBar";
import { Box, Flex } from "@chakra-ui/react";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";

const Home = () => {
  return (
    <Flex gap="0">
      {/* LEFT SIDEBAR */}
      <LeftSidebar />

      {/* MAIN CONTENT CENTERED */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        minH="100vh"
      >
        <Box
          maxW="1400px"   // FIXED RESPONSIVE WIDTH
          w="100%"
          px="20px"       // LEFT–RIGHT SPACE SAME ALWAYS
          py="20px"
        >
          {/* TOP BAR */}
          <TopBar />

          {/* PAGE CONTENT */}
          <Box mt={5} bg="white" p={8} rounded="xl" boxShadow="md">
            Hello world
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
