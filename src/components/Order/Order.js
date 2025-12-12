import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
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
import { useDisclosure } from "@chakra-ui/react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const formatData = (dateString) => {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-Us", options);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedDate}, ${hours}:${minutes} ${ampm}`;
  };

  // Fetch Orders
  const getOrders = async () => {
    try {
      const res = await axios.get(`${Config?.Order_List}`);
      console.log("response", res);

      if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
        console.log(res?.data?.orders[0]?.items, "orderedItems");
      } else {
        setError("Invalid API format");
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <Box width="77.5%" minH="100vh" pl="1rem" mr="1rem">
        <TopBar />
        <Box p={5} bg="white" my="1rem" borderRadius="0.75rem">
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        </Box>
      </Box>
    );
  }

  // Error UI
  if (error) {
    return (
      <Flex justify="center" mt={10}>
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <>
      <ViewOrderListModal
        isOpen={isOpen}
        onClose={onClose}
        orderId={selectedOrderID}
        selectedItems={selectedItems}
      />

      <Box width="77.5%" minH="100vh" pl="1rem">
        <TopBar />

        <Box p={5} bg="white" my="1rem" borderRadius="0.75rem">
          <Box overflowX="auto" px={4} maxW="100vw">
            <Table
              variant="simple"
              colorScheme="gray"
              minW="1500px"
              className="productsTable"
            >
              <Thead bg="gray.100">
                <Tr>
                  <Th>Serial Id</Th>
                  <Th>User Name</Th>
                  <Th width="30%">Product Name</Th>
                  <Th>SubTotal</Th>
                  <Th>Delivery Fee</Th>
                  <Th>Total Amount</Th>
                  <Th>Payment Method</Th>
                  <Th>Payment Status</Th>
                  <Th>Order Status</Th>
                  <Th width="30%">Order Date</Th>
                  <Th>View Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                {orders.map((order, index) => (
                  <Tr key={order.order_id}>
                    <Td>{index + 1}</Td>
                    <Td>{order.user_name}</Td>

                    <Td fontSize="13px">
                      <Text width="250px" whiteSpace="break-spaces">
                        {order.product_names}
                      </Text>
                    </Td>

                    <Td>{order.subtotal}</Td>
                    <Td>{order.delivery_fee}</Td>
                    <Td>{order.total_amount}</Td>
                    <Td>{order.payment_method}</Td>
                    <Td>{order.payment_status}</Td>
                    <Td>{order.order_status}</Td>
                    <Td>{formatData(order.created_at)}</Td>

                    <Td>
                      <Button
                        size="sm"
                        bgColor="green"
                        color="white"
                        p={4}
                        onClick={() => {
                          setSelectedOrderID(order.order_id);
                          setSelectedItems(order.items)
                          onOpen();
                        }}
                      >
                        View
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
