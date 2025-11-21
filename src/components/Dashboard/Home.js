import React from "react";
import TopBar from "../TopBar/TopBar";
import { Box } from "@chakra-ui/react";

const Home = () =>{
    return(
        <>
        <Box width="80.3%" bg="#f8f9fa" minH="100vh">
            
        <TopBar/>
          <Box >
              Hello world
          </Box>
        </Box>
        </>
    )
}

export default Home