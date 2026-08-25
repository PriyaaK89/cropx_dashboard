import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, Text, Flex, useToast, Spinner, } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { AuthContext } from "../Context/AuthContext";
import { useColorModeValue } from "@chakra-ui/react";

const DeleteBannerModal = ({ isDeleteModalOpen, onDeleteModalClose, fetchBanner, selectedBannerId, }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token
  const bgColor = useColorModeValue("#E53E3E","#c42424");
  const textColor = useColorModeValue("white","gray.100");
  const hoverBg = useColorModeValue("#ee3838","#e41212de")
  

  console.log(apiToken, "TokenindeleteBannerModel")
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${Config?.delete_banner}/${selectedBannerId}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      }
      );

      if (response?.status === 200) {
        toast({
          title: "Banner deleted successfully",
          status: "success",
          duration: 3000,
        });

        fetchBanner();
        onDeleteModalClose();
      }
    } catch (error) {
      toast({
        title: "Failed to delete banner",
        status: "error",
        duration: 3000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} isCentered>
      <ModalOverlay />
      <ModalContent>
       <Flex bg="red.600" color="white" px="16px" py="5px" justify="space-between" align="center" borderTopRadius="md">
           <Text fontWeight="bold">
          Delete Banner
        </Text>
        <ModalCloseButton position="static"/>
       </Flex>
        <ModalBody>
          <Flex direction="column" align="center" gap={4}>
            <WarningTwoIcon boxSize={16} color="red.500" />

            <Text textAlign="center" fontSize="lg" fontWeight="medium">
              Are you sure you want to delete this banner?
            </Text>

            <Text textAlign="center" color="gray.500" fontSize="sm">
              This action cannot be undone.
            </Text>

            <Flex mt={4} gap={4}>
              <Button
                onClick={onDeleteModalClose}
                variant="outline"
                colorScheme="gray"
                borderRadius="full"
                px={6}
              >
                Cancel
              </Button>

              <Button
              bgColor={bgColor}
              textColor={textColor}
                borderRadius="full"
                px={6}
                onClick={handleDelete}
                isDisabled={loading}
                _hover={{bgColor:hoverBg}}
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

export default DeleteBannerModal;
