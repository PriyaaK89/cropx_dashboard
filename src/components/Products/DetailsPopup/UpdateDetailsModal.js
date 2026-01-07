import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Button,
  Input,
  Text,
  HStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../../../utils/Config";
import { FiUploadCloud } from "react-icons/fi";

const UpdateDetailsModal = ({
  isUpdateDetailsModalOpen,
  onUpdateDetailsModalClose,
  productId,
  data,
  getProductDetails,
}) => {
  const existing = data?.details;

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState("");

  const [productOverview, setProductOverview] = useState([]);
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [expertAdvice, setExpertAdvice] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState([]);

  // 🔁 Load existing data
  useEffect(() => {
    if (existing) {
      setProductOverview(existing.product_overview || []);
      setKeyFeatures(existing.key_features_and_benefits || []);
      setExpertAdvice(existing.expert_advice || []);
      setAdditionalInfo(existing.additional_information || []);
    }
  }, [existing, isUpdateDetailsModalOpen]);

  // 📤 Image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);

    if (mapped.length > 0) {
      setPreview(mapped[0].preview);
    }
  };

  // ❌ Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ➕ Text handlers
  const addItem = (setter) => setter((prev) => [...prev, { name: "" }]);

  const updateItem = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index].name = value;
      return updated;
    });
  };

  const removeItem = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  // 🔄 Update API
  const handleUpdateProductDetails = async () => {
    try {
      const formData = new FormData();

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      formData.append("product_overview", JSON.stringify(productOverview));
      formData.append("key_features_and_benefits", JSON.stringify(keyFeatures));
      formData.append("expert_advice", JSON.stringify(expertAdvice));
      formData.append("additional_information", JSON.stringify(additionalInfo));

      await axios.put(
        `${Config.update_product_details}/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      getProductDetails();
      onUpdateDetailsModalClose();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  // 🔁 Render text groups
  const renderGroup = (label, items, setter) => (
    <Box mb={4}>
      <Text fontWeight="600" mb={2}>
        {label}
      </Text>

      {items.map((item, index) => (
        <HStack key={index} mb={2}>
          <Input
            value={item.name}
            placeholder={`Enter ${label}`}
            onChange={(e) => updateItem(setter, index, e.target.value)}
          />
          <IconButton
            icon={<DeleteIcon />}
            size="sm"
            onClick={() => removeItem(setter, index)}
          />
        </HStack>
      ))}

      <Button size="sm" onClick={() => addItem(setter)}>
        + Add {label}
      </Button>
    </Box>
  );

  return (
    <Modal
      isOpen={isUpdateDetailsModalOpen}
      onClose={onUpdateDetailsModalClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Existing images */}
          <Text fontWeight="600" mb={2}>
            Existing Images
          </Text>
          <HStack spacing={3} mb={4}>
            {existing?.images?.map((img, i) => (
              <Image key={i} src={img.src} boxSize="60px" objectFit="contain" />
            ))}
          </HStack>

          {/* Upload */}
          <Input
            type="file"
            id="detailImages"
            multiple
            accept="image/*"
            display="none"
            onChange={handleImageUpload}
          />

          <Box
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={6}
            cursor="pointer"
            _hover={{ borderColor: "blue.400" }}
            onClick={() => document.getElementById("detailImages").click()}
          >
            {preview ? (
              <Image src={preview} maxH="160px" mx="auto" />
            ) : (
              <>
                <FiUploadCloud size={40} color="#4299E1" />
                <Text mt={2} fontSize="sm" color="#4299E1">
                  Drop your image here or{" "}
                  <Text as="span" color="blue.500" fontWeight="bold">
                    click to browse
                  </Text>
                </Text>
              </>
            )}
          </Box>

          {/* Preview */}
          <HStack spacing={3} mt={4} wrap="wrap">
            {images.map((img, i) => (
              <Box key={i} position="relative">
                <Image src={img.preview} boxSize="70px" objectFit="contain" />
                <IconButton
                  icon={<DeleteIcon />}
                  size="xs"
                  position="absolute"
                  top="1"
                  right="1"
                  colorScheme="red"
                  onClick={() => removeImage(i)}
                />
              </Box>
            ))}
          </HStack>

          {/* Text Sections */}
          {renderGroup("Product Overview", productOverview, setProductOverview)}
          {renderGroup("Key Features & Benefits", keyFeatures, setKeyFeatures)}
          {renderGroup("Expert Advice", expertAdvice, setExpertAdvice)}
          {renderGroup(
            "Additional Information",
            additionalInfo,
            setAdditionalInfo
          )}

          <Button
            colorScheme="blue"
            width="100%"
            mt={4}
            onClick={handleUpdateProductDetails}
          >
            Update Details
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDetailsModal;
