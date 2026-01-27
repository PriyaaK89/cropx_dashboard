import React, { useEffect, useState } from "react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import CollectionFormModal from "./CollectionFormModal";
import UpdateCollectionFormModal from "./UpdateCollectionFormModal";
import DeleteCollectionModal from "./DeleteCollectionModal";
import ImageViewModal from "./ImageViewModal";
import { FiEye } from "react-icons/fi";
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
  IconButton,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import ExportButton from "../Button/ExportBtn";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total,setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  // Modal disclosures
  const {
    isOpen: isImageModalOpen,
    onOpen: onImageModalOpen,
    onClose: onImageModalClose
  } = useDisclosure();
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
  const handleImagePreview = (image) =>{
    setPreviewImage(image);
    onImageModalOpen()
  }

  const handleUpdate = (item) => {
    setSelectedCollection(item);
    onCollectionFormModalOpen();
  };
  const collectionsHeader = [
    "id",
    "image",
    "tilte",
    "slug",
    "show_in_menu",
    "description"
  ]
  const collectionsExportData = collections.map((item)=>{
    console.log(item);
    return{
    id: item.id,
    image: item.image,
    tilte: item.title,
    slug: item.slug,
    show_in_menu: item.show_in_menu,
    description: item.description
    }
  })

  return (
    <>
      <CollectionFormModal isOpen={isOpen} onClose={onClose} />
      {
        previewImage &&(
           <ImageViewModal
        isOpen={isImageModalOpen}
         onClose={onImageModalClose}
         previewImage={previewImage}
       />
        )
      }
       
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
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        px={{ base: 0, md: 0, lg: 6 }}
        ml={{ base: "0", md: 0, lg: "260px" }}
        mb={5}
      >
        {/* Navbar */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0px" left="0px" bottom="0px" zIndex="11">
          <TopBar />
        </Box>

        {/* Collection Table */}
        <Box
          mt={4}
          bg="white"
          p={4}
          borderRadius="0.75rem"
          boxShadow="lg"
          mx={{ base: 3, md: 3, lg: 0 }}
        >
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Collection List
            </Text>
            <Button bg="#5c94cf" _hover={{bgColor:"#2664a7"}} color="white" onClick={onOpen}>
              Create Collection
            </Button>
          </Flex>
           <Flex justify="flex-end" mt={2} mb={3}>
                 <ExportButton
            headers={collectionsHeader}
            data={collectionsExportData}
            fileName="collections.csv"
          />
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
                      <Th minW="200px">Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {collections.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>
                           <Box position="relative" w="50px" h="50px">
                             <Image 
                               src={item.image}
                               alt={item.title}
                               boxSize="50px"
                               objectFit="cover"
                               rounded="md"
                             />
                                 {/* Overlay Icon */}
                              <IconButton 
                                icon={<FiEye/>}
                                size="xs"
                                position="absolute"
                                top="-2%"
                                left="90%"
                                bg="blackAlpha.600"
                                color="white"
                                _hover={{bg:"blackAlpha.800"}}
                                onClick={()=>handleImagePreview(item.image)}
                                aria-label="Preview Image"
                              />
                           </Box>
  
                        </Td>
                        <Td>{item.title}</Td>
                        <Td>{item.slug}</Td>
                        <Td>{item.show_in_menu === 1 ? "Yes" : "No"}</Td>
                        <Td>{item.home_order}</Td>
                        <Td>{item.show_on_home === 1 ? "Yes" : "No"}</Td>
                        <Td>{item.description}</Td>
                        <Td>
                          <Flex gap={4}>
                            <Button
                              size="sm"
                              onClick={() => handleUpdate(item)}
                              bgColor="white"
                            >
                              <FiEdit size={18} color="#16a34a" />
                            </Button>
                            <Button
                            bgColor="white"
                              size="sm"
                              onClick={() => handleDelete(item)}
                            >
                              <RiDeleteBin6Line size={18} color="#dc2626" />
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              {/* Pagination */}
              <Flex
                mt={6}
                px={4}
                justifyContent="space-between"
                align="center"
                flexWrap="wrap"
                gap={3}
              >
                <Text fontSize="12px" color="gray.600">
                    Showing {(page - 1) * limit + 1 }  to {" "}
                    {Math.min(page * limit, total)} of {total} entries
                </Text>
                <Flex gap={1}>
                    <Button
                     fontWeight="medium"
                     size="sm"
                     variant="outline"
                     isDisabled={page === 1}
                     onClick={()=>setPage(page - 1)}
                    >Preview</Button>
                    {Array.from({length: totalPages}).map((_ , i)=>(
                       <Button 
                        key={i}
                        size="sm"
                        colorScheme="blue"
                        variant={page === i + 1 ? "solid" : "outline"}
                        onClick={()=> setPage(i + 1)}
                       >
                        {i + 1}
                       </Button>
                    ))}
                    <Button 
                     size="sm"
                     fontWeight="bold"
                     variant="outline"
                     isDisabled={page === totalPages}
                     onClick={() => setPage(page + 1)}
                    >
                      Next
                    </Button>
                </Flex>
               
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CollectionList;
