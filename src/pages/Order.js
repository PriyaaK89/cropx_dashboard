import React from 'react'
import LeftSidebar from '../components/LeftSidebarLayout/LeftSidebar';
import { Box } from "@chakra-ui/react";
import OrderList from '../components/Order/OrderList';
import { useColorModeValue } from '@chakra-ui/react';


const Order = () => {
  const bgColor = useColorModeValue("gray.50","#0E1629")
  return (
    <>
       <Box width="100%" backgroundColor={bgColor} pt={{base:"60px",lg:0}} >
        <Box display="flex">
           <Box display={{base:"none",lg:"block"}}> <LeftSidebar/></Box>
            <OrderList/>
        </Box>
        </Box>
    </>

  )
}

export default Order