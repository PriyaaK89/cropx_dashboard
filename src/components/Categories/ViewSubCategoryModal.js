import {
  Box,
  Flex,
  Text,
  Button,
  Spinner,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Config } from "../../utils/Config";

const ViewSubCategoryModal = ({
  isOpen,
  onClose,
  loading,
  subCategories,
  onDeleteSubCategory,
}) => {
  //  Hooks always at top
  const [childMap, setChildMap] = useState({});
  const [childLoading, setChildLoading] = useState({});

  //  Dark / Light theme colors
  const headerBg = useColorModeValue("#2664a7", "#1E293B");
  const headerText = useColorModeValue("white", "gray.100");
  const bodyBg = useColorModeValue("white", "#0E1629");
  const rowBg = useColorModeValue("gray.50", "#1A202C");
  const textColor = useColorModeValue("gray.800", "gray.200");

  //  Fetch child categories
  const fetchChildCategories = async (subId) => {
    setChildLoading((prev) => ({ ...prev, [subId]: true }));

    try {
      const res = await axios.get(Config.get_child_category, {
        params: { sub_category_id: subId },
      });

      setChildMap((prev) => ({
        ...prev,
        [subId]: res?.data?.data || [],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setChildLoading((prev) => ({ ...prev, [subId]: false }));
    }
  };

  //  Delete child category
  const deleteChildCategory = async (id, subId) => {
    try {
      await axios.delete(`${Config.delete_child_category}/${id}`);

      setChildMap((prev) => ({
        ...prev,
        [subId]: prev[subId]?.filter((c) => c.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />

      <ModalContent bg={bodyBg}>
        {/* HEADER */}
        <Flex bg={headerBg} color={headerText} px="16px" py="5px" justify="space-between" algin="center" borderTopRadius="md">
                  <Text fontWeight="bold"> View Sub Category</Text>
                       <ModalCloseButton position="static" />
       </Flex>
        {/* BODY */}
        <ModalBody pb={4} color={textColor}>
          {loading ? (
            <Flex justify="center" py={4}>
              <Spinner />
            </Flex>
          ) : subCategories.length === 0 ? (
            <Text>No sub categories found</Text>
          ) : (
            subCategories.map((sub) => (
              <Box
                key={sub.id}
                mb={3}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                overflow="hidden"
              >
                {/* SUB CATEGORY */}
                <Flex
                  p={2}
                  align="center"
                  justify="space-between"
                  bg={rowBg}
                >
                  <Text fontWeight="600">{sub.name}</Text>

                  <Flex gap={2}>
                    <Button
                      size="xs"
                      onClick={() => fetchChildCategories(sub.id)}
                    >
                      View Child
                    </Button>

                    <IconButton
                      icon={<RiDeleteBin6Line />}
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Delete sub category"
                      onClick={() => onDeleteSubCategory(sub.id)}
                    />
                  </Flex>
                </Flex>

                {/* CHILD CATEGORIES */}
                {childLoading[sub.id] ? (
                  <Flex justify="center" py={2}>
                    <Spinner size="sm" />
                  </Flex>
                ) : (
                  childMap[sub.id]?.map((child) => (
                    <Flex
                      key={child.id}
                      pl={4}
                      pr={2}
                      py={1}
                      align="center"
                      justify="space-between"
                    >
                      <Text fontSize="sm">{child.name}</Text>
                      <IconButton
                        icon={<RiDeleteBin6Line />}
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Delete child category"
                        onClick={() =>
                          deleteChildCategory(child.id, sub.id)
                        }
                      />
                    </Flex>
                  ))
                )}
              </Box>
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewSubCategoryModal;
