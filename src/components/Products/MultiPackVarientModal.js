import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  VStack,
  useToast,
  Flex,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Config } from "../../utils/Config";
import { useColorModeValue } from "@chakra-ui/react";

const MultiPackVariantModal = ({
  isMultiVariantOpen, onMultiVariantClose, productId, variantID, fetchDetails }) => {
  const toast = useToast();

 const [formData, setFormData] = useState({
  pack_quantity: "",
  unit_price: "",
  discount_percentage: "",
});
 const bgColor = useColorModeValue("#2664a7", "#1E293B");
    const textColor = useColorModeValue("white","gray.100");
    const bgHover = useColorModeValue("#1e6abb", "#172336");

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit API
  const handleSubmit = async () => {
    if (!formData.pack_quantity || !formData.unit_price || !formData.discount_percentage) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    try {
      const payload = {
        product_id: productId,
        variant_id: variantID,
        pack_quantity: Number(formData.pack_quantity),
        unit_price: Number(formData.unit_price),
        discount_percentage: Number(formData.discount_percentage),
      };

      const res = await axios.post(
        `${Config?.add_multi_variant}`,
        payload
      );
    if(res?.status === 201){
 toast({
        title: "Multi Pack Added Successfully!",
        status: "success",
        duration: 2000,
      });

      setFormData({
        pack_quantity: "",
        unit_price: "",
        discount_percentage: "",
      });

      fetchDetails(); // Refresh UI
      onMultiVariantClose(); // Close modal
    }
     
    } catch (error) {
      console.log(error);
      toast({
        title: "Error adding multipack",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Modal isOpen={isMultiVariantOpen} onClose={onMultiVariantClose} isCentered>
      <ModalOverlay/>
      <ModalContent>
      <Flex bg={bgColor} color={textColor} px="16px" py="5px" justify="space-between" algin="center" borderTopRadius="md">
        <Text fontWeight="bold">
          Add Multi Pack Variant
        </Text>
        <ModalCloseButton position=
        "static" />
   </Flex>

        <ModalBody pb="20px">
          <VStack spacing="20px" mt="10px" className="modal-stack">

            {/* Pack Quantity */}
            <FormControl>
              <FormLabel fontSize="12px" fontWeight="600">Pack Quantity</FormLabel>
              <NumberInput
                min={1}
                value={formData.pack_quantity}
                onChange={(valueString, valueNumber) => handleChange("pack_quantity", valueNumber)} size='sm'
              >
                <NumberInputField placeholder="Enter number of packs"  />
              </NumberInput>
            </FormControl>

            {/* Unit Price */}
            <FormControl>
              <FormLabel fontSize="12px" fontWeight="600">Unit Price (₹)</FormLabel>
              <NumberInput min={1} value={formData.unit_price} onChange={(val) => handleChange("unit_price", val)} size='sm'>
                <NumberInputField placeholder="Enter price per pack" />
              </NumberInput>
            </FormControl>

            {/* Discount */}
            <FormControl>
              <FormLabel fontSize="12px" fontWeight="600">Discount (%)</FormLabel>
              <NumberInput min={0} max={90} value={formData.discount_percentage} onChange={(val) => handleChange("discount_percentage", val)} size='sm'>
                <NumberInputField placeholder="Enter discount %" />
              </NumberInput>
            </FormControl>

            {/* BUTTONS */}
            <Flex width="100%" justify="flex-end" gap="10px" mt="10px">
              <Button variant="outline" onClick={onMultiVariantClose}>
                Cancel
              </Button>

              <Button bgColor={bgColor} color={textColor} _hover={{bgColor:bgHover}} onClick={handleSubmit}>
                Add Multi Pack
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MultiPackVariantModal;
