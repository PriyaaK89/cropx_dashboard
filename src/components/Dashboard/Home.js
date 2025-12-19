import React from "react";
import TopBar from "../TopBar/TopBar";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (


    <Box
      width="77.5%" minH="100vh" pl="1rem" mr="1rem"
    >
      <TopBar />
      <Box mt={4} bg='white' p={4} borderRadius="0.75rem" boxShadow="lg">
        Hello world
      </Box>

    </Box>
  );
};

export default Home;
