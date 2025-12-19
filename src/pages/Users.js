import { Box } from "@chakra-ui/react";
import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import UserList from "../components/Users/UserList";

const Users = ()=>{
    return(
        <>
      <Box width="100%" backgroundColor="#f8f8fb" >
        <Box display="flex" justifyContent="space-between">
           <Box> <LeftSidebar/> </Box>
           <UserList/>
        </Box>
        </Box>
       
        </>
    )
}

export default Users