import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Home from "../components/Dashboard/Home";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";

const Dashboard = () => {
  return (
    <Box width="100%" backgroundColor="#f8f8fb">
      <Flex>
        
        {/* LEFT SIDEBAR */}
        <Box width="22.5%">
          <LeftSidebar />
        </Box>

        {/* MAIN CONTENT */}
        <Box width="77.5%">
          <Home />
        </Box>

      </Flex>
    </Box>
  );
};

export default Dashboard;
