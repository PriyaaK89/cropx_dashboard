import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box,
  Textarea,
  Image,
  useToast,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";
import { FiUploadCloud } from "react-icons/fi";
import { useColorModeValue } from "@chakra-ui/react";

const CollectionFormModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [showInMenu, setShowInMenu] = useState("");
  const [homeOrder, setHomeOrder] = useState("");
  const [showOnHome, setShowOnHome] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const bgColor = useColorModeValue("#2664a7", "#1E293B");
  const textColor = useColorModeValue("white", "gray.100");

  const toast = useToast();

  /* ================= IMAGE HANDLER ================= */

  const handleImage = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
      setPreview(URL.createObjectURL(img));
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!title || !slug || !image) {
      toast({
        title: "Title, Slug and Image are required",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("show_in_menu", showInMenu);
    formData.append("home_order", homeOrder);
    formData.append("show_on_home", showOnHome);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        Config.create_collections,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast({
          title: "Collection Created Successfully",
          status: "success",
          duration: 2000,
        });

        // reset form
        setTitle("");
        setSlug("");
        setDescription("");
        setShowInMenu("");
        setHomeOrder("");
        setShowOnHome("");
        setImage(null);
        setPreview(null);
        onClose();
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
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
        <Flex bg={bgColor} color={textColor} px="16px" py="5px" justifyContent="space-between" algin="center" borderTopRadius="md">
             <Text fontWeight="medium">Create Collection</Text>
        <ModalCloseButton position="static" />
        </Flex>
       

        <ModalBody>
          <SimpleGrid columns={2} spacing={4}>
            <FormControl mb="4px" gridColumn="span 2" >
              <FormLabel fontSize="12px" fontWeight="medium">
                Title
              </FormLabel>
              <Input
                fontSize="12px"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="12px" fontWeight="medium">
                Slug
              </FormLabel>
              <Input
                fontSize="12px"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Enter slug"
              />
            </FormControl>
            <FormControl mb="4px">
              <FormLabel fontSize="12px" fontWeight="medium">
                Home Order
              </FormLabel>
              <Input
                fontSize="12px"
                type="number"
                value={homeOrder}
                onChange={(e) => setHomeOrder(e.target.value)}
                placeholder="1, 2, 3..."
              />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="12px" fontWeight="medium">
                Show In Menu
              </FormLabel>
              <Select
                fontSize="12px"
                value={showInMenu}
                onChange={(e) => setShowInMenu(Number(e.target.value))}
                placeholder="Select option"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl>

            

            <FormControl mb="4px">
              <FormLabel fontSize="12px" fontWeight="medium">
                Show On Home
              </FormLabel>
              <Select
                fontSize="12px"
                value={showOnHome}
                onChange={(e) => setShowOnHome(Number(e.target.value))}
                placeholder="Select option"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl >
             <FormControl mb="4px" gridColumn="span 2">
              <FormLabel fontSize="12px" fontWeight="medium">
                Description
              </FormLabel>
              <Textarea
                fontSize="12px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </FormControl>

            {/* IMAGE */}
            <FormControl mb="4px" gridColumn="span 2">
              <FormLabel fontSize="12px" fontWeight="medium">
                Image
              </FormLabel>
              <Box
                border="2px dashed"
                borderColor="gray.400"
                borderRadius="md"
                p={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                 _hover={{bgColor:"#6dabee"}}
                onClick={() =>
                  document.getElementById("collectionImage").click()
                }
              >
                {preview ? (
                  <Image src={preview} maxH="160px" objectFit="contain" />
                ) : (
                  <>
                    <FiUploadCloud size={40} color="#4299E1" />
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Click to upload image
                    </Text>
                  </>
                )}

                <Input
                  type="file"
                  id="collectionImage"
                  display="none"
                  accept="image/*"
                  onChange={handleImage}
                />
              </Box>
            </FormControl>

           
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost"  mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
          bgColor="#4c9aee" 
          color={textColor}
          onClick={handleSubmit}
            isLoading={loading}
             _hover={{bgColor:"#2664a7"}}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionFormModal;
