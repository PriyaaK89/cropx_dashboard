import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  Image,
  Box,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { AuthContext } from "../Context/AuthContext";

const AddBannerModal = ({ isOpen, onClose, fetchBanner }) => {
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {auth} = useContext(AuthContext);
  const apiToken = auth?.token;

  const toast = useToast();

  // HANDLE FILE SELECT
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);
  };

  // SUBMIT BANNER API
  const handleAddBanner = async () => {
    if (!bannerFile) {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("banner", bannerFile);

    setLoading(true);
    try {
      const res = await axios.post(`${Config?.add_banner}`,
        formData, 
        {  headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${apiToken}`}
        }
      );

      if (res.status === 201) {
        toast({
          title: "Banner added successfully!",
          status: "success",
          duration: 3000,
        });

        setBannerFile(null);
        onClose();

        if (fetchBanner) fetchBanner(); 
      }
    } catch (error) {
      toast({
        title: "Failed to upload banner",
        status: "error",
        duration: 3000,
      });
      console.log(error);
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

          {/* IMAGE PREVIEW */}
          {bannerFile && (
            <Box mb={4}>
              <Image
                src={URL.createObjectURL(bannerFile)}
                borderRadius="md"
                width="100%"
                height="auto"
                objectFit="cover"
              />
            </Box>
          )}

          {/* FILE INPUT */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            mb={4}
            cursor="pointer"
          />

          {/* SUBMIT BUTTON */}
          <Button
            colorScheme="blue"
            width="100%"
            borderRadius="md"
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
