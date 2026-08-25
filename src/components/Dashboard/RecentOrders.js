import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import ExportButton from "../Button/ExportBtn";
import { useColorModeValue } from "@chakra-ui/react";

const RecentOrders = () => {
  const rowHoverBg = useColorModeValue("gray.50", "gray.700")
  const orders = [
    { no: "#00745", status: "Pending", customer: "Giordano Bruno", date: "2020-11-02", total: "$2,742.00" },
    { no: "#00513", status: "Hold", customer: "Hans Weber", date: "2020-09-05", total: "$204.00" },
    { no: "#00507", status: "Pending", customer: "Andrea Rossi", date: "2020-08-21", total: "$5,039.00" },
    { no: "#00104", status: "Canceled", customer: "Richard Feynman", date: "2020-06-22", total: "$79.00" },
    { no: "#00097", status: "Completed", customer: "Leonardo Garcia", date: "2020-05-09", total: "$826.00" },
    { no: "#00082", status: "Completed", customer: "Nikola Tesla", date: "2020-04-27", total: "$1,052.00" },
    { no: "#00063", status: "Pending", customer: "Marie Curie", date: "2020-02-09", total: "$441.00" },
    { no: "#00012", status: "Completed", customer: "Konstantin Tsiolkovsky", date: "2020-01-01", total: "$12,961.00" },
  ];
 
  const orderHeaders = ["no","status","customer","date","total"];
   const orderExportData = orders.map((item) => ({
    no: item.no,
    status: item.status,
    customer: item.customer,
    date: new Date(item.date).toLocaleDateString("en-GB"), //  Excel ### issue fixed
    total: item.total.replace("$", ""), // optional cleanup
  }));
  
  //  Correct status style (bg + color)
  const statusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "#d9ecff", color: "#004b9a" };
      case "Hold":
        return { bg: "#f9f1c8", color: "#5e4f00" };
      case "Canceled":
        return { bg: "#ffdcdc", color: "#900" };
      case "Completed":
        return { bg: "#def2d0", color: "#245900" };
      default:
        return { bg: "#e2e3e5", color: "#41464b" };
    }
  };

  return (
    <Box bg={useColorModeValue("white", "#1E293B")}
      color={useColorModeValue("gray.800", "white")} borderRadius="lg" boxShadow="md" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text fontSize="16px" fontWeight="600" mb={3}>
        Recent orders
      </Text>
           <ExportButton
          data={orderExportData}
          headers={orderHeaders}
          fileName="recent-orders.csv"
        />
       
      </Flex>
      
      <Box overflowX="auto">
        <Table
         className="productsTable"
          minW="900px"
          variant="simple"
          sx={{
            th: {
              fontSize: "13px",
              color: "#6c757d",
              fontWeight: "500",
            },
            td: {
              fontSize: "14px",
              py: 3,
            },
          }}
        >
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Status</Th>
              <Th>Customer</Th>
              <Th>Date</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>

          <Tbody>
            {orders.map((order, index) => {
              const style = statusStyle(order.status);
 
              return (
                <Tr key={index} _hover={{ bg: rowHoverBg }}>
                  <Td fontWeight="500">{order.no}</Td>
                  <Td>
                    <Badge
                      bg={style.bg}
                      color={style.color}
                      px={2}
                      py="2px"
                      fontWeight="500"
                      fontSize="11px"
                      textTransform="none"
                    >
                      {order.status}
                    </Badge>
                  </Td>

                  <Td>
                    <Flex align="center" gap={3}>
                      <Avatar size="sm" 
                           bg="#ebedf0"
                         color="#77838c"
                           fontWeight="500"

                       name={order.customer} />
                      <Text>{order.customer}</Text>
                    </Flex>
                  </Td>

                  <Td>{order.date}</Td>
                  <Td isNumeric fontWeight="500">
                    {order.total}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RecentOrders;
