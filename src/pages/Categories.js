import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import CategoryList from "../components/Categories/CategoryList";
import { Box } from "@chakra-ui/react";

const Categories = ()=>{
    return(
        <>
        <Box width="100%" backgroundColor="#EEF0FF" p="5" >
        <Box display="flex" justifyContent="space-between">
           <Box> <LeftSidebar/></Box>
            <CategoryList/>
        </Box>
        </Box>
        </>
    )
}

export default Categories

