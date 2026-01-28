import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";
import ExportButton from "../Button/ExportBtn";
import TopBar from "../TopBar/TopBar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import { Config } from "../../utils/Config";
import DeleteCategoryModal from "./DeleteCategoryModal";
import SubCategory from "./SubCategoryModal";
import ChildCategory from "./ChildCategoryModal";
import ViewSubCategoryModal from "./ViewSubCategoryModal";


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
    const [subCategories, setSubCategories]= useState([]);
    const [subLoading, setSubLoading] = useState(false);

  const [categoryId, setCategoryId] = useState("");
  const [selectedSubMap, setSelectedSubMap] = useState({});
  const [selectedChildMap, setSelectedChildMap] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSubOpen,
    onOpen: onSubOpen,
    onClose: onSubClose,
  } = useDisclosure();
  const {
    isOpen: isChildOpen,
    onOpen: onChildOpen,
    onClose: onChildClose,
  } = useDisclosure();

  /* ================= API CALLS ================= */

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(Config.get_categories, {
        params: {
          page,
          limit,
          search: search,
         
        },
      });
      setCategories(res.data.categories || []);
      setFiltered(res.data.categories || []);
      setTotalPages(res.data.totalPages || 1);
      setTotal(res.data.totalItems || 0);
      
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const categoriesHeader = [
    "category_name",
    "sub_category",
    "child_category",
    "desciption",
    "created",
    "menu",
    "home"
  ];
  const categoriesExportData = filtered.map((item) => ({
    category_name: item.cate_name,
    sub_category: item.sub_categories?.map((sub) => sub.name).join(", "),
    child_category: item.child_categories?.map((child) => child.name).join(", "),
    created: item.created_at,
    menu: Number(item.show_in_menu) === 1 ? "Yes" : "No",
    home: Number(item.show_on_home) === 1 ? "Yes" : "No",
  }));
  

  /* ================= EFFECTS ================= */

  useEffect(() => {
    getCategories();
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
    getCategories()     
  }, [search])

  
  /* ================= HANDLERS ================= */

  const handleDelete = (id) => {
    setCategoryId(id);
    onOpen();
  };
   const fetchSubCategories = async (categoryId) => {
    setSubLoading(true);
    try {
      const res = await axios.get(Config.get_sub_category,{
        params: {
          category_id: categoryId 
        }
      }
      
      );
      setSubCategories(res.data.data || []);
      setIsSubCategoryOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubLoading(false);
    }
  };

  const getViewParams = (item) => {
    //  Child category selected
    if (selectedChildMap[item.id]) {
      const sub = item.sub_categories.find(
        (s) => s.id === Number(selectedSubMap[item.id]),
      );

      const child = sub?.child_categories.find(
        (c) => c.id === Number(selectedChildMap[item.id]),
      );

      if (child) {
        return { cate: "child-category", slug: child.slug };
      }
    }

    //  Sub category selected
    if (selectedSubMap[item.id]) {
      const sub = item.sub_categories.find(
        (s) => s.id === Number(selectedSubMap[item.id]),
      );

      if (sub) {
        return { cate: "sub-category", slug: sub.slug };
      }
    }

    //  Default category
    return { cate: "category", slug: item.slug };
  };
  const deleteSubCategory = async (id) => {
  try {
    await axios.delete(`${Config.delete_subcategory}/${id}`);
    setSubCategories(prev => prev.filter(sub => sub.id !== id));
  } catch (err) {
    console.log(err);
  }
};


  return (
    <>
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryId={categoryId}
        fetchCategories={getCategories}
        onDeleteSubCategory={deleteSubCategory}
      />
      <ViewSubCategoryModal
  isOpen={isSubCategoryOpen}
  onClose={() => setIsSubCategoryOpen(false)}
  loading={subLoading}
  subCategories={subCategories}
  onDeleteSubCategory={deleteSubCategory}
/>

      <SubCategory isOpen={isSubOpen} onClose={onSubClose} />
      <ChildCategory isOpen={isChildOpen} onClose={onChildClose} />
      <Box
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        ml={{ base: 0, lg: "260px" }}
        px={{ base: 0, lg: 6 }}
        minH="100vh">
        {/* NAVBAR */}
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="0px"
          bottom="0px"
          left="0px"
          right="0px"
          zIndex="11">
          <TopBar />
        </Box>

        {/* CONTENT */}
        <Box bg="white" p={4} mt={4} borderRadius="lg" boxShadow="lg">
          <Flex justify="space-between" mb={5} flexWrap="wrap" gap={3}>
            <Text fontSize="2xl" fontWeight="600">
              Category List
            </Text>

            <Flex gap={3}>
              <Button variant="outline" border="1px"
              borderRadius="8px"
              color="#2275fc"
              bg="white"
              px={6}
              py={5}
              fontSize="14px"
              fontWeight="500"
               onClick={onSubOpen}
               _hover={{bg:"#1357c4",color:"white"}}
               >
                + Sub Category
              </Button>
              <Button  variant="outline" border="1px"
              borderRadius="8px"
              color="#2275fc"
              bg="white"
              px={6}
              py={5}
              fontSize="14px"
              fontWeight="500"
               onClick={onSubOpen}
               _hover={{bg:"#1357c4",color:"white"}} onClick={onChildOpen}>
                + Child Category
              </Button>
              <Link to="/add-category">
                <Button  variant="outline" border="1px"
              borderRadius="8px"
              color="#2275fc"
              bg="white"
              px={6}
              py={5}
              fontSize="14px"
              fontWeight="500"
               onClick={onSubOpen}
               _hover={{bg:"#1357c4",color:"white"}}>+ Add Category</Button>
              </Link>
            </Flex>
          </Flex>

          {/* SEARCH */}
          <Flex justify="space-between" align="center">
            <Flex
              mb={4}
              px={2}
              py="4px"
              align="center"
              maxW="300px"
              border="1px"
              borderColor="gray.400"
              rounded="lg">
              <Input
                ml={2}
                variant="unstyled"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                border="none"
                outline="none"
                py={1}
              />

            </Flex>
            <ExportButton
              headers={categoriesHeader}
              data={categoriesExportData}
              fileName="categories.csv"
            />
          </Flex>

          {loading ? (
            <Flex justify="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Table
                variant="simple"
                minW={{ base: "900px", md: "1100px", xl: "1400px" }}
                className="productsTable">
                <Thead bg="gray.100">
                  <Tr>
                    <Th minW="100px">Category Name</Th>
                    <Th minW="150px">Sub Category</Th>
                    <Th minW="150px">Child Category</Th>
                    <Th minW="100px">Description</Th>
                    <Th minW="100px">Created</Th>
                    <Th minW="50px">Menu</Th>
                    <Th minW="50px">Home</Th>
                    <Th minW="150px">Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filtered.map((item) => {
                    const { cate, slug } = getViewParams(item);
                    return (
                      <Tr key={item.id}>
                        {/* CATEGORY NAME + DROPDOWNS */}
                        <Td>
                          <Text fontWeight="500">{item.cate_name}</Text>
                        </Td>
                        <Td>
                          <select
                            style={{ width: "150px", padding: "6px" }}
                            value={selectedSubMap[item.id] || ""}
                            onChange={(e) => {
                              setSelectedSubMap((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }));
                            }}>
                            <option value="">Select</option>
                            {(item.sub_categories || []).map((sub) => (
                              <option key={sub.id} value={sub.id}>
                                {sub.name}
                              </option>
                            ))}
                          </select>
                        </Td>

                        {/* Child Category */}
                        <Td>
                          {selectedSubMap[item.id] && (
                            <select
                              style={{ width: "150px", padding: "6px" }}
                              value={selectedChildMap[item.id] || ""}
                              onChange={(e) =>
                                setSelectedChildMap((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }>
                              <option value="">Select</option>
                              {(
                                item.sub_categories?.find(
                                  (sub) =>
                                    sub.id === Number(selectedSubMap[item.id]),
                                )?.child_categories || []
                              ).map((child) => (
                                <option key={child.id} value={child.id}>
                                  {child.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </Td>

                        <Td>{item.description}</Td>
                        <Td>{new Date(item.created_at).toLocaleDateString()}</Td>
                        <Td>{item.show_in_menu === 1 ? "Yes" : "No"}</Td>
                        <Td>{item.show_on_home === 1 ? "Yes" : "No"}</Td>

                        {/* ACTIONS */}
                        <Td>
                          <Link to={`/view-category/${cate}/${slug}`}>
                            <Button size="sm" bg="white" mr={2}>
                              <FiEye size={18} color="#2563eb" />
                            </Button>
                          </Link>
                         
                          <Button
                            bg="white"
                            size="sm"
                            onClick={() => handleDelete(item.id)}>
                            <RiDeleteBin6Line size={18} color="#dc2626" />
                          </Button>
                           <Button colorScheme="blue" fontSize="12px" onClick={()=>fetchSubCategories(item.id)}>
                            View Sub Categories
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          )}
         {/* pagination */}
        <Flex
          mt={6}
          px={4}
          py={3}
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={3}
        >
          <Text fontSize="12px" color="gray.600">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, total)} of {total} entries
          </Text>

          <Flex gap={1}>
            <Button
              fontWeight="medium"
              size="sm"
              variant="outline"
              isDisabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages || 1 }).map((_, i) => (
              <Button
                key={i}
                size="sm"
                colorScheme="blue"
                variant={page === i + 1 ? "solid" : "outline"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              fontWeight="medium"
              variant="outline"
              isDisabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Flex>
          </Flex>
          </Box>
      </Box>
      </>
  );
};

export default CategoryList;
