import React from 'react'
import ProductByType from '../components/ProductByType/ProductByType';
import LeftSidebar from '../components/LeftSidebarLayout/LeftSidebar';
import {Box,Flex} from "@chakra-ui/react"
const ProductType = () => {
  return (
    <>
      <Box width="100%" backgroundColor="#f8f8fb" pt={{base:"60px",lg:0}}>
         <Flex>
          <Box display={{base:"none",lg:"block"}}><LeftSidebar/></Box>
           <ProductByType/>
         </Flex>
      </Box>
    </>
  )
}

export default ProductType;