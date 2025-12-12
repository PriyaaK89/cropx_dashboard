import React from 'react'
import LeftSidebar from '../components/LeftSidebarLayout/LeftSidebar';
import { Box } from "@chakra-ui/react";
import Order from '../components/Order/Order';



const OrderList = () => {
  return (
    <>
       <Box width="100%" backgroundColor="#f8f8fb" >
        <Box display="flex" justifyContent="space-between">
           <Box> <LeftSidebar/></Box>
            <Order/>
        </Box>
        </Box>
    </>

  )
}

export default OrderList