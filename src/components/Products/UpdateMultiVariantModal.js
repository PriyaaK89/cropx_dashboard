import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../../utils/Config";

const UpdateMultiVariantModal = ({ isUpdateMultiVariantOpen, onUpdateMultiVariantClose,
  variantID, multiPackId, fetchDetails, variants,productId}) => {
    
  const toast = useToast();
  console.log(variantID, "variantIDin multipack")
  console.log(multiPackId, "multipackid multipack")

  const multiPackData =
    variants?.multi_packs?.find((mp) => mp.multipack_id === multiPackId) || {};

  const [packQuantity, setPackQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (multiPackData) {
      setPackQuantity(multiPackData.pack_quantity || "");
      setUnitPrice(multiPackData.total_actual_price / multiPackData.pack_quantity || "");
      setDiscount(multiPackData.discount_percentage || "");
    }
  }, [multiPackData]);

  const handleUpdateMultiPack = async () => {
    try {
      const payload = {
        product_id: productId,
        variant_id: variantID,
        pack_quantity: Number(packQuantity),
        unit_price: Number(unitPrice),
        discount_percentage: Number(discount),
      };

      const response = await axios.put(
        `${Config?.update_multi_variant}/${multiPackId}`,
        payload
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
        <ModalHeader>Update Multi-Pack Variant</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          {/* PACK QUANTITY */}
          <FormControl mb={3}>
            <FormLabel>Pack Quantity</FormLabel>
            <Input
              type="number"
              value={packQuantity}
              onChange={(e) => setPackQuantity(e.target.value)}
              placeholder="Enter pack quantity"
            />
          </FormControl>

          {/* UNIT PRICE */}
          <FormControl mb={3}>
            <FormLabel>Unit Price</FormLabel>
            <Input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              placeholder="Enter unit price"
            />
          </FormControl>

          {/* DISCOUNT PERCENTAGE */}
          <FormControl mb={3}>
            <FormLabel>Discount Percentage (%)</FormLabel>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount %"
            />
          </FormControl>

          <Button
            width="100%"
            colorScheme="blue"
            mt={4}
            onClick={handleUpdateMultiPack}
          >
            Update Multi-Pack
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMultiVariantModal;
