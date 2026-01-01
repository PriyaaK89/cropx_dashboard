import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import "../../../src/App.css";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import { Config } from "../../utils/Config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(Config?.get_users);
      if (Array.isArray(res.data.users)) {
        setUsers(res.data.users);
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
    getUsers();
  }, []);

  return (
    <Box
      width={{ base:"100%", lg: "calc(100% - 260px)" }}
      mb={5}
      px={{ base: 0, lg: 6 }}
      ml={{ base: "0", lg: "260px" }}
    >
      {/* Mobile Navbar */}
      <Box display={{ base: "block", lg: "none" }} position="sticky" top="0px" bottom="0px" left="0px" right="0px" z-index={100}>
        <ResponsiveNavbar />
      </Box>

      {/* Desktop TopBar */}
      <Box display={{ base: "none", lg: "block" }}>
        <TopBar />
      </Box>

      <Box p={4} bg="white" mt={4} borderRadius="0.75rem" boxShadow="lg" mx={{base:3,lg:0}}>
         
         
        <Flex justify="space-between" align="center" px={5} mt={5}>
          <Text fontSize="2xl" fontWeight="600">
            User List
          </Text>
          <Text>Total Users : {users.length}</Text>
        </Flex>

        <Box overflowX="auto" px={4} w="100%">
          <Table
            variant="simple"
            minW={{ base: "800px", md: "1000px", xl: "1200px" }}
            className="productsTable"
          >
            <Thead bg="gray.100">
              <Tr>
                <Th minW="220px">Name</Th>
                <Th minW="300px">Email</Th>
                <Th minH="220px">Password</Th>
                <Th minW="160px">Role</Th>
              </Tr>
            </Thead>

            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={4}>
                    <Flex justify="center" py={6}>
                      <Spinner size="xl" />
                    </Flex>
                  </Td>
                </Tr>
              ) : error ? (
                <Tr>
                  <Td colSpan={4}>
                    <Text textAlign="center" color="red.500">
                      {error}
                    </Text>
                  </Td>
                </Tr>
              ) : users.length === 0 ? (
                <Tr>
                  <Td colSpan={4}>
                    <Text textAlign="center">No users found</Text>
                  </Td>
                </Tr>
              ) : (
                users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.password}</Td>
                    <Td>{user.role}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;
