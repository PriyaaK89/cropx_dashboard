import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, useToast, VStack, Box} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";

const SinglePackVarientModal = ({ isOpen, onClose, productId, productType, fetchDetails }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

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
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(5px)" />

      <ModalContent bg="white" borderRadius="2xl" boxShadow="lg" p={1}
      >
        <ModalHeader
          fontSize="xl"
          fontWeight="700"
          borderBottom="1px solid #f1f1f1"
          pb={4}
        >
          Add Variant
        </ModalHeader>

        <ModalCloseButton />

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
                borderRadius="lg"
                size='sm'
                focusBorderColor="blue.400"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="600" color="gray.700">Actual Price</FormLabel>
              <Input
                type="number"
                name=""
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
            colorScheme="blue"
            w="full"
            borderRadius="lg"
            isLoading={loading}
            onClick={submitVariant}
          >
            Save Variant
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SinglePackVarientModal;
