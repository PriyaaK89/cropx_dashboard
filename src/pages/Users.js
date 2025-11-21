import { Box } from "@chakra-ui/react";
import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import UserList from "../components/Users/UserList";

const Users = ()=>{
    return(
        <>
        <Box display="flex" justifyContent="space-between">
           <Box> <LeftSidebar/> </Box>
           <UserList/>
        </Box>
        </>
    )
}

export default Users