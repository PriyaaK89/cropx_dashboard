import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalFooter, Flex,Text, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, useToast, VStack} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { useColorModeValue } from "@chakra-ui/react";


const SinglePackVarientModal = ({ isOpen, onClose, productId, productType, fetchDetails }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue("#2664a7", "#1E293B");
   const textColor = useColorModeValue("white","gray.100");
   const bgHover = useColorModeValue("#1e6abb", "#172336");

  const quantityOptions = productType === "solid" ? ["gm", "kg"] : productType === "liquid" ? ["ml", "liter"] : [];

  const [formData, setFormData] = useState({
    stock_qty: "",
    quantity_type: "",
    quantity_value: "",
    actual_price: "",
    discount_percent: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitVariant = async () => {
    try {
      setLoading(true);
      await axios.post(`${Config?.add_single_variant}`, {
        product_id: productId,
        ...formData,
      });

      toast({
        title: "Variant added successfully!",
        status: "success",
        duration: 2000,
      });

      onClose();
      fetchDetails()
    } catch {
      toast({
        title: "Failed to add variant",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent> 
        <Flex bg={bgColor} color={textColor} px="16px" py="5px" justify="space-between" align="center" borderTopRadius="md">
          <Text fontWeight="bold">Add Variant</Text>
          <ModalCloseButton position="static" />
        </Flex>
        <ModalBody>
          <VStack spacing={5} mt={2} className="modal-stack">
            <FormControl>
              <FormLabel fontWeight="600" color="gray.700">Stock Quantity</FormLabel>
              <Input
                type="number"
                name="stock_qty"
                placeholder="Enter Stock quantity"
                value={formData.stock_qty}
                onChange={handleChange}
                borderRadius="lg"
                size='sm'
                focusBorderColor="blue.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="600" color="gray.700">Quantity Type</FormLabel>
              <Select
                placeholder="Select quantity type"
                name="quantity_type"
                value={formData.quantity_type}
                onChange={handleChange}
                focusBorderColor="blue.400"
                borderRadius="lg"
                size='sm'
              >
                {quantityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="600" color="gray.700">Quantity Value</FormLabel>
              <Input
                type="number"
                name="quantity_value"
                placeholder="Enter quantity"
                value={formData.quantity_value}
                onChange={handleChange}
                size='sm'
                focusBorderColor="blue.400"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="600" color="gray.700">Actual Price</FormLabel>
              <Input
                type="number"
                name="actual_price"
                placeholder="Enter price"
                value={formData.actual_price}
                onChange={handleChange}
                borderRadius="lg"
                focusBorderColor="blue.400"
                size='sm'
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="600" color="gray.700">Discount %</FormLabel>
              <Input
                type="number"
                name="discount_percent"
                placeholder="Enter discount percentage"
                value={formData.discount_percent}
                onChange={handleChange}
                borderRadius="lg"
                focusBorderColor="blue.400"
                size='sm'
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid #f1f1f1" mt={4}>
          <Button
           bgColor={bgColor}
            color={textColor}
            borderRadius="lg"
            _hover={{bgColor:bgHover}}
            isLoading={loading}
            onClick={submitVariant}
            mx="auto"
          >
            Save Variant
          </Button> 
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SinglePackVarientModal;
