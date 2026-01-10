import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  Image,
  useToast,
  SimpleGrid,
  Select,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { FiUploadCloud } from "react-icons/fi";

const UpdateCollectionModal = ({
  isOpen,
  onClose,
  editData,
  fetchCollections,
}) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [showInMenu, setShowInMenu] = useState("");
  const [homeOrder, setHomeOrder] = useState("");
  const [showOnHome, setShowOnHome] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(editData?.id, "SelectedData");
  const toast = useToast();
  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };
  const handleResetImage = () => {
    setPreview("");
    setFile(null);
    const input = document.getElementById("productImage");
    if (input) input.value = "";
  };
  // prefill data
  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setSlug(editData.slug);
      setDescription(editData.description);
      setShowInMenu(Number(editData.show_in_menu));
      setHomeOrder(editData.home_order);
      setShowOnHome(Number(editData.show_on_home));
      setPreview(editData.image);
    }
  }, [editData]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("show_in_menu", showInMenu);
    formData.append("home_order", homeOrder);
    formData.append("show_on_home", showOnHome);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${Config?.update_collections}/${editData?.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast({
          title: "Collection Updated Successfully",
          status: "success",
          duration: 2000,
        });
        fetchCollections();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex bg="green.500" color="white" px="16px" py="5px" justifyContent="space-between" alignItems="center" borderTopRadius="md">
          <Text fontWeight="bold">Update Collection</Text>
        <ModalCloseButton position="static" />
        </Flex>
        

        <ModalBody>
          <SimpleGrid columns={2} spacing={4} width="100%">
            <GridItem colSpan={2}>
              <FormControl mb="4px">
                <FormLabel fontSize="14px" fontWeight="bold">
                  Title
                </FormLabel>
                <Input
                  fontSize="14px"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">
                Slug
              </FormLabel>
              <Input
                fontSize="14px"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">
                Home Order
              </FormLabel>
              <Input
                fontSize="14px"
                type="number"
                value={homeOrder}
                onChange={(e) => setHomeOrder(e.target.value)}
              />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">
                Show In Menu
              </FormLabel>
              <Select
                fontSize="14px"
                value={showInMenu}
                onChange={(e) => setShowInMenu(Number(e.target.value))}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">
                Show On Home
              </FormLabel>
              <Select
                fontSize="14px"
                value={showOnHome}
                onChange={(e) => setShowOnHome(Number(e.target.value))}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl>
            <GridItem colSpan={2}>
              <FormControl mb="4px">
                <FormLabel fontSize="14px" fontWeight="bold">
                  Description
                </FormLabel>
                <Textarea
                  fontSize="14px"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl mb="4px">
                <FormLabel fontSize="14px" fontWeight="bold">
                  Image
                </FormLabel>
                <Input
                  type="file"
                  id="productImage"
                  display="none"
                  accept="image/*"
                  onChange={handleImage}
                />

                <Box
                  border="2px dashed"
                  p={4}
                  borderColor="gray.300"
                  borderRadius="md"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  position="relative"
                  _hover={{ borderColor: "blue.400" }}
                  onClick={() =>
                    !preview && document.getElementById("productImage").click()
                  }
                >
                  {preview ? (
                    <>
                      <Image src={preview} maxH="160px" mx="auto" />
                      <Button
                        size="sm"
                        colorScheme="red"
                        position="absolute"
                        bottom={0}
                        left="50%"
                        transform="translate(-50%, -50%)"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetImage();
                        }}
                      >
                        Reset Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <FiUploadCloud size={40} color="#4299E1" />
                      <Text mt={2}>Click to upload image</Text>
                    </>
                  )}
                </Box>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button bgColor="green.500" _hover={{bgColor:"green.600"}} color="white" onClick={handleUpdate} isLoading={loading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCollectionModal;
