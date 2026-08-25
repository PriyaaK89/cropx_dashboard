import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import NotificationPopover from "./NotificationPopover";
import { useNavigate } from "react-router-dom";
import { LuMoon, LuSun, LuMinimize } from "react-icons/lu";
import { CiMaximize2 } from "react-icons/ci";
import { useToast } from "@chakra-ui/react";

const TopBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { auth } = useContext(AuthContext);
  const mail = auth?.email;
  const navigate = useNavigate();

  // ✅ Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toast = useToast();

  // ✅ Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
     toast({
        title: "Fullscreen enabled",
      description: "Press ESC to exit fullscreen",
      status: "info",
      duration: 2000,
      isClosable: true,
     })

    } else {
      document.exitFullscreen();
    }
  };

  // ✅ Listen fullscreen change (ESC / browser exit)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <Box mt={5}>
      <Flex
        display={{ base: "none", lg: "flex" }}
        w="100%"
        h="70px"
        bg={useColorModeValue("white", "#1E293B")}
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        align="center"
        px={6}
        justify="space-between"
        boxShadow="sm"
        borderRadius="0.75rem"
      >
        {/* LEFT → Search */}
        <InputGroup w="350px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            bg={useColorModeValue("gray.100", "gray.700")}
            rounded="full"
            fontSize="sm"
          />
        </InputGroup>

        {/* RIGHT */}
        <Flex align="center" gap={6}>
          {/* Notification */}
          <NotificationPopover />

          {/* Dark / Light */}
          <IconButton
            size="sm"
            variant="outline"
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <LuMoon /> : <LuSun />}
          />

          {/* Fullscreen */}
          <IconButton
            size="sm"
            variant="outline"
            aria-label="Fullscreen"
            onClick={toggleFullscreen}
            icon={isFullscreen ? <LuMinimize /> : <CiMaximize2 />}
          />

          {/* User Profile */}
          <Flex
            align="center"
            gap={3}
            cursor="pointer"
            onClick={() => navigate("/profile")}
          >
            <Avatar
              size="sm"
              name="User"
              src={userProfileImg}
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
