import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import DashboardLineChart from "./DashboardLineChart";
import DashboardBarChart from "./DashboardBarChart";


const Home = () => {
  return (
    <Box
      width={{ base: "100%", md: "77.5%" }}
      minH="100vh"
      pl={{ base: "0", md: "1rem" }}
      mr={{ base: "0", md: "1rem" }}
    >
      {/* Mobile Navbar */}
      <Box display={{ base: "flex", md: "none" }}>
        <ResponsiveNavbar />
      </Box>

      {/* Desktop TopBar */}
      <Box display={{ base: "none", md: "flex" }}>
        <TopBar />
      </Box>

      {/* Charts Section */}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={5}
        mt={5}
        px={{ base: 0, md: 4 }}
      >
        <DashboardLineChart />
        <DashboardBarChart />
      </SimpleGrid>
    </Box>
  );
};

export default Home;
