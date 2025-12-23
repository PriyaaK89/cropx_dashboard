import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Config } from "../../utils/Config";

const UpdateSingleVariantModal = ({
  isUpdateSinglePackVariantOpen,
  onUpdateSinglePackVariantClose,
  productId,
  variantID,
  fetchDetails,
  variants,
}) => {
  console.log(variants, "variants");
  const toast = useToast();

  const [formData, setFormData] = useState({
    product_id: productId,
    product_type: "",
    quantity_type: "",
    quantity_value: "",
    actual_price: "",
    discount_percent: "",
    stock_qty: ""
  });

  // Prefill using your variantID data

  useEffect(() => {
    if (variantID && variants?.single_packs?.length > 0) {
      const selectedVariant = variants.single_packs.find(
        (v) => v.variant_id === variantID
      );

      if (selectedVariant) {
        setFormData({
          product_id: selectedVariant.product_id,
          product_type:
            selectedVariant.base_quantity_type === "kg" ||
            selectedVariant.base_quantity_type === "gm"
              ? "solid"
              : "liquid",
          quantity_type: selectedVariant.base_quantity_type,
          quantity_value: selectedVariant.base_quantity_value,
          actual_price: selectedVariant.total_actual_price,
          discount_percent: selectedVariant.discount_percent,
            stock_qty: selectedVariant.stock_qty //  Backend value
        });
      }
    }
  }, [variantID, variants]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "product_type") {
      setFormData((prev) => ({
        ...prev,
        product_type: value,
        quantity_type: "", // reset old value
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSingleVariant = async () => {
    try {
      const response = await axios.put(
        `${Config?.update_sinlge_variant}/${variantID}`,
        formData
      );
      if(response?.status === 200){
          toast({
        title: "Variant Updated Successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      if (fetchDetails) fetchDetails();
      onUpdateSinglePackVariantClose();
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Error updating variant",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isUpdateSinglePackVariantOpen}
      onClose={onUpdateSinglePackVariantClose}
      size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Single Variant</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* PRODUCT TYPE */}
          <FormControl mb="3">
            <FormLabel>Product Type</FormLabel>
            <Select
              name="product_type"
              value={formData.product_type}
              onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="solid">Solid</option>
              <option value="liquid">Liquid</option>
            </Select>
          </FormControl>
          {/* STOCK QUANTITY */}
           <FormControl mb="3">
  <FormLabel>Stock Quantity</FormLabel>
  <Input
    type="number"
    name="stock_qty"
    value={formData.stock_qty}
    onChange={handleChange}
  />
</FormControl>


          {/* QUANTITY TYPE */}
          <FormControl mb="3">
            <FormLabel>Quantity Type</FormLabel>

            <Select
              name="quantity_type"
              value={formData.quantity_type}
              onChange={handleChange}
              isDisabled={!formData.product_type}>
              <option value="">
                {formData.product_type ? "Select" : "Select product type first"}
              </option>

              {formData.product_type === "solid" && (
                <>
                  <option value="kg">KG</option>
                  <option value="gm">GM</option>
                </>
              )}

              {formData.product_type === "liquid" && (
                <>
                  <option value="ltr">LTR</option>
                  <option value="ml">ML</option>
                </>
              )}
            </Select>
          </FormControl>

          {/* QUANTITY VALUE */}
          <FormControl mb="3">
            <FormLabel>Quantity Value</FormLabel>
            <Input
              type="number"
              name="quantity_value"
              value={formData.quantity_value}
              onChange={handleChange}
            />
          </FormControl>

          {/* ACTUAL PRICE */}
          <FormControl mb="3">
            <FormLabel>Actual Price</FormLabel>
            <Input
              type="number"
              name="actual_price"
              value={formData.actual_price}
              onChange={handleChange}
            />
          </FormControl>

          {/* DISCOUNT PERCENT */}
          <FormControl mb="3">
            <FormLabel>Discount %</FormLabel>
            <Input
              type="number"
              name="discount_percent"
              value={formData.discount_percent}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onUpdateSinglePackVariantClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" ml={3} onClick={handleUpdateSingleVariant}>
            Update Variant
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSingleVariantModal;
