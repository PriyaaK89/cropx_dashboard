import React, { useEffect, useState } from "react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import CollectionFormModal from "./CollectionFormModal";
import UpdateCollectionFormModal from "./UpdateCollectionFormModal";
import DeleteCollectionModal from "./DeleteCollectionModal";

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
  useDisclosure,
} from "@chakra-ui/react";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Modal disclosures
  const { isOpen, onOpen, onClose } = useDisclosure(); // Create collection
  const {
    isOpen: isCollectionFormModalOpen,
    onOpen: onCollectionFormModalOpen,
    onClose: onCollectionFormModalClose,
  } = useDisclosure(); // Update collection
  const {
    isOpen: isDeleteCollectionModalOpen,
    onOpen: onDeleteCollectionModalOpen,
    onClose: onDeleteCollectionModalClose,
  } = useDisclosure(); // Delete collection

  // Fetch collections
  const getCollection = async () => {
    try {
      setLoading(true);
      const res = await axios.get(Config?.get_all_collections, {
        params: { page, limit },
      });
      if (res.data.success) {
        setCollections(res.data.data);
        setTotalPages(res.data.totalPages); // Make sure backend sends totalPages
      }
    } catch (error) {
      console.log("Error fetching collections", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollection();
  }, [page, limit]);

  // Delete & Update handlers
  const handleDelete = (item) => {
    setDeleteId(item.id);
    onDeleteCollectionModalOpen();
  };

  const handleUpdate = (item) => {
    setSelectedCollection(item);
    onCollectionFormModalOpen();
  };

  return (
    <>
      <CollectionFormModal isOpen={isOpen} onClose={onClose} />
      <UpdateCollectionFormModal
        isOpen={isCollectionFormModalOpen}
        onClose={onCollectionFormModalClose}
        editData={selectedCollection}
        fetchCollections={getCollection}
      />
      <DeleteCollectionModal
        isOpen={isDeleteCollectionModalOpen}
        onClose={onDeleteCollectionModalClose}
        collectionId={deleteId}
        fetchCollections={getCollection}
      />

      <Box
        width={{ base: "100%",  lg:"calc(100% - 260px)" }}
        px={{ base: 0, md:0, lg:6 }}
        ml={{ base: "0", md:0, lg:"260px" }}
        mb={5}
      >
        {/* Navbar */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0px" left="0px" bottom="0px" z-index={100}>
          <TopBar />
        </Box>

        {/* Collection Table */}
        <Box mt={4} bg="white" p={4} borderRadius="0.75rem" boxShadow="lg" mx={{base:3,md:3,lg:0}}  >
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Collection List
            </Text>
            <Button bg="blue.500" color="white" onClick={onOpen}>
              Create Collection
            </Button>
          </Flex>

          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="lg" />
            </Flex>
          ) : (
            <>
              <Box overflowX="auto">
                <Table
                  variant="simple"
                    minW={{ base: "900px", md: "1100px", lg: "1200px" }}
                  className="productsTable"
                  mt={1}
                >
                  <Thead bg="gray.100">
                    <Tr>
                      <Th minW="80px">ID</Th>
                      <Th minW="120px">Image</Th>
                      <Th minW="180px">Title</Th>
                      <Th minW="200px">Slug</Th>
                      <Th minW="160px">Show In Menu</Th>
                      <Th minW="140px">Home Order</Th>
                      <Th minW="160px">Show On Home</Th>
                      <Th minW="280px">Description</Th>
                      <Th minW="140px">Update</Th>
                      <Th minW="140px">Delete</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {collections.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>
                          <HStack spacing={3}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              boxSize="50px"
                              objectFit="cover"
                              rounded="md"
                            />
                          </HStack>
                        </Td>
                        <Td>{item.title}</Td>
                        <Td>{item.slug}</Td>
                        <Td>{item.show_in_menu === 1 ? "Yes" : "No"}</Td>
                        <Td>{item.home_order}</Td>
                        <Td>{item.show_on_home === 1 ? "Yes" : "No"}</Td>
                        <Td>{item.description}</Td>
                        <Td>
                          <Flex>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => handleUpdate(item)}
                            >
                              Update
                            </Button>
                          </Flex>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              {/* Pagination */}
              <Flex
                mt={6}
                justifyContent="space-between"
                align="center"
                flexWrap="wrap"
              >
                <Flex gap={10} align="center">
                  <Text fontSize="md">
                    Page {page} of {totalPages}
                  </Text>
                  <select
                    style={{ width:"120px" }}
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </Flex>

                <HStack>
                  <Button
                    isDisabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      onClick={() => setPage(i + 1)}
                      colorScheme={page === i + 1 ? "blue" : "gray"}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    isDisabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </HStack>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CollectionList;
