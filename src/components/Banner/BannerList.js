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
import { useNavigate } from "react-router-dom";
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
  console.log(apiToken, "authToken")

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Config?.get_banners}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      });
      if (response?.status === 200) {
        setBanner(response?.data?.banners || []);
      }
    } catch (error) {
      console.log(error);
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

  // DELETE Banner API

  const handleBannerModal = () => {
    onOpen();
  };
  const handleDeleteModal = (id) => {
    onDeleteModalOpen();
    setSelectedBannerId(id);
  };

  return (
    <>
      <AddBannerModal
        isOpen={isOpen}
        onClose={onClose}
        fetchBanner={fetchBanner}
      />
      <DeleteBannerModal
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={onDeleteModalClose}
        fetchBanner={fetchBanner}
        selectedBannerId={selectedBannerId}
      />
      <Box width="80.3%" bg="#f8f9fa" minH="100vh">
        <TopBar />

        {/* TOP BAR ACTIONS */}
        <Flex justify="space-between" align="center" p={5}>
          <Text fontSize="2xl" fontWeight="bold">
            Banners
          </Text>

          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            borderRadius="lg"
            px={6}
            onClick={handleBannerModal}>
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
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                mb={4}
                align="center"
                justify="space-between"
                _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                transition="0.2s">
                <Box width="40%">
                  <Image
                    src={data?.banner_img}
                    borderRadius="md"
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>

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
    </>
  );
};

export default BannerList;
