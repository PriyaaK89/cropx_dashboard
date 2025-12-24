import React, { useEffect, useState } from "react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import CollectionFormModal from "./CollectionFormModal"
import axios from "axios";
import { Config } from "../../utils/Config";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  HStack,
  Image,
  Button,
  Flex,
  useDisclosure
} from "@chakra-ui/react";


const CollectionList = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const {isOpen ,onOpen, onClose} = useDisclosure();
    const getCollection = async () => {
        try {
            setLoading(true);
            const res = await axios.get(Config?.get_all_collections);
            console.log(res);
            if (res.data.success) {
                setCollections(res.data.data);
            }
        } catch (error) {
            console.log("Error fetching collections", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCollection();
    }, []);
    return (
        <>
        <CollectionFormModal isOpen={isOpen} onClose={onClose} />
        <Box width={{ base: "100%", md: "77.5%" }} minH="100vh" pl={{ base: "0", md: "1rem" }} mr={{ base: "0", md: "1rem" }}>
            <Box display={{ base: "flex", md: "none" }}>
                <ResponsiveNavbar />
            </Box>
            <Box display={{ base: "none", md: "flex" }}>
                <TopBar />
            </Box>
            <Box
                overflowX="auto"
                mt={4}
                bg="white"
                p={4}
                borderRadius="0.75rem"
                boxShadow="lg"
                mb={6}
            >
                <Flex justify="space-between" >
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Collection List 
                </Text>
                <Button
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: "blue.600" }}
                    _active={{ bg: "blue.700" }}
                    onClick={onOpen}
                >
                    Create Collection
                </Button>
                </Flex>

                {loading ? (
                    <Spinner size="lg" />
                ) : (
                    <Table variant="simple" color="gray" minW="1200px" className="productsTable" mt={2}>
                        <Thead bg="gray.100">
                            <Tr>
                                <Th width="10%">Id</Th>
                                <Th width="10%">Image</Th>
                                <Th width="10%">Title</Th>
                                <Th width="10%">Slug</Th>
                                <Th width="15%">Show In Menu</Th>
                                <Th width="15%">Home Order</Th>
                                <Th width="15%">Show On Home</Th>
                                <Th width="25%">Description</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {collections.map((item) => (
                                <Tr key={item._id}>
                                    <Td>{item.id}</Td>
                                    <Td>
                                        <HStack spacing={3}>
                                            <Image src={item.image}
                                                alt={item.title}
                                                boxSize="50px"
                                                objectFit="cover"
                                                rounded="md"
                                            />
                                        </HStack>
                                    </Td>
                                    <Td>{item.title}</Td>
                                    <Td>{item.slug}</Td>
                                    <Td>{item.show_in_menu}</Td>
                                    <Td>{item.home_order}</Td>
                                    <Td>{item.show_on_home}</Td>
                                    <Td>{item.description}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>
        </Box>
   </>
    );
};

export default CollectionList;
