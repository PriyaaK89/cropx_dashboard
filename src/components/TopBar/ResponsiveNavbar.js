import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Image,
  Icon,
  Collapse,
  DrawerHeader,
    useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// Icons
import { FiHome, FiLayers, FiLogOut } from "react-icons/fi";
import { FaBoxOpen, FaTags, FaUser, FaThList } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import {
  MdCategory,
  MdOutlineProductionQuantityLimits,
  MdArrowDropDown,
  MdArrowLeft,
} from "react-icons/md";


import logo from "../../assets/logo.jpeg";

const MobileNavbar = () => {
  const { auth, setAuth } = useContext(AuthContext); // ✅ FIX
  const mail = auth?.email;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openCatalog, setOpenCatalog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
    const toast = useToast();
  
 const {logout} = useContext(AuthContext)
  const isActive = (path) => location.pathname === path;
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
    <>
      {/* TOP MOBILE BAR */}
      <Flex
        w="100%"
        h="60px"
        bg="white"
        align="center"
        justify="space-between"
        px={3}
        boxShadow="sm"
        position="sticky"
        top="0"
        zIndex={20}
        display={{ base: "flex", md: "flex", lg:"none" }}
      >
        <Image
          src={logo}
          alt="logo"
          h="40px"
          cursor="pointer"
          onClick={() => navigate("/dashboard")}
        />

        <IconButton
          icon={<HamburgerIcon />}
          variant="ghost"
          fontSize="22px"
          onClick={onOpen}
        />
      </Flex>

      {/* DRAWER */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>
            <Flex align="center" gap={2}>
              <Avatar size="sm" name={mail} />
              <Text fontSize="sm" color="gray.500">
                {mail}
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody mt={4}>
            <VStack align="start" spacing={4} w="100%">
              {/* Dashboard */}
              <Link to="/dashboard" style={{ width: "100%" }}>
                <Flex
                  align="center"
                  p="8px 14px"
                  bg={isActive("/dashboard") ? "#e9ecee" : "transparent"}
                  _hover={{ bg: "#d3e0e9ff" }}
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
                bg={openCatalog ? "#e9ecee" : "transparent"} // ✅ FIX
                _hover={{ bg: "#d3e0e9ff" }}
                w="100%"
                onClick={toggleCatalog}
              >
                <Icon as={FiLayers} mr={4} />
                <Text flex="1" fontSize="14px">
                  Catalog
                </Text>
                {openCatalog ? <MdArrowDropDown /> : <MdArrowLeft />}
              </Flex>

              <Collapse in={openCatalog} style={{ width: "100%" }}>
                {[
                  {
                    path: "/product-list",
                    label: "Products List",
                    icon: FaBoxOpen,
                  },
                  {
                    path: "/add-product",
                    label: "Add Product",
                    icon: MdOutlineProductionQuantityLimits,
                  },
                  {
                    path: "/categories-list",
                    label: "Categories List",
                    icon: MdCategory,
                  },
                  {
                    path: "/add-category",
                    label: "Add Category",
                    icon: FaTags,
                  },
                ].map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Flex
                      align="center"
                      pl="3rem"
                      p="6px"
                      bg={isActive(item.path) ? "#e9ecee" : "transparent"}
                      _hover={{ bg: "#d3e0e9ff" }}
                    >
                      <Icon as={item.icon} mr={3} />
                      <Text fontSize="14px">{item.label}</Text>
                    </Flex>
                  </Link>
                ))}
              </Collapse>

              {/* Users */}
              <Link to="/users" style={{ width: "100%" }}>
                <Flex p="8px 14px" _hover={{ bg: "#d3e0e9ff" }}>
                  <Icon as={FaUser} mr={4} />
                  <Text fontSize="14px">Users</Text>
                </Flex>
              </Link>

              {/* Banner */}
              <Link to="/banner" style={{ width: "100%" }}>
                <Flex p="8px 14px" _hover={{ bg: "#d3e0e9ff" }}>
                  <Icon as={FaThList} mr={4} />
                  <Text fontSize="14px">Banner</Text>
                </Flex>
              </Link>

              {/* Orders */}
              <Link to="/order" style={{ width: "100%" }}>
                <Flex p="8px 14px" _hover={{ bg: "#d3e0e9ff" }}>
                  <Icon as={FaCartShopping} mr={4} />
                  <Text fontSize="14px">Order</Text>
                </Flex>
              </Link>

              {/* Logout */}
              <Flex
                align="center"
                p="10px 14px"
                mt={6}
                w="100%"
                cursor="pointer"
                borderRadius="md"
                _hover={{ bg: "red.600", color: "white" }}
                onClick={handleLogout}
              >
                <Icon as={FiLogOut} mr={4} />
                <Text fontSize="14px">Logout</Text>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
