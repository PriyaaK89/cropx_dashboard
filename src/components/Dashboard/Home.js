import React, { Suspense } from "react";
import { Box, SimpleGrid, Skeleton, Flex } from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import StateCards from "./StateCards";
import RecentOrders from "./RecentOrders";
import TopSellingProducts from "./TopSellingProducts";

const DashboardLineChart = React.lazy(() =>
  import("./DashboardLineChart")
);
const DashboardBarChart = React.lazy(() =>
  import("./DashboardBarChart")
);

const Home = () => {
  return (
    <Box
      w={{ base: "100%", lg: "calc(100% - 260px)" }}
      ml={{ base: 0, lg: "260px" }}
      px={{ base: 3, lg: 6 }}     // ✅ better mobile padding
      mb={5}
      minH="100vh"
    >
      {/* Mobile Navbar */}
      <Box display={{ base: "block", lg: "none" }}>
        <ResponsiveNavbar />
      </Box>

      {/* Desktop TopBar */}
      <Box
        display={{ base: "none", lg: "block" }}
        position="sticky"
        top="0"
        zIndex="11"
      >
        <TopBar />
      </Box>

      <Box w="100%" mt={4}>
        {/* FIRST ROW → State Cards */}
        <StateCards />

        {/* SECOND ROW → Charts */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
          <Suspense fallback={<Skeleton h="320px" borderRadius="xl" />}>
            <DashboardLineChart />
          </Suspense>

          <Suspense fallback={<Skeleton h="320px" borderRadius="xl" />}>
            <DashboardBarChart />
          </Suspense>
        </SimpleGrid>
        <Flex
          gap={6}
          algin="flex-start"
          direction={{ base: "column", lg: "row" }}
          mt={20}
        >
          {/*  top selling products  */}
            <Box flex={{base: "100%", lg: "0 0  30%"}}>
              <TopSellingProducts/>
           </Box> 
          {/* Recent order */}
          <Box flex={{base:"100%" ,lg:"0  0 70%"}} overflowX="auto">
            <RecentOrders />
          </Box>
           
        </Flex>

      </Box>
    </Box>
  );
};

export default Home;
