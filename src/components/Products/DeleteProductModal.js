import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import React from "react";
import axios from "axios";
import { Config } from "../../utils/Config";

const DeleteProductModal = ({ isOpen, onClose, productId, getProducts }) => {

    const toast = useToast();

    const handleDelete = async()=>{
        try{
             const response = await axios.delete(`${Config?.delete_product}/${productId}`)
             if(response?.status === 200){
                  toast({
                    description: "Product is deleted successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true
                  })
                  getProducts()
                  onClose()
             }
        }catch(error){
            console.log(error, "Something went wrong, please try again!")
        }
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="2xl"
        p={2}
        bg="white"
        boxShadow="0px 8px 30px rgba(0,0,0,0.15)"
      >
        <ModalHeader fontWeight="700" fontSize="xl" textAlign="center">
          Delete Product
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" align="center" gap={4} py={2}>
            <Icon as={WarningTwoIcon} boxSize={12} color="red.400" />
            <Text fontSize="md" textAlign="center" fontWeight="500">
              Are you sure you want to delete this product?
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              This action cannot be undone.
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter display="flex" gap={3}>
          <Button
            variant="outline"
            borderColor="gray.300"
            _hover={{ bg: "gray.100" }}
            flex={1}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            flex={1}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProductModal;
