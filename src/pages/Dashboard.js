import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import Home from "../components/Dashboard/Home";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";

const Dashboard = ()=>{
    return(
        <>
        <Box display="flex" justifyContent='space-between'>
            <Box> <LeftSidebar/></Box>
           <Home/>
        </Box>
        </>
    )
}

export default Dashboard