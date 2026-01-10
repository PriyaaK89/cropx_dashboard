import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../../utils/Config";

const UpdateMultiVariantModal = ({
  isUpdateMultiVariantOpen,
  onUpdateMultiVariantClose,
  variantID,
  multiPackId,
  fetchDetails,
  variants,
  productId,
}) => {
  console.log("multipack id ", multiPackId);

  const toast = useToast();
  console.log(variantID, "variantIDin multipack");
  console.log(multiPackId, "multipackid multipack");

  const [formData, setFormData] = useState({
    product_id: productId,
    variant_id: variantID,
    pack_quantity: "",
    unit_price: "",
    discount_percentage: "",
  });

  useEffect(() => {
    if (variantID && variants?.multi_packs?.length > 0) {
      const selectedVariant = variants.multi_packs.find(
        (v) => v.variant_id === variantID
      );

      if (selectedVariant) {
        setFormData({
          product_id: productId,
          variant_id: selectedVariant.variant_id,
          pack_quantity: selectedVariant.pack_quantity,
          unit_price: selectedVariant.actual_price,

          discount_percentage: selectedVariant.discount_percentage,
        });
      }
    }
  }, [variantID, variants, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pack_quantity" ? { unit_price: "" } : {}),
    }));
  };

  const handleUpdateMultiPack = async () => {
    try {
      const response = await axios.put(
        `${Config?.update_multi_variant}/${multiPackId}`,
        formData
      );

      if (response?.status === 200) {
        toast({
          title: "Multi Pack Updated Successfully!",
          status: "success",
          duration: 2500,
        });

        fetchDetails();
        onUpdateMultiVariantClose();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Update Failed!",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Modal
      isOpen={isUpdateMultiVariantOpen}
      onClose={onUpdateMultiVariantClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <Flex
          bg="#5c94cF"
          color="white"
          px="16px"
          py="5px"
          justify="space-between"
          algin="center"
          borderTopRadius="md"
        >
          <Text>Update Multi-Pack Variant</Text>
          <ModalCloseButton position="static" />
        </Flex>
        <ModalBody pb={5}>
          {/* PACK QUANTITY */}
          <FormControl mb="4px">
            <FormLabel fontSize="14px" fontWeight="bold">
              Pack Quantity
            </FormLabel>
            <Input
              fontSize="14px"
              type="number"
              name="pack_quantity"
              value={formData.pack_quantity}
              onChange={handleChange}
            />
          </FormControl>

          {/* UNIT PRICE */}
          <FormControl mb="4px">
            <FormLabel fontSize="14px" fontWeight="bold">
              Unit Price
            </FormLabel>
            <Input
              fontSize="14px"
              name="unit_Price"
              type="number"
              value={formData.unit_price}
              onChange={handleChange}
            />
          </FormControl>

          {/* DISCOUNT PERCENTAGE */}
          <FormControl mb="4px">
            <FormLabel fontSize="14px" fontWeight="bold">
              Discount Percentage (%)
            </FormLabel>
            <Input
              fontSize="14px"
              type="number"
              name="discount_percentage"
              value={formData.discount_percentage}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="#5c94cF"
            color="white"
            _hover={{ bgColor: "#2664a7" }}
            onClick={handleUpdateMultiPack}
            mx="auto"
          >
            Update Multi-Pack
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMultiVariantModal;
