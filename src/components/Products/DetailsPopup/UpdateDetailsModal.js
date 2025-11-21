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
  VStack,
  HStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { Config } from "../../../utils/Config";

const UpdateDetailsModal = ({
  isUpdateDetailsModalOpen,
  onUpdateDetailsModalClose,
  productId,
  data,getProductDetails
}) => {

  const existing = data?.details;

  const [images, setImages] = useState([]);
  const [productOverview, setProductOverview] = useState(existing?.product_overview || []);
  const [keyFeatures, setKeyFeatures] = useState(existing?.key_features_and_benefits || []);
  const [expertAdvice, setExpertAdvice] = useState(existing?.expert_advice || []);
  const [additionalInfo, setAdditionalInfo] = useState(existing?.additional_information || []);

  React.useEffect(() => {
  if (data?.details) {
    const existing = data.details;

    setProductOverview(existing.product_overview || []);
    setKeyFeatures(existing.key_features_and_benefits || []);
    setExpertAdvice(existing.expert_advice || []);
    setAdditionalInfo(existing.additional_information || []);
  }
}, [data, isUpdateDetailsModalOpen]);
  // ---------------------- IMAGE UPLOAD ----------------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...mapped]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------------- ADD TEXT ITEM ----------------------
  const addItem = (setter) => {
    setter((prev) => [...prev, { name: "" }]);
  };

  const updateItem = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index].name = value;
      return updated;
    });
  };

  const removeItem = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------------- API CALL ----------------------
  const handleUpdateProductDetails = async () => {
    try {
      const formData = new FormData();

      // images
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      formData.append("product_overview", JSON.stringify(productOverview));
      formData.append("key_features_and_benefits", JSON.stringify(keyFeatures));
      formData.append("expert_advice", JSON.stringify(expertAdvice));
      formData.append("additional_information", JSON.stringify(additionalInfo));

      const response = await axios.put(
        `${Config.update_product_details}/${productId}`,
        formData
      );

      console.log(response.data);
      onUpdateDetailsModalClose();
      getProductDetails();

    } catch (error) {
      console.log(error, "Error updating product details");
    }
  };

  // ---------------------- RENDER INPUT GROUP ----------------------
  const renderGroup = (label, items, setter) => (
    <Box mb={4}>
      <Text fontWeight={"600"} mb={2}>{label}</Text>

      {items.map((item, index) => (
        <HStack key={index} mb={2}>
          <Input
            placeholder={`Enter ${label}`}
            value={item.name}
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
    <Modal isOpen={isUpdateDetailsModalOpen} onClose={onUpdateDetailsModalClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          {/* EXISTING IMAGES DISPLAY */}
          <Text fontWeight="600" mb={2}>Existing Images</Text>
          <HStack spacing={3} mb={4}>
            {existing?.images?.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                boxSize="60px"
                borderRadius={6}
                objectFit="contain"
              />
            ))}
          </HStack>

          {/* UPLOAD NEW IMAGES */}
          <Text fontWeight="600" mb={2}>Upload New Images</Text>

          <Input type="file" multiple onChange={handleImageUpload} mb={3} />

          <HStack spacing={3} mb={4}>
            {images.map((img, i) => (
              <Box key={i} position="relative">
                <Image
                  src={img.preview}
                  boxSize="60px"
                  borderRadius={6}
                  objectFit="contain"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size="xs"
                  position="absolute"
                  top="0"
                  right="0"
                  onClick={() => removeImage(i)}
                />
              </Box>
            ))}
          </HStack>

          {/* INPUT GROUPS */}
          {renderGroup("Product Overview", productOverview, setProductOverview)}
          {renderGroup("Key Features & Benefits", keyFeatures, setKeyFeatures)}
          {renderGroup("Expert Advice", expertAdvice, setExpertAdvice)}
          {renderGroup("Additional Information", additionalInfo, setAdditionalInfo)}

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
