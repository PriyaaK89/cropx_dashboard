import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Collapse,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../../assets/logo.jpeg";
import { FaBoxOpen, FaTags } from "react-icons/fa";
import { MdCategory, MdOutlineProductionQuantityLimits } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

import { FiHome, FiLogOut, FiLayers } from "react-icons/fi";
import { MdArrowDropDown, MdArrowLeft } from "react-icons/md";

import { FaUser, FaThList } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BsCollection } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";


const LeftSidebar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Catalog dropdown
  const catalogRoutes = [
    "/product-list",
    "/add-product",
    "/categories-list",
    "/add-category",
    "/collection",
    "/product-type"
  ];

  const shouldCatalogBeOpen = catalogRoutes.includes(location.pathname);
  const [openCatalog, setOpenCatalog] = useState(shouldCatalogBeOpen);

  const toggleCatalog = () => setOpenCatalog(!openCatalog);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 1500,
      isClosable: true,
    });

    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <Box
      w="251px"
      bg="#fff"
      color="black"
      h="93.6vh"
      position="fixed"
      left={4}
      top={5}
      rounded="lg"
      boxShadow="xl"
      p="0"
    >
      {/* Logo */}
      <Box p="1rem 2rem">
        <Image src={logo} alt="logo" h="40px" />
      </Box>

      <VStack align="stretch" spacing={0}>
        {/* Dashboard */}
        <Link to="/dashboard">
          <Flex
            align="center"
            p="8px 14px"
            bg={isActive("/dashboard") ? "#e9ecee" : "transparent"}
            color={isActive("/dashboard") ? "#4d4d4d" : "#black"}
            _hover={{ bg: "#434444ff", color: "#fff" }}
          >
            <Icon as={FiHome} mr={4} />
            <Text fontSize="14px">Dashboard</Text>
          </Flex>
        </Link>

        {/* Catalog */}
        <Flex
          align="center"
          p="8px 14px"
          cursor="pointer"
          _hover={{ bg: "#434444ff", color: "#fff" }}
          onClick={toggleCatalog}
        >
          <Icon as={FiLayers} mr={4} />
          <Text flex="1" fontSize="14px">
            Catalog
          </Text>
          <Box>{openCatalog ? <MdArrowDropDown /> : <MdArrowLeft />}</Box>
        </Flex>

        <Collapse in={openCatalog} animateOpacity>
          <Box mt="5px">
            <Link to="/product-list">
              <Text
                p="6px"
                paddingLeft="3rem"
                bg={isActive("/product-list") ? "#e9ecee" : "transparent"}
                color={isActive("/product-list") ? "#4d4d4d" : "#black"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                fontSize="14px"
              >
                <Icon as={FaBoxOpen} mr={3} />
                Products List
              </Text>
            </Link>

            <Link to="/add-product">
              <Text
                p="6px"
                paddingLeft="3rem"
                bg={isActive("/add-product") ? "#e9ecee" : "transparent"}
                color={isActive("/add-product") ? "#4d4d4d" : "#black"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                fontSize="14px"
              >
                <Icon as={MdOutlineProductionQuantityLimits} mr={3} />
                Product
              </Text>
            </Link>

            <Link to="/categories-list">
              <Text
                p="6px"
                paddingLeft="3rem"
                bg={isActive("/categories-list") ? "#e9ecee" : "transparent"}
                color={isActive("/categories-list") ? "#4d4d4d" : "#black"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                fontSize="14px"
              >
                <Icon as={MdCategory} mr={3} />
                Categories List
              </Text>
            </Link>

            <Link to="/add-category">
              <Text
                p="6px"
                paddingLeft="3rem"
                bg={isActive("/add-category") ? "#e9ecee" : "transparent"}
                color={isActive("/add-category") ? "#4d4d4d" : "#black"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                fontSize="14px"
              >
                <Icon as={FaTags} mr={3} />
                Category
              </Text>
            </Link>
            <Link to="/product-type">
              <Text
                p="6px"
                paddingLeft="3rem"
                bg={isActive("/product-type") ? "#e9ecee" : "transparent"}
                color={isActive("/product-type") ? "#4d4d4d" : "#black"}
                _hover={{ bg: "#434444ff", color: "#fff" }}
                fontSize="14px"
              >
                <Icon as={MdFilterList} mr={3} />
                Product Type
              </Text>
            </Link>
          </Box>
        </Collapse>

        {/* Users */}
        <Link to="/users">
          <Flex
            align="center"
            p="8px 14px"
            bg={isActive("/users") ? "#e9ecee" : "transparent"}
            color={isActive("/users") ? "#4d4d4d" : "#black"}
            _hover={{ bg: "#434444ff", color: "#fff" }}
          >
            <Icon as={FaUser} mr={4} />
            <Text fontSize="14px">Users</Text>
          </Flex>
        </Link>

        {/* Banner */}
        <Link to="/banner">
          <Flex
            align="center"
            p="8px 14px"
            bg={isActive("/banner") ? "#e9ecee" : "transparent"}
            color={isActive("/banner") ? "#4d4d4d" : "#black"}
            _hover={{ bg: "#434444ff", color: "#fff" }}
          >
            <Icon as={FaThList} mr={4} />
            <Text fontSize="14px">Banner</Text>
          </Flex>
        </Link>

        {/* Order */}
        <Link to="/order">
          <Flex
            align="center"
            p="8px 14px"
            bg={isActive("/order") ? "#e9ecee" : "transparent"}
            color={isActive("/order") ? "#4d4d4d" : "#black"}
            _hover={{ bg: "#434444ff", color: "#fff" }}
          >
            <Icon as={FaCartShopping} mr={4} />
            <Text fontSize="14px">Order</Text>
          </Flex>
        </Link>
        <Link to="/collection">
          <Flex
            align="center"
            p="8px 14px"
            bg={isActive("/collection") ? "#e9ecee" : "transparent"}
            color={isActive("/collection") ? "#4d4d4d" : "#black"}
            _hover={{ bg: "#434444ff", color: "#fff" }}
          >
            <Icon as={BsCollection} mr={4} />
            <Text fontSize="14px">Collection</Text>
          </Flex>
        </Link>
      </VStack>

      {/* Logout */}
      <Flex
        align="center"
        position="absolute"
        bottom="20px"
        w="85%"
        p="12px"
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: "red.600", color: "white" }}
        onClick={handleLogout}
      >
        <Icon as={FiLogOut} mr={4} />
        <Text fontSize="14px">Logout</Text>
      </Flex>
    </Box>
  );
};

export default LeftSidebar;
