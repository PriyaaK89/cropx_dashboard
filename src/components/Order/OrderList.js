import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { AuthContext } from "../Context/AuthContext";
import ExportButton from "../Button/ExportBtn";
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
import { FiEye, FiEdit } from "react-icons/fi";

const OrderList = () => {
  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  ;
  console.log("orders", orders);
  const ordersHeaders = [
    "orderId",
    "user",
    "products",
    "subTotal",
    "total",
    "payment",
    "status",
    "date",
  ];

  const orderExportData = orders.map((item) => ({
    orderId: item.order_id,
    user: item.user_name,
    products: item.product_names,
    subTotal: item.subtotal,
    total: item.total_amount,
    payment: item.payment_method,
    status: item.order_status,
    date: item.created_at,

  }));


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
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };



  const capitalize = (text = "") => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
        ml={{ base: 0, lg: "260px" }}
        mb={5}
        px={{ base: 0, lg: 6 }}
        minH="100vh"
      >
        {/* Mobile Navbar */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>

        {/* Desktop TopBar */}
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0px" bottom="0px" left="0px" zIndex="11">
          <TopBar />
        </Box>

        <Box
          p={4}
          bg="white"
          mt={4}
          borderRadius="0.75rem"
          boxShadow="lg"
          mx={{ base: 3, lg: 0 }}
        >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>

              <Text fontSize="2xl" fontWeight="600" mb={4}>
                Order List
              </Text>
              <Box>
                   <ExportButton
                data={orderExportData}
                headers={ordersHeaders}
                fileName="orderslist.csv"
              />
              </Box>
              
            </Flex>
                      <Box overflowX="auto" w="100%">

            <Table
              variant="simple"
              minW={{ base: "900px", md: "1200px", xl: "1400px" }}
              className="productsTable"
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
                  <Th minW="200px">Date</Th>
                  <Th minW="120px">Action</Th>
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
                      <Td> {capitalize(order.user_name)} </Td>
                      <Td>{order.product_names}</Td>
                      <Td>{order.subtotal}</Td>
                      <Td>{order.total_amount}</Td>
                      <Td>{capitalize(order.payment_method)}</Td>
                      <Td> {capitalize(order.order_status)}</Td>
                      <Td>{formatDate(order.created_at)}</Td>
                      <Td>
                        <Flex gap={2}>
                          <Button
                            size="sm"
                            bgColor="white"
                            onClick={() => {
                              setSelectedOrderID(order.order_id);
                              setSelectedItems(order.items);
                              onViewOpen();
                            }}
                          >
                            <FiEye size={18} color="#2563eb" />
                          </Button>

                          <Button
                            size="sm"
                            bgColor="white"
                            onClick={() => {
                              setSelectedOrderID(order.order_id);
                              onUpdateOrdersModalOpen();
                            }}
                          >
                            <FiEdit size={18} color="#16a34a" />
                          </Button>
                        </Flex>
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
