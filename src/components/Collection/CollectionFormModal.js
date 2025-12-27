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
  Image,
  useToast,
  SimpleGrid,
  Select,
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
        <ModalHeader>Create Collection</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={2} spacing={4}>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="bold">Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="bold">Slug</FormLabel>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Enter slug"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="bold">Show In Menu</FormLabel>
              <Select
                placeholder="Select option"
                value={showInMenu}
                onChange={(e) => setShowInMenu(Number(e.target.value))}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="bold">Home Order</FormLabel>
              <Input
                type="number"
                value={homeOrder}
                onChange={(e) => setHomeOrder(e.target.value)}
                placeholder="Enter display order (1,2,3...)"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight="bold">Show On Home</FormLabel>
              <Select
                placeholder="Select option"
                value={showOnHome}
                onChange={(e) => setShowOnHome(Number(e.target.value))}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl>

            <FormControl>
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

            <FormControl gridColumn="span 2">
              <FormLabel fontSize="14px" fontWeight="bold">Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
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
