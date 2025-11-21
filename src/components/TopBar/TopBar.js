import { Box, Flex, InputGroup, InputLeftElement, Input, Avatar, Text, Badge, IconButton } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";

const TopBar = () => {
  return (
    <Box  >
    <Flex
      w="100%" h="70px" bg="white"
      align="center" px={6} justify="space-between"
      boxShadow="sm" borderBottom="1px solid #e2e8f0"
      position="sticky" top="0" zIndex={10} >
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
      <Flex align="center" gap={6}>
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
    </Box>
  );
};

export default TopBar;
