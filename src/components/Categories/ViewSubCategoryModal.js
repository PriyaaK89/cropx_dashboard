import { Box, Flex, Text, Button, Spinner, IconButton } from "@chakra-ui/react";
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

  // ✅ Hooks ALWAYS at top (eslint fix)
  const [childMap, setChildMap] = useState({});
  const [childLoading, setChildLoading] = useState({});

  // ✅ fetch child categories
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

  // ✅ delete child category
  const deleteChildCategory = async (id, subId) => {
    try {
      await axios.delete(`${Config.delete_child_category}/${id}`);

      setChildMap((prev) => ({
        ...prev,
        [subId]: prev[subId].filter((c) => c.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Conditional return AFTER hooks (eslint rule)
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
    >
      <Box bg="white" p={4} borderRadius="md" minW="350px">
        <Flex justify="space-between" mb={3}>
          <Text fontWeight="bold">View Sub Categories</Text>
          <Button size="sm" onClick={onClose}>
            X
          </Button>
        </Flex>

        {loading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : subCategories.length === 0 ? (
          <Text>No sub categories found</Text>
        ) : (
          subCategories.map((sub) => (
            <Box key={sub.id} mb={3} border="1px solid #eee" borderRadius="md">

              {/* SUB CATEGORY ROW */}
              <Flex
                p={2}
                align="center"
                justify="space-between"
                bg="gray.50"
              >
                <Text fontWeight={500}>{sub.name}</Text>

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

              {/* CHILD CATEGORY LIST */}
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
      </Box>
    </Box>
  );
};

export default ViewSubCategoryModal;
