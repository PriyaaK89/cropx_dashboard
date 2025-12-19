import { Box, Flex, InputGroup, InputLeftElement, Input, Avatar, Text, Badge, IconButton ,Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,useDisclosure,VStack} from "@chakra-ui/react";
import { SearchIcon, BellIcon,HamburgerIcon } from "@chakra-ui/icons";

const TopBar = () => {
   const {isOpen, onOpen, onClose} = useDisclosure ();
  return (
    <Box  >
    <Flex
      w="100%" h="70px" bg="white"
      mt={5}
      align="center" px={{base:4, md:6}} justify="space-between"
      boxShadow="sm" borderBottom="1px solid #e2e8f0"
      rounded="lg"
      position="sticky" top="0" zIndex={10} >
        <IconButton
        icon={<HamburgerIcon/>}
        display={{base:"flex" ,md:"none"}}
        onClick={onOpen}
        variant="ghost"
        fontSize="22px"
        />
      {/* LEFT AREA → Search */}
      <InputGroup w="350px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          bg="#f1f3f4"
          rounded="full"
          fontSize="sm"
        />
      </InputGroup>

      {/* RIGHT AREA → Flags, Notification, User */}
      <Flex align="center" gap={6} display={{base:"none" ,md:"flex"}}>
        {/* Country Flag */}
        <Box fontSize="25px" cursor="pointer">
          🇩🇪
        </Box>

        {/* Notification Bell */}
        <Box position="relative">
          <IconButton
            icon={<BellIcon />}
            variant="ghost"
            fontSize="22px"
            color="gray.600"
          />
          <Badge
            position="absolute"
            top="0"
            right="0"
            bg="red.500"
            color="white"
            rounded="full"
            fontSize="0.7rem"
            px={1}
          >
            3
          </Badge>
        </Box>

        {/* User Info */}
        <Flex align="center" gap={3}>
          <Avatar
            size="sm"
            name="Priya Kumawat"
            src="https://i.pravatar.cc/150?img=5"
          />
          <Box lineHeight="1.1">
            <Text fontWeight="600" fontSize="sm">
              Priya Kumawat
            </Text>
            <Text fontSize="xs" color="gray.500">
              priya@example.com
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay/>
      <DrawerHeader>Menu</DrawerHeader>
      <DrawerBody>
        <VStack align="start" spacing={4} >
          <InputGroup>
          <InputLeftElement pointerEvents="none">
              <SearchIcon/>
          </InputLeftElement>
           <Input _placeholder="search ..."/>
          </InputGroup>
           <Flex align="center" gap={3}>
            <Avatar size="sm"/>
            <Box>
              <Text fontWeight="600">Priya Kumawat</Text>
               <Text fontSize="sm">priya@example.com</Text>

            </Box>
           </Flex>
           <Text>Dashboard</Text>
           <Text>Profile</Text>
           <Text>Logout</Text>
        </VStack>
      </DrawerBody>
    </Drawer>
    </Box>
  );
};

export default TopBar;
