import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NotificationPopover from "./NotificationPopover";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const { auth } = useContext(AuthContext);
  const mail = auth?.email;
  const navigate = useNavigate()

  return (
    <Box mt={5}>
      <Flex
        display={{ base: "none", lg: "flex" }}
        w="100%"
        h="70px"
        bg="white"
        align="center"
        px={6}
        justify="space-between"
        boxShadow="sm"
        borderBottom="1px solid #e2e8f0"
        borderRadius="0.75rem"
      >
        {/* LEFT → Search */}
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

        {/* RIGHT → Notification + User */}
        <Flex align="center" gap={6} cursor="pointer" onClick={()=>navigate("/profile")}>
          {/* Notification */}
          <NotificationPopover />

          {/* User Info */}
          <Flex align="center" gap={3}>
            <Avatar
              size="sm"
              name="Priya Kumawat"
              src="https://i.pravatar.cc/150?img=5"
            />
            <Box lineHeight="1.1">
              <Text fontSize="xs" color="gray.500">
                {mail}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
