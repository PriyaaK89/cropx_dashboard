import React from "react";
import { Box } from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar"
import TopBar from "../TopBar/TopBar";

const Home = () => {
  return (
    <Box
       width={{base:"100%",md:"77.5%"}} minH="100vh" pl={{base:"0",md:"1rem"}} mr={{base:"0",mb:"1rem"}}
    >
      <Box  display={{base:"flex",md:"none"}} >
             <ResponsiveNavbar/>

      </Box>
      <Box>

      </Box>
      <Box display={{base:"none", sm: "none", md:"flex"}} >
              <TopBar/>

      </Box>
      <Box  bg='white' mt={5} p="1rem" mr="1rem" ml="1rem"  borderRadius="0.75rem" boxShadow="lg">
        Hello world
      </Box>

    </Box>
  );
};

export default Home;
