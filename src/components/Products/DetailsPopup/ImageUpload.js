import React, { useCallback } from "react";
import {
  Box,
  Text,
  Input,
  Flex,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiUploadCloud } from "react-icons/fi";

const ImageUpload = React.memo(({ images, setImages, toast }) => {

  const handleImageUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);

      if (images.length + files.length > 4) {
        toast({
          title: "You can upload only 4 images.",
          status: "warning",
          position: "top",
        });
        return;
      }

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [
            ...prev,
            {
              file: file,
              src: reader.result,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images, setImages, toast]
  );

  const handleRemove = useCallback(
    (index) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    },
    [setImages]
  );

  return (
    <Box mb={5} p={3} border="1px solid #e2e8f0" rounded="lg">
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        Upload Images (Max 4)
      </Text>

      <Input
        type="file"
        accept="image/*"
        id="addImages"
        multiple
        display="none"
        onChange={handleImageUpload}
      />

      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={6}
        textAlign="center"
        cursor="pointer"
        _hover={{ borderColor: "blue.400" }}
        onClick={() => document.getElementById("addImages").click()}
      >
        {images.length > 0 ? (
          <Image
            src={images[0].src}
            mx="auto"
            maxH="160px"
            objectFit="contain"
          />
        ) : (
          <>
            <FiUploadCloud size={40} color="#4299E1" />
            <Text mt={2} fontSize="sm" color="#4299E1">
              Drop your image here or{" "}
              <Text as="span" color="blue.500" fontWeight="bold">
                click to browse
              </Text>
            </Text>
          </>
        )}
      </Box>

      <Flex mt={3} wrap="wrap" gap={3}>
        {images.map((img, index) => (
          <Box key={index} position="relative">
            <Image
              src={img.src}
              boxSize="80px"
              objectFit="cover"
              rounded="md"
              border="1px solid #ccc"
            />

            <IconButton
              icon={<DeleteIcon />}
              size="xs"
              colorScheme="red"
              position="absolute"
              top="0"
              right="0"
              onClick={() => handleRemove(index)}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
});

export default ImageUpload;
