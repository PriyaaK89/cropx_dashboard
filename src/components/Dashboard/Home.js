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
    minH="100vh"
      width={{ base: "100%", lg: "calc(100% -260px)" }}
      ml={{ base: 0, lg: "260px" }}
       px={{ base: 3, md: 4, lg: 6 }}
       mb={1}
    >
      {/* Mobile Navbar */}
      <Box display={{ base: "flex", md: "none" }}>
        <ResponsiveNavbar />
      </Box>

      {/* Desktop TopBar */}
      <Box display={{ base: "none", md: "flex" }}>
        <TopBar />
      </Box>

      {/*  FIRST ROW → State Cards */}
      <Box mt={6}>
        <StateCards />
      </Box>

      {/*  SECOND ROW → Charts */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={3} mb={5}>
        <DashboardLineChart />
        <DashboardBarChart />
      </SimpleGrid>
    </Box>
  );
};

export default Home;
