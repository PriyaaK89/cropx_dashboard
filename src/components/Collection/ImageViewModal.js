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
import { useColorModeValue } from "@chakra-ui/react";

const ImageViewModal = ({ isOpen, onClose, previewImage }) => {
     const bgColor = useColorModeValue("#2664a7", "#1E293B");
      const textColor = useColorModeValue("white","gray.100");
     const btnBg = useColorModeValue("#E53E3E","#c42424");
     const hoverBg = useColorModeValue("#ee3838","#d41717")
       
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
            <ModalOverlay />
            <ModalContent>
                 <Flex bg={bgColor} color={textColor} px="16px" py="5px" justifyContent="space-between" alignItems="center" borderTopRadius="md">
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
                    <Button bg={btnBg} textColor={textColor} _hover={{hoverBg}} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ImageViewModal;

