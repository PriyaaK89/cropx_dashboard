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
      width={{ base:"100%", lg: "calc(100% - 260px)" }}
      ml={{ base: 0,  md:0, lg: "260px" }}
       px={{ base: 0, md: 0, lg: 6 }}
       mb={5}
    >
      {/* Mobile Navbar */}
      <Box display={{ base: "flex", md:"flex", lg:"none" }}>
        <ResponsiveNavbar />
      </Box>

      {/* Desktop TopBar */}
      <Box display={{ base: "none", lg: "flex" }}>
        <TopBar />
      </Box>
       <Box p={4} bg="white" mt={4} borderRadius="0.75rem" boxShadow="lg">
      {/*  FIRST ROW → State Cards */}
        <StateCards />
      </Box>
      {/*  SECOND ROW → Charts */}
      <SimpleGrid  columns={{ base: 1, md: 2 }} spacing={6} mt={3} mb={5}>
        <DashboardLineChart />
        <DashboardBarChart />
      </SimpleGrid>
    </Box>
  );
};

export default Home;
