import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import StateCards from "./StateCards";
import DashboardLineChart from "./DashboardLineChart";
import DashboardBarChart from "./DashboardBarChart";

const Home = () => {
  return (
    <Box
      width={{ base: "100%", lg: "calc(100% - 260px)" }}
      ml={{ base: 0,  lg: "260px" }}
      px={{ base: 0,  lg: 6 }}
      mb={5}
      minH="100vh"
    >
      {/* Mobile Navbar */}
      <Box display={{ base: "block", lg: "none" }}>
        <ResponsiveNavbar />
      </Box>

      {/* Desktop TopBar */}
      <Box display={{ base: "none", lg: "block"}} position="sticky" top="0px" bottom="0px" left="0px" right="0px" z-index={100} >
        <TopBar />
      </Box>
      <Box
        w="100%"
        mt={4}
        borderRadius="0.75rem"
        boxShadow="sm"
      >
        {/*  FIRST ROW → State Cards */}
        <StateCards />
        {/*  SECOND ROW → Charts */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={3} mb={5}>
          <DashboardLineChart />
          <DashboardBarChart />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
