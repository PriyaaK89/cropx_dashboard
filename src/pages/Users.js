import { Box } from "@chakra-ui/react";
import React from "react";
import LeftSidebar from "../components/LeftSidebarLayout/LeftSidebar";
import UserList from "../components/Users/UserList";
import { useColorModeValue } from "@chakra-ui/react";

const Users = ()=>{
    const bgColor = useColorModeValue("gray.50","#0E1629")
    return(
        <>
      <Box width="100%" bg={bgColor} pt={{base:"60px",lg:"0"}} >
        <Box display="flex">
           <Box display={{base:"none",lg:"block"}}> <LeftSidebar/> </Box>
           <UserList/>
        </Box>
        </Box>
       
        </>
    )
}

export default Users