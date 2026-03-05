import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Config } from "../../utils/Config";
import {useColorModeValue } from "@chakra-ui/react";
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
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
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
  const bgColor = useColorModeValue("white","#1E293B");
  const textColor = useColorModeValue("gray.800","white");
  const rowHoverBg = useColorModeValue("gray.50","gray.700");

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

      <Box
        width={{ base: "100%", lg: "calc(100% - 260px)" }}
        px={{ base:0, lg: 6}}
        ml={{ base: "0", lg: "260px" }}
        mb={5}
      >
        <Box display={{ base: "block", lg: "none" }}>
          <ResponsiveNavbar />
        </Box>
        <Box display={{ base: "none", lg: "block" }} position="sticky" top="0px" left="0px" right="0px" bottom="0px" zIndex="11">
          <TopBar />
        </Box>

        {/* OUTER CARD */}
        <Box p={4} mt={4} boxShadow="sm" bg={bgColor}  textColor={textColor} borderRadius="0.75rem" mx={{base:3,md:3,lg:0}}>
          {/* HEADER SECTION */}
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={4}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontSize="2xl" fontWeight="bold" p={1}>
              Banners
            </Text>

            <Button
             variant="outline"
  border="1px"
  borderColor="#2275FC"
  borderRadius="8px"
  color="#2275FC"
  mb={4}
  bg="white"
  px={6}
  py={5}
  fontSize="14px"
  fontWeight="500"
   _hover={{
    bg: "#1357c4",
    color: "white"}}
              onClick={handleBannerModal}
            >
               + Add Banner
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
                  bg={bgColor}
                  borderRadius="lg"
                  boxShadow="md"
                  mb={4}
                  align="center"
                  justify="space-between"
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: 4, md: 6 }}
                  _hover={{ bg: rowHoverBg, boxShadow: "lg", transform: "scale(1.01)" }}
                  transition="0.2s"
                >
                  {/* IMAGE */}
                  <Box w={{ base: "100%",  lg: "75%" }}>
                    <Image
                      src={data?.banner_img}
                      borderRadius="md"
                      w="100%"
                      maxH={{ base: "180px", md: "220px", lg: "260px" }}
                      objectFit="cover"
                    />
                  </Box>
                  <Flex w={{base:"100%",md:"auto"}} justifyContent={{base:"flex-end",md:"center"}}>
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
