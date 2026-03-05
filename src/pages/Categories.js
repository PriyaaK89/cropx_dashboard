import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CategoryList from "../components/Categories/CategoryList";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const Categories = ()=>{
    const bgColor = useColorModeValue("gray.50","#0E1629")
    return(
        <>
        <Box width="100%" pt={{base:"60px",md:"60px", lg:0}} backgroundColor={bgColor}>
        <Box display="flex">
           <Box display={{base:"none", lg:"block"}}> <LeftSidebar/></Box>
            <CategoryList/>
        </Box>
        </Box>
        </>
    )
}

export default Categories

