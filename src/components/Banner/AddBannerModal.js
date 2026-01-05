import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  Image,
  Text,
  Box,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { AuthContext } from "../Context/AuthContext";
import { FiUploadCloud } from "react-icons/fi";

const AddBannerModal = ({ isOpen, onClose, fetchBanner }) => {
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);
  const apiToken = auth?.token;

  const toast = useToast();

  // HANDLE FILE SELECT
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
    }
  };

  // SUBMIT API
  const handleAddBanner = async () => {
    if (!bannerFile) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("banner", bannerFile);

    setLoading(true);
    try {
      const res = await axios.post(
        Config.add_banner,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      if (res.status === 201) {
        toast({
          title: "Banner uploaded successfully",
          status: "success",
          duration: 3000,
        });

        setBannerFile(null);
        onClose();
        fetchBanner && fetchBanner();
      }
    } catch (error) {
      toast({
        title: "Banner upload failed",
        status: "error",
        duration: 3000,
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent borderRadius="lg" p={2}>
        <ModalHeader>Add Banner</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={5}>
          {/* UPLOAD BOX */}
          <Box
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            p={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ borderColor: "blue.400" }}
            onClick={() =>
              document.getElementById("bannerImage").click()
            }
            mb={4}
          >
            {bannerFile ? (
              <Image
                src={URL.createObjectURL(bannerFile)}
                maxH="160px"
                objectFit="contain"
              />
            ) : (
              <>
                <FiUploadCloud size={40} color="#4299E1" />
                <Text mt={2} fontSize="sm" color="gray.500">
                  Drop your image here or{" "}
                  <Text as="span" color="blue.500" fontWeight="bold">
                    click to browse
                  </Text>
                </Text>
              </>
            )}
          </Box>

          {/* HIDDEN INPUT */}
          <Input
            id="bannerImage"
            type="file"
            accept="image/*"
            display="none"
            onChange={handleFileChange}
          />

          {/* SUBMIT BUTTON */}
          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleAddBanner}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Upload Banner"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddBannerModal;
