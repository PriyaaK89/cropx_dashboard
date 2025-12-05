import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";
import "../../../src/App.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Users
  const getUsers = async () => {
    try {
      const res = await axios.get("http://103.110.127.211:3001/get-users");
       console.log(res);
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

  if (loading) {
    return (
      <Flex justify="center" mt={10}>
        <Spinner size="xl" />
      </Flex>
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
    <Box width="80.3%" bg="#f8f9fa" minH="100vh" p={6}>
      <Flex justify="space-between">
       <Text fontSize="2xl" fontWeight="600" mb={4}>
        User List
      </Text>
      
       <Text>
        Total Users : {users.length}
       </Text>
              </Flex>

      <Box bg = "f8f9fa" overflowX="auto" px={4} maxW="100vw">
        
          <Table>
            <Thead bg = "gray.100" className="productsTable Thead">
              <Tr>
                <Th className="productsTable Thead Tr Th">Name</Th>
                <Th className="productsTable Thead Tr Th">Email</Th>
                <Th className="productsTable Thead Tr Th">Password</Th>
                <Th className="productsTable Thead Tr Th">Role</Th>
              </Tr>
            </Thead>

            <Tbody className="productsTable tbody">
              {users.map((user, index) => (
                <Tr>
                  <Td className="productsTable Tbody Tr Td">{user.name}</Td>
                  <Td className="productsTable Tbody Tr Td">{user.email}</Td>
                  <Td className="productsTable Tbody Tr Td">{user.password}</Td>
                  <Td className="productsTable Tbody Tr Td">{user.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
  );
};

export default UserList;
