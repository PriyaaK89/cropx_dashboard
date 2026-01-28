import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    ModalCloseButton,
    Image,
    Box,
    Flex,
    Text
}
    from "@chakra-ui/react";
import React from "react";

const ProductImageViewModal = ({ isOpen, onClose, previewImage }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
            <ModalOverlay />
            <ModalContent>
                 <Flex bg="#5c94cf" color="white" px="16px" py="5px" justifyContent="space-between" alignItems="center" borderTopRadius="md">
                    <Text fontWeight="bold">Preview Image</Text>
                   <ModalCloseButton position="static" />
                 </Flex>
                
                <ModalBody p={4} display="flex" justifyContent="center">
                    <Box
                        w="350px"
                        h="350px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.50"
                        rounded="md"
                    >
                        <Image
                            src={previewImage}
                            maxW="100%"
                            maxH="100%"
                            objectFit="contain"
                        />
                    </Box>

                </ModalBody>
                <ModalFooter justifyContent="center">
                    <Button colorScheme="red" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProductImageViewModal;

