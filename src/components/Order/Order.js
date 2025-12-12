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
  TableContainer,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Config } from "../../utils/Config";

const Order = () => {
  const [orders, SetOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Orders
  const getOrders = async () => {
    try {
      const res = await axios.get(`${Config?.Order_List}`);
      console.log("response", res);

      if (Array.isArray(res.data.orders)) {
        SetOrders(res.data.orders);
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
    <Box width="77.5%" minH="100vh" pl="1rem">
      <TopBar />

      <Box p={5} bg='white' my='1rem' borderRadius="0.75rem">
        <Box overflowX="auto" px={4} maxW="100vw">
          <Box overflowX="auto" whiteSpace="nowrap" sx={{
            "&::-webkit-scrollbar": { width: "8px", height: '8px' },
            "&::-webkit-scrollbar-thumb": {
              width: "8px",
              backgroundColor: "#7A7A7A",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#E8E8E8",
              borderRadius: "4px",
            },
          }}>
            <Table variant="simple" colorScheme="gray" minW="1300px" className='productsTable'>
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
                  <Th>Order Date</Th>
                </Tr>
              </Thead>

              <Tbody>
                {orders.map((order, index) => (
                  <Tr key={order.id}>
                    <Td>{index+1}</Td>
                    <Td>{order.user_name}</Td>

                    {/* Product name line-break */}
                    <Td fontSize="13px"><Text width="250px" whiteSpace="break-spaces">{order.product_names}</Text></Td>

                    <Td>{order.subtotal}</Td>
                    <Td>{order.delivery_fee}</Td>
                    <Td>{order.total_amount}</Td>
                    <Td>{order.payment_method}</Td>
                    <Td>{order.payment_status}</Td>
                    <Td>{order.order_status}</Td>
                    <Td>{order.created_at}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table></Box></Box>
      </Box>
    </Box>
  );
};

export default Order;
