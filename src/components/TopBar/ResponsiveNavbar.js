import React, { useContext, useState, useEffect, useRef } from "react";
import {
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
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  useToast,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import gsap from "gsap";

// Icons
import { FiHome, FiLayers, FiLogOut } from "react-icons/fi";
import { FaBoxOpen, FaTags, FaUser, FaThList } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import {
  MdCategory,
  MdOutlineProductionQuantityLimits,
  MdArrowDropDown,
  MdArrowLeft,
  MdFilterList,
} from "react-icons/md";
import { BsCollection } from "react-icons/bs";
import { LuMoon, LuSun } from "react-icons/lu";

import logo from "../../assets/logo.png";

const MobileNavbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const mail = auth?.email;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openCatalog, setOpenCatalog] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("white", "#1E293B");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const drawerRef = useRef(null);

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

  // Drawer slide animation
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [isOpen]);

  // Nav items stagger animation
  useEffect(() => {
    if (isOpen) {
      gsap.from(".nav-items > a, .nav-items > div", {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* 🔹 TOP MOBILE BAR */}
      <Flex
        w="100%"
        h="60px"
        bg={bgColor}
        color={textColor}
        align="center"
        justify="space-between"
        px={3}
        boxShadow="sm"
        position="fixed"
        top="0"
        zIndex={20}
        display={{ base: "flex", lg: "none" }}
      >
        <Image
          src={logo}
          alt="logo"
          h="38px"
          cursor="pointer"
          onClick={() => navigate("/dashboard")}
        />

        <IconButton
          aria-label="menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          fontSize="22px"
          onClick={onOpen}
        />
      </Flex>

      {/* 🔹 DRAWER */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent ref={drawerRef} bg={bgColor} color={textColor}>
          <DrawerCloseButton />

          {/* 🔹 USER HEADER */}
          <DrawerHeader>
            <Flex
              align="center"
              gap={3}
              cursor="pointer"
              onClick={() => navigate("/profile")}
            >
              <Avatar
                size="sm"
                name="Priya Kumawat"
                src="https://i.pravatar.cc/150?img=5"
              />
              <Box>
                <Text fontSize="xs">{mail}</Text>
              </Box>
            </Flex>

            {/* 🔹 SEARCH */}
            <InputGroup mt={4}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search..."
                size="sm"
                rounded="full"
                bg={useColorModeValue("gray.100", "gray.700")}
              />
            </InputGroup>
          </DrawerHeader>

          {/* 🔹 NAVIGATION */}
          <DrawerBody>
            <VStack align="start" spacing={1} w="100%" className="nav-items">
              {/* Dashboard */}
              <Link to="/dashboard" style={{ width: "100%" }}>
                <Flex
                  p="10px"
                  align="center"
                  bg={isActive("/dashboard") ? hoverBg : "transparent"}
                  _hover={{ bg: hoverBg }}
                >
                  <Icon as={FiHome} mr={2} />
                  <Text>Dashboard</Text>
                </Flex>
              </Link>
               {/* Notification & Theme Buttons (after Catalog list) */}
             
              <Flex p="10px" align="center">
                <IconButton
                  size="sm"
                  variant="outline"
                  aria-label="Toggle theme"
                  onClick={toggleColorMode}
                  icon={colorMode === "light" ? <LuMoon /> : <LuSun />}
                />
                <Text>Theme</Text>
              </Flex>

              {/* Catalog */}
              <Flex
                p="10px"
                align="center"
                w="100%"
                cursor="pointer"
                bg={openCatalog ? hoverBg : "transparent"}
                _hover={{ bg: hoverBg }}
                onClick={toggleCatalog}
              >
                <Icon as={FiLayers} mr={3} />
                <Text flex="1">Catalog</Text>
                {openCatalog ? <MdArrowDropDown /> : <MdArrowLeft />}
              </Flex>

              <Collapse in={openCatalog} style={{ width: "100%" }}>
                {[
                  { path: "/product-list", label: "Products", icon: FaBoxOpen },
                  {
                    path: "/add-product",
                    label: "Add Product",
                    icon: MdOutlineProductionQuantityLimits,
                  },
                  {
                    path: "/categories-list",
                    label: "Categories",
                    icon: MdCategory,
                  },
                  {
                    path: "/add-category",
                    label: "Add Category",
                    icon: FaTags,
                  },
                  {
                    path: "/product-type",
                    label: "Product Type",
                    icon: MdFilterList,
                  },
                ].map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Flex
                      pl="3rem"
                      p="8px"
                      align="center"
                      bg={isActive(item.path) ? hoverBg : "transparent"}
                      _hover={{ bg: hoverBg }}
                    >
                      <Icon as={item.icon} mr={3} />
                      <Text fontSize="sm">{item.label}</Text>
                    </Flex>
                  </Link>
                ))}
              </Collapse>

              
              {/* Other Links */}
              {[
                { path: "/users", label: "Users", icon: FaUser },
                { path: "/banner", label: "Banner", icon: FaThList },
                { path: "/order", label: "Orders", icon: FaCartShopping },
                {
                  path: "/collection",
                  label: "Collection",
                  icon: BsCollection,
                },
              ].map((item) => (
                <Link key={item.path} to={item.path} style={{ width: "100%" }}>
                  <Flex p="10px" align="center" _hover={{ bg: hoverBg }}>
                    <Icon as={item.icon} mr={3} />
                    <Text>{item.label}</Text>
                  </Flex>
                </Link>
              ))}
             


              {/* Logout */}
              <Flex
                mt={6}
                p="10px"
                w="100%"
                align="center"
                cursor="pointer"
                borderRadius="md"
                _hover={{ bg: "red.500", color: "white" }}
                onClick={handleLogout}
              >
                <Icon as={FiLogOut} mr={3} />
                <Text>Logout</Text>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
