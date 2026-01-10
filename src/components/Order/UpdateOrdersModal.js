import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { AuthContext } from "../Context/AuthContext";

const UpdateOrderModal = ({ isOpen, onClose, orderId, refreshOrders }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;
  const toast = useToast();
  console.log(orderId, "orderId")

  // status button click
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  // update api call
  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      toast({
        title: "Please select order status",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        order_id: orderId,
        new_status: selectedStatus,
      };

      const response = await axios.put(`${Config?.update_order_status}`, payload,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`
          }
        }
      )
      if (response?.status === 200) {
        toast({
          title: "Order status updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        refreshOrders();      // list refresh
        setSelectedStatus(""); // reset
        onClose();
      }


    } catch (error) {
      toast({
        title: "Failed to update order",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // modal close reset
  const handleClose = () => {
    setSelectedStatus("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex bg="#5c94cf" color="white" px="16px" py="5px" justify="space-between" align="center" borderTopRadius="md" >
          <Text fontWeight="bold">Update Order Status</Text>
          <ModalCloseButton position="static" />
        </Flex>

        <ModalBody p="2rem 0rem">
          <Flex justifyContent="center" align="center">

            {["DISPATCHED", "SHIPPED", "DELIVERED"].map((status) => (

              <Button
                key={status}
                mr={3}
                mb={2}
                px="8px"
                variant="outline"
                bg={selectedStatus === status ? "blue.100" : "white"}
                onClick={() => handleStatusClick(status)}
              >
                {status}
              </Button>

            ))}
          </Flex>
        </ModalBody>

        <ModalFooter p="0px 0px 10px 0px">
          <Button colorScheme="gray" onClick={handleClose} mr={2}>
            Cancel
          </Button>
          <Button
            bgColor="#5c94cf"
            color="white"
            mr={3}
            onClick={handleUpdateStatus}
            isLoading={loading}
            _hover={{bgColor:"#2664a7"}}
          >
            Update
          </Button>

          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOrderModal;
