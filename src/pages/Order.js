import React from 'react'
import LeftSidebar from '../components/LeftSidebarLayout/LeftSidebar';
import { Box } from "@chakra-ui/react";
import OrderList from '../components/Order/OrderList';



const Order = () => {
  return (
    <>
       <Box width="100%" backgroundColor="#f8f8fb" pt={{base: "60px",lg:0}} >
        <Box display="flex">
           <Box display={{base:"none",lg:"block"}}> <LeftSidebar/></Box>
            <OrderList/>
        </Box>
        </Box>
    </>

  )
}

export default Order