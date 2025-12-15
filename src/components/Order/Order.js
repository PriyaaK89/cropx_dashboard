import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import { AuthContext } from "../Context/AuthContext";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spinner,
  Text,
  Button,
} from "@chakra-ui/react";
import { Config } from "../../utils/Config";
import ViewOrderListModal from "./ViewOrderListModal";
import UpdateOrdersModal from "./UpdateOrdersModal";
import { useDisclosure } from "@chakra-ui/react";

const Order = () => {
  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // View Modal
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  // Update Modal
  const {
    isOpen: isUpdateOrdersModalOpen,
    onOpen: onUpdateOrdersModalOpen,
    onClose: onUpdateOrdersModalClose,
    orderId: order_id
  } = useDisclosure();

  const formatData = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN");
  };

  // Fetch Orders
  const getOrders = async () => {
    try {
      const res = await axios.get(Config?.Order_List, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setError("Invalid API format");
      }
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <Box width="77.5%" minH="100vh" pl="1rem">
        <TopBar />
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Flex justify="center" mt={10}>
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <>
      {/* VIEW MODAL */}
      <ViewOrderListModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        orderId={selectedOrderID}
        selectedItems={selectedItems}
      />

      {/* UPDATE MODAL */}
      <UpdateOrdersModal
        isOpen={isUpdateOrdersModalOpen}
        onClose={onUpdateOrdersModalClose}
        orderId={selectedOrderID}
        refreshOrders={getOrders}
      />

      <Box width="77.5%" minH="100vh" pl="1rem">
        <TopBar />

        <Box p={5} bg="white" my="1rem" borderRadius="0.75rem">
          <Box overflowX="auto">
            <Table minW="1500px">
              <Thead bg="gray.100">
                <Tr>
                  <Th>#</Th>
                    <Th>Order ID</Th>
                  <Th>User</Th>
                  <Th>Products</Th>
                  <Th>Subtotal</Th>
                  <Th>Total</Th>
                  <Th>Payment</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>View</Th>
                  <Th>Update</Th>
                </Tr>
              </Thead>

              <Tbody>
                {orders.map((order, index) => (
                  <Tr key={order.order_id}>
                    <Td>{index + 1}</Td>
                        <Td>{order.order_id}</Td>
                    <Td>{order.user_name}</Td>
                    <Td>{order.product_names}</Td>
                    <Td>{order.subtotal}</Td>
                    <Td>{order.total_amount}</Td>
                    <Td>{order.payment_method}</Td>
                    <Td>{order.order_status}</Td>
                    <Td>{formatData(order.created_at)}</Td>

                    <Td>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => {
                          setSelectedOrderID(order.order_id);
                          setSelectedItems(order.items);
                          onViewOpen();
                        }}
                      >
                        View
                      </Button>
                    </Td>

                    <Td>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => {
                          setSelectedOrderID(order.order_id);
                          onUpdateOrdersModalOpen();
                        }}
                      >
                        Update
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Order;
