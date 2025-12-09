import React from "react";
import { Box, Flex, Icon, Text, VStack, Collapse, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { FiHome, FiUser, FiShoppingCart, FiSettings, FiLogOut, FiLayers } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { MdArrowDropDown, MdArrowLeft } from "react-icons/md";
import { FaUser, FaThList  } from "react-icons/fa";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // dropdown toggles
  const catalog = useDisclosure();
  const customers = useDisclosure();

  const catalogRoutes = [
    "/product-list",
    "/add-product",
    "/categories-list",
    "/add-category",
  ];

  const shouldCatalogBeOpen = catalogRoutes.includes(location.pathname);
  const [openCatalog, setOpenCatalog] = React.useState(false);

  const toggleCatalog = () => setOpenCatalog(!openCatalog);
  const isCatalogOpen = shouldCatalogBeOpen || openCatalog;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <Box
      w="251px"
      bg="#fff"
      color="black"
      h="93.6vh"
      position="fixed"
      left={7}
      top={5}
      rounded="lg"
        boxShadow="2xl"
      p="0px" >
      {/* Logo */}
      <Box p="1rem 2rem">
        <Text fontSize="2xl" fontWeight="bold">
          CropX
        </Text>
      </Box>

      <VStack align="stretch" spacing={0}>
        {/* Dashboard */}
        <Link to="/dashboard">
          <Flex
            align="center"
            p="8px 14px"
            // borderRadius="md"
            bg={isActive("/dashboard") ? "#e9ecee" : "transparent"}
            color={isActive("/dashboard") ? "#4d4d4d" : "#white"}
            _hover={{ bg: "#434444ff", color: "#fff" }}>
            <Icon as={FiHome} mr={4} />
            <Text fontSize="14px">Dashboard</Text>
          </Flex>
        </Link>

        {/* Catalog Dropdown */}
        <Flex
          align="center"
          p="8px 14px"
          cursor="pointer"
          _hover={{ bg: "#434444ff", color:"#fff" }}
          onClick={toggleCatalog}>
          <Icon as={FiLayers} mr={4} />
          <Text flex="1" fontSize="14px">
            Catalog
          </Text>
          <Box>{isCatalogOpen ? <MdArrowDropDown /> : <MdArrowLeft />}</Box>
        </Flex>

        <Collapse
          in={isCatalogOpen}
          animateOpacity
          startingHeight="0px"
          style={{ overflow: "visible" }}>
          <Box mt="5px">
            <Link to="/product-list">
              <Text
                p="4px"
                paddingLeft="3rem"
                bg={isActive("/product-list") ? "#e9ecee" : "transparent"}
                color={isActive("/product-list") ? "#4d4d4d" : "#white"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                fontSize="14px">
                Products List
              </Text>
            </Link>
            <Link to="/add-product">
              <Text
                p="4px"
                paddingLeft="3rem"
                fontSize="14px"
                bg={isActive("/add-product") ? "#e9ecee" : "transparent"}
                color={isActive("/add-product") ? "#4d4d4d" : "#white"}
                _hover={{ bg: "#434444ff", color: "#fff" }}>
                Product
              </Text>
            </Link>
            <Link to="/categories-list">
              <Text
                p="4px"
                bg={isActive("/categories-list") ? "#e9ecee" : "transparent"}
                color={isActive("/categories-list") ? "#4d4d4d" : "#white"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                paddingLeft="3rem"
                fontSize="14px">
                Categories List
              </Text>
            </Link>
            <Link to="/add-category">
              <Text
                p="4px"
                bg={isActive("/add-category") ? "#e9ecee" : "transparent"}
                color={isActive("/add-category") ? "#4d4d4d" : "#white"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                paddingLeft="3rem"
                fontSize="14px"
         >
                Category
              </Text>
            </Link>
          </Box>
        </Collapse>

        {/* Customers Dropdown */}

        {/* Settings */}
        <Link to="/users">
          <Flex align="center" p="8px 14px" _hover={{ bg: "#434444ff", color: "#fff" }}>
            <Icon as={FaUser} mr={4} />
            <Text>Users</Text>
          </Flex>
        </Link>

          <Link to="/banner">
          <Flex align="center" p="8px 14px" _hover={{ bg: "#434444ff", color: "#fff" }}>
            <Icon as={FaThList} mr={4} />
            <Text>Banner</Text>
          </Flex>
        </Link>
      </VStack>

      {/* Logout */}
      <Flex
        align="center"
        mt="auto"
        position="absolute"
        bottom="20px"
        w="85%"
        p="12px"
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: "red.600" }}
        onClick={handleLogout}>
        <Icon as={FiLogOut} mr={4} />
        <Text>Logout</Text>
      </Flex>
    </Box>
  );
};

export default LeftSidebar;
