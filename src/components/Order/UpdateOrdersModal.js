import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
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
        order_status: selectedStatus,
      };

      const res = await axios.put(
        Config.Update_Order_Status,
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      toast({
        title: "Order status updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      refreshOrders();      // list refresh
      setSelectedStatus(""); // reset
      onClose();
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
        <ModalHeader>Update Order Status</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {["DISPATCHED", "SHIPPED", "DELIVERED"].map((status) => (
            <Button
              key={status}
              mr={3}
              mb={2}
              variant="outline"
              bg={selectedStatus === status ? "blue.100" : "white"}
              onClick={() => handleStatusClick(status)}
            >
              {status}
            </Button>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleUpdateStatus}
            isDisabled={!selectedStatus}
            isLoading={loading}
          >
            Update
          </Button>

          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOrderModal;
