import React, { useEffect, useState } from "react";
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

const UpdateCollectionModal = ({ isOpen, onClose, editData, fetchCollections }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [showInMenu, setShowInMenu] = useState("");
  const [homeOrder, setHomeOrder] = useState("");
  const [showOnHome, setShowOnHome] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
console.log(editData?.id, "SelectedData")
  const toast = useToast();

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
        <ModalHeader>Update Collection</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={2} spacing={4} width="100%">
            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Slug</FormLabel>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Show In Menu</FormLabel>
              <Select  value={showInMenu} 
               onChange={(e)=> setShowInMenu(Number(e.target.value))}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Home Order</FormLabel>
              <Input type="number" value={homeOrder} onChange={(e) => setHomeOrder(e.target.value)} />
            </FormControl>

            <FormControl mb="4px">
              <FormLabel fontSize="14px" fontWeight="bold">Show On Home</FormLabel>
             <Select  value={showOnHome} onChange={(e)=> setShowOnHome(Number(e.target.value))}
             >
               <option value={1}>Yes</option>
                <option value={0}>No</option>
             </Select>
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
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={handleUpdate} isLoading={loading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCollectionModal;
