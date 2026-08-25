import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  
  ModalOverlay,
  Button,
  Text,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Config } from "../../utils/Config";
import { useColorModeValue } from "@chakra-ui/react";

const DeleteCategory = ({ isOpen, onClose, categoryId, fetchCategories }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
    const bgColor = useColorModeValue("#E53E3E","#c42424");
    const textColor = useColorModeValue("white","gray.100");
    const hoverBg = useColorModeValue("#ee3838","#d41717")
    

  // DELETE API CALL
  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(
        `${Config?.delete_category}/${categoryId}`
      );

      if (response.status === 200) {
        toast({
          title: "Category deleted successfully",
          status: "success",
          duration: 3000,
        });

        fetchCategories(); 
        onClose(); 
      }
    } catch (error) {
      toast({
        title: "Failed to delete category",
        status: "error",
        duration: 3000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent
      >
        <Flex bg={bgColor} color={textColor} px="16px" py="5px" justify="space-between" algin="center" borderTopRadius="md">
        <Text fontWeight="bold">
          Delete Category
        </Text>
        <ModalCloseButton position="static" />
                 </Flex>

        <ModalBody>
          <Flex direction="column" align="center" gap={4}>
            <WarningTwoIcon boxSize={16} color="red.500" />

            <Text textAlign="center" fontSize="lg" fontWeight="medium">
              Are you sure you want to delete this category?
            </Text>

            <Text textAlign="center" color="gray.500" fontSize="sm">
              This action cannot be undone.
            </Text>

            {/* ACTION BUTTONS */}
            <Flex mt={4} gap={4}>
              <Button
                variant="outline"
                colorScheme="gray"
                borderRadius="full"
                px={6}
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
              bgColor={bgColor}
              textColor={textColor}
              _hover={{bgColor:hoverBg}}
                borderRadius="full"
                px={6}
                onClick={handleDelete}
                isDisabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Delete"}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategory;
