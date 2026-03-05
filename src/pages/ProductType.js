import React from 'react'
import ProductByType from '../components/ProductByType/ProductByType';
import LeftSidebar from '../components/LeftSidebarLayout/LeftSidebar';
import {Box,Flex} from "@chakra-ui/react"
import { useColorModeValue } from '@chakra-ui/react';
const ProductType = () => {
  const bgColor = useColorModeValue("gray.50","#0E1629")
  return (
    <>
      <Box width="100%" backgroundColor={bgColor} pt={{base:"60px",lg:0}}>
         <Flex>
          <Box display={{base:"none",lg:"block"}}><LeftSidebar/></Box>
           <ProductByType/>
         </Flex>
      </Box>
    </>
  )
}

export default ProductType;