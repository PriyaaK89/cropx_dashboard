import React from 'react'
import LeftSidebar from '../components/LeftSidebarLayout/LeftSidebar';
import { Box } from "@chakra-ui/react";
import OrderList from '../components/Order/OrderList';



const Order = () => {
  return (
    <>
       <Box width="100%" backgroundColor="#f8f8fb" >
        <Box display="flex" justifyContent="space-between">
           <Box display={{base:"none",lg:"flex"}}> <LeftSidebar/></Box>
            <OrderList/>
        </Box>
        </Box>
    </>

  )
}

export default Order