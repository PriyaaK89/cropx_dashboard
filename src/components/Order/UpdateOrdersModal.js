import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  useToast,
  Box,
  Circle,
  Icon,
} from "@chakra-ui/react";
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { FaTruck } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { AuthContext } from "../Context/AuthContext";

/* ---------------- ORDER STEPS ---------------- */
const steps = [
  { label: "Order Placed", status: "PLACED", icon: TimeIcon },
  { label: "Dispatched", status: "DISPATCHED", icon: CheckIcon },
  { label: "Shipped", status: "SHIPPED", icon: FaTruck },
  { label: "Delivered", status: "DELIVERED", icon: IoHomeOutline },
];

const UpdateOrderModal = ({
  isOpen,
  onClose,
  orderId,
  refreshOrders,
  currentStatus = "PLACED",
}) => {
  const [localStatus, setLocalStatus] = useState(currentStatus);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;
  const toast = useToast();

  /* 🔹 Sync parent status ONLY when modal opens */
  useEffect(() => {
    if (isOpen) {
      setLocalStatus(currentStatus);
      setSelectedStatus("");
    }
  }, [isOpen, currentStatus]);

  /* 🔹 Get next allowed status */
  const getNextStatus = (status) => {
    const index = steps.findIndex((s) => s.status === status);
    return steps[index + 1]?.status || null;
  };

  const nextAllowedStatus = getNextStatus(localStatus);

  /* 🔹 Stepper index */
  const currentIndex = steps.findIndex(
    (step) => step.status === (selectedStatus || localStatus)
  );

  /* 🔹 Status click */
  const handleStatusClick = (status) => {
    if (status === nextAllowedStatus) {
      setSelectedStatus(status);
    }
  };

  /* 🔹 Update API */
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

      const response = await axios.put(
        Config.update_order_status,
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      if (response?.status === 200) {
        toast({
          title: "Order status updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        /* 🔥 MAIN FIX */
        setLocalStatus(selectedStatus);
        setSelectedStatus("");

        /* refresh parent list */
        refreshOrders();
      }
    } catch (error) {
      toast({
        title: "Failed to update order",
        description: error?.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedStatus("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        {/* ---------- Header ---------- */}
        <Flex
          bg="#5c94cf"
          color="white"
          px="16px"
          py="8px"
          justify="space-between"
          align="center"
          borderTopRadius="md"
        >
          <Text fontWeight="bold">Update Order Status</Text>
          <ModalCloseButton position="static" />
        </Flex>

        {/* ---------- Stepper ---------- */}
        <Box p={4}>
          <Flex justify="space-between" align="center" position="relative">
            {steps.map((step, index) => {
              const isActive = index <= currentIndex;

              return (
                <Flex
                  key={step.status}
                  direction="column"
                  align="center"
                  flex="1"
                  position="relative"
                >
                  {index !== 0 && (
                    <Box
                      position="absolute"
                      top="18px"
                      left="-50%"
                      width="100%"
                      height="2px"
                      bg={isActive ? "blue.400" : "gray.300"}
                    />
                  )}

                  <Circle
                    size="36px"
                    bg={isActive ? "blue.400" : "gray.300"}
                    color="white"
                  >
                    <Icon as={step.icon} boxSize={4} />
                  </Circle>

                  <Text
                    mt={2}
                    fontSize="sm"
                    fontWeight={isActive ? "bold" : "normal"}
                    color={isActive ? "blue.600" : "gray.500"}
                    textAlign="center"
                  >
                    {step.label}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Box>

        {/* ---------- Status Buttons ---------- */}
        <ModalBody>
          <Flex justify="center" wrap="wrap">
            {["DISPATCHED", "SHIPPED", "DELIVERED"].map((status) => {
              const isDisabled =
                status !== nextAllowedStatus ||
                localStatus === "DELIVERED";

              return (
                <Button
                  key={status}
                  mr={3}
                  mb={2}
                  variant="outline"
                  isDisabled={isDisabled}
                  bg={selectedStatus === status ? "blue.100" : "white"}
                  onClick={() => handleStatusClick(status)}
                >
                  {status}
                </Button>
              );
            })}
          </Flex>
        </ModalBody>

        {/* ---------- Footer ---------- */}
        <ModalFooter>
          <Button mr={2} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            bg="#5c94cf"
            color="white"
            onClick={handleUpdateStatus}
            isLoading={loading}
            _hover={{ bg: "#2664a7" }}
            isDisabled={localStatus === "DELIVERED"}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOrderModal;