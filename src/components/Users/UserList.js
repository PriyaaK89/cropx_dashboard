import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";
import "../../../src/App.css";
import TopBar from "../TopBar/TopBar";
import { Config } from "../../utils/Config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Users
  const getUsers = async () => {
    try {
      const res = await axios.get(`${Config?.get_users}`);
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
      <Box width="82.5%" minH="100vh" pl={10}>
      <TopBar />
      
      <Box backgroundColor="white" p={8} mt={5} boxShadow="2xl" rounded="2xl">
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      </Box>
    </Box>
    )
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
  <Box width="82.5%" minH="100vh" pl={10}>
           <TopBar/>
            <Box backgroundColor="white"  p={8} mt={5} boxShadow="2xl" rounded="2xl">
      <Flex justify="space-between" alignItems="center" px={5} mt={5}>
       <Text fontSize="2xl" fontWeight="600">
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
              {users.map((user) => (
                <Tr key={user.id}>
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
        </Box>
          </>
  );
};

export default UserList;
