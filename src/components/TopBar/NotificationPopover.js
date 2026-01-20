import {
  Box,
  Flex,
  Text,
  Badge,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const NotificationPopover = () => {
  const notifications = [
    {
      id: 1,
      title: "Order Placed",
      message: "Your order #1234 has been placed successfully",
      type: "success",
      isRead: false,
      createdAt: "2 mins ago",
    },
    {
      id: 2,
      title: "Payment Failed",
      message: "Payment failed for order #9876",
      type: "error",
      isRead: true,
      createdAt: "1 hour ago",
    },
  ];

  const notificationStyle = {
    success: { color: "green.500" },
    error: { color: "red.500" },
    warning: { color: "orange.400" },
    info: { color: "blue.500" },
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          fontSize="22px"
          color="gray.600"
          aria-label="Notifications"
        />
      </PopoverTrigger>

      <PopoverContent w="350px" boxShadow="lg">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontWeight="bold" mb={3}>
            Notifications
          </Text>

          <Stack spacing={3} maxH="350px" overflowY="auto">
            {notifications.length > 0 ? (
              notifications.map((item) => {
                const style = notificationStyle[item.type];
                return (
                  <Box
                    key={item.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    bg={item.isRead ? "gray.50" : "blue.50"}
                  >
                    <Flex justify="space-between">
                      <Text fontWeight="semibold" color={style.color}>
                        {item.title}
                      </Text>
                      {!item.isRead && (
                        <Badge colorScheme="blue">New</Badge>
                      )}
                    </Flex>

                    <Text fontSize="sm">{item.message}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {item.createdAt}
                    </Text>
                  </Box>
                );
              })
            ) : (
              <Text textAlign="center" color="gray.400">
                No notifications
              </Text>
            )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
