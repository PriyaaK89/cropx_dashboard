import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Badge, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Spinner, useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import TopBar from "../TopBar/TopBar";
import { Config } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('')
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState("");
  const {isOpen, onOpen, onClose} = useDisclosure();

  // Fetch Products
  const getProducts = async () => {
    try {
      const res = await axios.get(`${Config?.get_products}?page=${page}&limit=${limit}&search=${search}&category=${category}&expiry_status=${status}`);
      if (res.data.success) {
        setProducts(res.data.data);
        setFiltered(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "") { result = result.filter((p) => p.product_category === categoryFilter); }
    setFiltered(result);
  }, [search, categoryFilter, products]);

  const handleDeleteModal = (id)=>{
    onOpen();
    setProductId(id)
  }
  console.log(productId, "ProductIDilist")

  return (
    <>
    <DeleteProductModal isOpen={isOpen} onClose={onClose} productId={productId} getProducts={getProducts}/>
    <Box bg="#f8f9fa" minH="100vh" mt={10}>
      <TopBar />
      <Box p={6}>
        <Text fontSize="2xl" fontWeight="600" mb={4}> Product List </Text>

        <Flex mb={4} gap={4} flexWrap="wrap">
          <Input
            placeholder="Search product..."
            width="250px"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select width="250px" placeholder="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}>
            {[...new Set(products.map((p) => p.product_category))].map((c) => (
              <option key={c} value={c}> {c} </option>
            ))}
          </Select>
        </Flex>

        {/* LOADING */}
        {loading ? (
          <Flex justify="center" mt={10}> <Spinner size="xl" /> </Flex>
        ) : (
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
                <Th width="23%">Product</Th>
                <Th width="10%">Category</Th>
                <Th width="8%">Type</Th>
                <Th width="8%">Variants</Th>
                <Th width="15%">Stock</Th>
                <Th width="15%">Expiry</Th>
                <Th width="25%">Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {filtered.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <HStack spacing={3}>
                      <Image src={item.product_img} alt={item.product_name} boxSize="50px" objectFit="cover" rounded="md"/>
                      <Box>
                        <Text fontWeight="600">{item.product_name}</Text>
                        <Text fontSize="sm" color="gray.500"> {item.product_description} </Text>
                      </Box>
                    </HStack>
                  </Td>

                  <Td>{item.product_category}</Td>
                  <Td>{item.product_type}</Td>
                  <Td>{item.single_packs.length + item.multi_packs.length}</Td>
                  <Td>
                    <Badge
                      colorScheme={item.stock_qty > 0 ? "green" : "red"} px={2} py={1}
                      rounded="lg">
                      {item.stock_qty > 0 ? `${item.stock_qty}` : "Out of Stock"}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={ item.expiry_status === "Near Expiry" ? "orange" : "gray"} px={2} py={1} rounded="lg"> {item.expiry_status} </Badge>
                  </Td>

                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" colorScheme="blue"  onClick={() => navigate(`/product/${item.id}`)}> View </Button>
                      <Button size="sm" colorScheme="green"  onClick={() => navigate(`/product-details/${item.id}`)}> Details </Button>
                      <Button size="sm" colorScheme="yellow" onClick={()=> navigate(`/update-product/${item?.id}`)}> Edit </Button>
                      <Button size="sm" colorScheme="red" onClick={()=>{handleDeleteModal(item?.id)}}> Delete </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </Box></Box>
        )}
      </Box>
    </Box>
    </>
  );
};

export default ProductList;
