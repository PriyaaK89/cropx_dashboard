import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Image,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../../utils/Config";

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

  const toast = useToast();

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
        Config?.create_collections,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast({
          title: "Collection Created Successfully",
          status: "success",
          duration: 2000,
        });

        // reset + close modal
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
        <ModalHeader>Create Collection</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={2} spacing={4} width="100%">

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Your Title" />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Slug</FormLabel>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)}
               placeholder=" Enter Your Slug"
               />
            </FormControl>

            

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Show In Menu</FormLabel>
              <Input
                value={showInMenu}
                onChange={(e) => setShowInMenu(e.target.value)}
                placeholder="Enter 0 or 1"
              />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Home Order</FormLabel>
              <Input
                type="number"
                value={homeOrder}
                onChange={(e) => setHomeOrder(e.target.value)}
                placeholder="Enter 0 or 1"
              />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Show On Home</FormLabel>
              <Input
                value={showOnHome}
                onChange={(e) => setShowOnHome(e.target.value)}
                placeholder="Enter 0 or 1"
              />
            </FormControl>
            

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Image</FormLabel>
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </FormControl>

            {preview && (
              <Image src={preview} boxSize="120px" rounded="md" />
            )}
            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Your Description"

              />
            </FormControl>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionFormModal;
