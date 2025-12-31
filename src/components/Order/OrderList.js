import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
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

const OrderList = () => {
  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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
  } = useDisclosure();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN");
  };

  // Fetch Orders
  const getOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(Config?.Order_List, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setError("Invalid API response format");
      }
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiToken) {
      getOrders();
    }
  }, [apiToken]);

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
      <Box
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        ml={{ base: 0, md:0 , lg: "260px" }}
        mb={5}
        px={{ base:0, md:0 ,lg: 6 }}
      >
        {/* Mobile Navbar */}
        <Box display={{ base: "flex", md:"flex", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>

        {/* Desktop TopBar */}
        <Box display={{ base: "none", lg: "flex" }}>
          <TopBar />
        </Box>

        <Box p={4} bg="white" mt={4} borderRadius="0.75rem" boxShadow="lg" mx={{base:3,md:3,lg:0}}>
          <Box overflowX="auto" w="100%">
             <Text fontSize="2xl" fontWeight="600" mb={4}>
                        Order List
                      </Text>
            
            <Table
              variant="simple"
              minW={{ base: "900px", md: "1200px", xl: "1400px" }}
            >
              <Thead bg="gray.100">
                <Tr>
                  <Th minW="60px">#</Th>
                  <Th minW="150px">Order ID</Th>
                  <Th minW="150px">User</Th>
                  <Th minW="260px">Products</Th>
                  <Th minW="120px">Subtotal</Th>
                  <Th minW="120px">Total</Th>
                  <Th minW="140px">Payment</Th>
                  <Th minW="140px">Status</Th>
                  <Th minW="180px">Date</Th>
                  <Th minW="120px">View</Th>
                  <Th minW="120px">Update</Th>
                </Tr>
              </Thead>

              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={6}>
                      <Flex justify="center">
                        <Spinner size="xl" />
                      </Flex>
                    </Td>
                  </Tr>
                ) : error ? (
                  <Tr>
                    <Td colSpan={11}>
                      <Text textAlign="center" color="red.500">
                        {error}
                      </Text>
                    </Td>
                  </Tr>
                ) : orders.length === 0 ? (
                  <Tr>
                    <Td colSpan={11}>
                      <Text textAlign="center">No orders found</Text>
                    </Td>
                  </Tr>
                ) : (
                  orders.map((order, index) => (
                    <Tr key={order.order_id}>
                      <Td>{index + 1}</Td>
                      <Td>{order.order_id}</Td>
                      <Td>{order.user_name}</Td>
                      <Td>{order.product_names}</Td>
                      <Td>{order.subtotal}</Td>
                      <Td>{order.total_amount}</Td>
                      <Td>{order.payment_method}</Td>
                      <Td>{order.order_status}</Td>
                      <Td>{formatDate(order.created_at)}</Td>

                      <Td>
                        <Flex gap={2} wrap="wrap">
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
                        </Flex>
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
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrderList;
