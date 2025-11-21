import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CategoryList from "../components/Categories/CategoryList";
import { Box } from "@chakra-ui/react";

const Categories = ()=>{
    return(
        <>
        <Box display="flex" justifyContent="space-between">

           <Box> <LeftSidebar/></Box>
            <CategoryList/>
        </Box>
        </>
    )
}

export default Categories

