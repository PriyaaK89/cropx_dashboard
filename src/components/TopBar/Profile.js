import {
  Box,
  Flex,
  Avatar,
  Text,
  Divider,
  Stack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";

import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "./TopBar";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/300?img=5"
  );

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <Box w="100%" minH="98vh" bg="#f8f8f8" pt={{ base: "60px", lg: 0 }}>
      <Flex>
        {/* LEFT SIDEBAR */}
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>

        {/* RIGHT CONTENT */}
        <Box
          w={{ base: "100%", lg: "calc(100% - 260px)" }}
          ml={{ base: 0, lg: "260px" }}
          px={{ base: 3, lg: 6 }}
          mb={5}
        >
          {/* Mobile Navbar */}
          <Box display={{ base: "block", lg: "none" }}>
            <ResponsiveNavbar />
          </Box>

          {/* Desktop Topbar */}
          <Box
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top={0}
            zIndex={10}
          >
            <TopBar />
          </Box>

          {/* PROFILE CARD */}
          <Box
            mt={4}
            bg="white"
            p={6}
            borderRadius="0.75rem"
            boxShadow="lg"
          >
            {/* Top Section */}
            <Flex align="center" gap={6}>
              <Box position="relative">
                <Avatar size="xl" src={profileImage} />

                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  position="absolute"
                  bottom="0"
                  right="0"
                  colorScheme="blue"
                  rounded="full"
                  aria-label="Edit profile picture"
                  onClick={() => fileInputRef.current.click()}
                />

                <Input
                  type="file"
                  accept="image/*"
                  display="none"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </Box>

              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Welcome,{" "}
                  <Text as="span" color="red.400">
                    Admin
                  </Text>
                </Text>
              </Box>
            </Flex>

            <Divider my={6} />

            {/* Details */}
            <Stack spacing={4} fontSize="sm">
              <Flex>
                <Text w="150px" fontWeight="600">
                  First Name:
                </Text>
                <Text>Ida</Text>
              </Flex>

              <Flex>
                <Text w="150px" fontWeight="600">
                  Last Name:
                </Text>
                <Text>Miller</Text>
              </Flex>

              <Flex>
                <Text w="150px" fontWeight="600">
                  Email:
                </Text>
                <Text>admin@gmail.com</Text>
              </Flex>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
