import { Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text, Button, Image } from "@chakra-ui/react";


const ViewOrderListModal = ({isOpen, onClose, orderedProducts, orderId, selectedItems}) => {
    console.log(orderId, "orderedproductid");
    console.log(orderedProducts, "products1234");
    console.log(selectedItems, "selected items");
  return (
   <Modal isOpen={isOpen} onClose={onClose}> 
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
            <Heading fontSize="20px" mb={5}>View Orders</Heading>

             {selectedItems?.map((item)=>{
                return(
                    <>
                    <Card key={item.id}
               width="100%"
               bg="white"
               mb={4}>
                <CardHeader>
                    <Image src={item.product_img}
                     alt={item.product_name}
                    width="90px"
                    height="90px"
                    borderRadius="10px"
                    objectFit="cover"
                    boxShadow="sm"
                    />
                </CardHeader>
                <CardBody>
                    <Text>{item.product_name}</Text>
                    <Text>{item.variant_quantity_value} { item.variant_quantity_type} *{item.variant_actual_price} </Text>
                </CardBody>
               </Card>
                    </>
                )
              
             })}
        </ModalBody>
    </ModalContent>
   </Modal>
  )
}

export default ViewOrderListModal