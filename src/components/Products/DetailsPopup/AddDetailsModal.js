import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Box, Button, Input, Text, IconButton, Flex, useToast,} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useState, useCallback } from "react";
import { Config } from "../../../utils/Config";
import ImageUpload from "./ImageUpload";


// ---------------------- REUSABLE COMPONENT (MOVED OUTSIDE) ----------------------
const ArrayInputBlock = ({ title, list, setter, keyName }) => {
  const handleChange = (index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index][keyName] = value;
      return updated;
    });
  };

  const handleAdd = () => {
    setter((prev) => [...prev, { id: Date.now(), [keyName]: "" }]);
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
        <Flex key={item.id} mb={3} alignItems="center">
          <Input
            placeholder={`Enter ${keyName}`}
            value={item[keyName]}
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



// ---------------------- MAIN MODAL COMPONENT ----------------------
const AddDetailsModal = ({ isOpen, onClose, productId, getProductDetails }) => {
  const toast = useToast();

  const [images, setImages] = useState([]);

  // Using unique IDs to prevent rerender cursor issues
  const [productOverview, setProductOverview] = useState([
    { id: Date.now() + 1, name: "" },
  ]);
  const [keyFeatures, setKeyFeatures] = useState([
    { id: Date.now() + 2, name: "" },
  ]);
  const [expertAdvice, setExpertAdvice] = useState([
    { id: Date.now() + 3, name: "" },
  ]);
  const [additionalInfo, setAdditionalInfo] = useState([
    { id: Date.now() + 4, name: "" },
  ]);

  // ---------------------- API CALL ----------------------
const handleAddDetails = async () => {
  const formData = new FormData();

  // ---------------------- APPEND IMAGES ----------------------
  images.forEach((img) => {
    formData.append("images", img.file);  // raw file
  });

  // ---------------------- STRINGIFY ARRAY FIELDS ----------------------
  const clean = (arr) => arr.map((item) => ({ name: item.name }));

  formData.append("product_overview", JSON.stringify(clean(productOverview)));
  formData.append("key_features_and_benefits", JSON.stringify(clean(keyFeatures)));
  formData.append("expert_advice", JSON.stringify(clean(expertAdvice)));
  formData.append("additional_information", JSON.stringify(clean(additionalInfo)));

  try {
    const res = await axios.post(
      `${Config.add_product_details}/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200 || res.status === 201) {
      toast({ title: "Details added successfully!", status: "success" });
      getProductDetails()
      onClose();
    }
  } catch (error) {
    console.log(error);
    toast({ title: "Failed to add details.", status: "error" });
  }
};



  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product Details</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          {/* IMAGE UPLOAD SECTION */}
          <ImageUpload images={images} setImages={setImages} toast={toast} />

          {/* REPEATED FIELDS */}
          <ArrayInputBlock
            title="Product Overview"
            list={productOverview}
            setter={setProductOverview}
            keyName="name"
          />

          <ArrayInputBlock
            title="Key Features & Benefits"
            list={keyFeatures}
            setter={setKeyFeatures}
            keyName="name"
          />

          <ArrayInputBlock
            title="Expert Advice"
            list={expertAdvice}
            setter={setExpertAdvice}
            keyName="name"
          />

          <ArrayInputBlock
            title="Additional Information"
            list={additionalInfo}
            setter={setAdditionalInfo}
            keyName="name"
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
