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
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Config } from "../../../utils/Config";
import ImageUpload from "./ImageUpload";

// ---------------------- ARRAY INPUT BLOCK ----------------------
const ArrayInputBlock = ({ title, list, setter }) => {
  const handleChange = (index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index].name = value;
      return updated;
    });
  };

  const handleAdd = () => {
    setter((prev) => [...prev, { id: Date.now(), name: "" }]);
  };

  const handleRemove = (index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box mb={5} p={3} border="1px solid #e2e8f0" rounded="lg">
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        {title}
      </Text>

      {list.map((item, index) => (
        <Flex key={item.id} mb={3} align="center">
          <Input
            placeholder={`Enter ${title}`}
            value={item.name}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <IconButton
            ml={2}
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            onClick={() => handleRemove(index)}
          />
        </Flex>
      ))}

      <Button
        leftIcon={<AddIcon />}
        size="sm"
        colorScheme="blue"
        onClick={handleAdd}
      >
        Add
      </Button>
    </Box>
  );
};

// ---------------------- MAIN MODAL ----------------------
const AddDetailsModal = ({ isOpen, onClose, productId, getProductDetails }) => {
  const toast = useToast();

  const [images, setImages] = useState([]);

  const [productOverview, setProductOverview] = useState([{ id: 1, name: "" }]);
  const [keyFeatures, setKeyFeatures] = useState([{ id: 2, name: "" }]);
  const [expertAdvice, setExpertAdvice] = useState([{ id: 3, name: "" }]);
  const [additionalInfo, setAdditionalInfo] = useState([{ id: 4, name: "" }]);

  // 🔁 RESET FORM WHEN MODAL CLOSES
  useEffect(() => {
    if (!isOpen) {
      setImages([]);
      setProductOverview([{ id: 1, name: "" }]);
      setKeyFeatures([{ id: 2, name: "" }]);
      setExpertAdvice([{ id: 3, name: "" }]);
      setAdditionalInfo([{ id: 4, name: "" }]);
    }
  }, [isOpen]);

  // ---------------------- API CALL ----------------------
  const handleAddDetails = async () => {
    //  BASIC VALIDATION
    if (!productOverview[0].name.trim()) {
      toast({ title: "Product overview required", status: "warning" });
      return;
    }

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    const clean = (arr) => arr.filter(i => i.name.trim());

    formData.append("product_overview", JSON.stringify(clean(productOverview)));
    formData.append("key_features_and_benefits", JSON.stringify(clean(keyFeatures)));
    formData.append("expert_advice", JSON.stringify(clean(expertAdvice)));
    formData.append("additional_information", JSON.stringify(clean(additionalInfo)));

    try {
      const res = await axios.post(
        `${Config.add_product_details}/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast({ title: "Details added successfully!", status: "success" });
      getProductDetails();
      onClose();
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to add details", status: "error" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product Details</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          {/* IMAGE UPLOAD */}
          <ImageUpload images={images} setImages={setImages} toast={toast} />

          <ArrayInputBlock
            title="Product Overview"
            list={productOverview}
            setter={setProductOverview}
          />

          <ArrayInputBlock
            title="Key Features & Benefits"
            list={keyFeatures}
            setter={setKeyFeatures}
          />

          <ArrayInputBlock
            title="Expert Advice"
            list={expertAdvice}
            setter={setExpertAdvice}
          />

          <ArrayInputBlock
            title="Additional Information"
            list={additionalInfo}
            setter={setAdditionalInfo}
          />

          <Flex justify="flex-end" mt={5}>
            <Button colorScheme="blue" onClick={handleAddDetails}>
              Save Details
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddDetailsModal;
