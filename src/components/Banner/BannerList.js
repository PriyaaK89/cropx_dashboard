import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Config } from "../../utils/Config";
import {
  Box,
  Image,
  Button,
  Flex,
  Text,
  IconButton,
  useToast,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import TopBar from "../TopBar/TopBar";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBanner";
import { AuthContext } from "../Context/AuthContext";

const BannerList = () => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Config?.get_banners}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      if (response?.status === 200) {
        setBanner(response?.data?.banners || []);
      }
    } catch (error) {
      toast({
        title: "Failed to load banners",
        status: "error",
        duration: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleBannerModal = () => onOpen();
  const handleDeleteModal = (id) => {
    setSelectedBannerId(id);
    onDeleteModalOpen();
  };

  return (
    <>
      {/* ADD BANNER MODAL */}
      <AddBannerModal
        isOpen={isOpen}
        onClose={onClose}
        fetchBanner={fetchBanner}
      />

      {/* DELETE CONFIRM MODAL */}
      <DeleteBannerModal
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={onDeleteModalClose}
        fetchBanner={fetchBanner}
        selectedBannerId={selectedBannerId}
      />

      {/* MAIN WRAPPER */}
      <Box
        w="100%"
        maxW="1200px"
        mx="auto"
        minH="100vh"
        pl={{ base: 4, md: 10, lg: 20 }}
      >
        <TopBar />

        {/* OUTER CARD */}
        <Box
          p={{ base: 4, md: 6, lg: 8 }}
          mt={5}
          rounded="lg"
          boxShadow="2xl"
          bg="white"
        >
          {/* HEADER SECTION */}
          <Flex
            justify="space-between"
            align="center"
            p={5}
            flexDir={{ base: "column", md: "row" }}
            gap={4}
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              Banners
            </Text>

            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              borderRadius="lg"
              px={6}
              onClick={handleBannerModal}
            >
              Add Banner
            </Button>
          </Flex>

          {/* BANNER LIST */}
          <Box px={5}>
            {loading ? (
              <Flex justify="center" mt={10}>
                <Spinner size="xl" />
              </Flex>
            ) : banner?.length === 0 ? (
              <Text textAlign="center" mt={10} fontSize="lg" color="gray.600">
                No banners found
              </Text>
            ) : (
              banner?.map((data) => (
                <Flex
                  key={data?.banner_id}
                  p={4}
                  bg="#EEF0FF"
                  borderRadius="lg"
                  boxShadow="md"
                  mb={4}
                  align="center"
                  justify="space-between"
                  direction={{ base: "column", md: "row" }}
                  gap={4}
                  _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                  transition="0.2s"
                >
                  {/* IMAGE */}
                  <Box width={{ base: "100%", md: "40%" }}>
                    <Image
                      src={data?.banner_img}
                      borderRadius="md"
                      width="100%"
                      height="auto"
                      objectFit="cover"
                    />
                  </Box>

                  {/* DELETE BUTTON */}
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    borderRadius="full"
                    size="lg"
                    onClick={() => handleDeleteModal(data?.id)}
                  />
                </Flex>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BannerList;
