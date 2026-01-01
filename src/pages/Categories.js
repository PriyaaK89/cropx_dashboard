import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CategoryList from "../components/Categories/CategoryList";
import { Box } from "@chakra-ui/react";

const Categories = ()=>{
    return(
        <>
        <Box width="100%" pt={{base:"60px",md:"60px", lg:0}} backgroundColor="#f8f8fb">
        <Box display="flex">
           <Box display={{base:"none", lg:"block"}}> <LeftSidebar/></Box>
            <CategoryList/>
        </Box>
        </Box>
        </>
    )
}

export default Categories

