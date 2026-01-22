import {
  Box,
  Flex,
  Text,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Avatar,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const NotificationPopover = () => {
  const notifications = [
    {
      id: 1,
      name: "John Doe",
      message: "has submitted a leave request for July 25–27",
      time: "July 16, 2024 | 09:00 PM",
      isRead: false,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael Brown",
      message: "contract is up for renewal on July 21, 2024",
      time: "July 16, 2024 | 05:10 PM",
      isRead: false,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Emily Davis",
      message: "has set up a meeting for July 20, 2024 at 3:00 PM",
      time: "July 16, 2024 | 03:47 PM",
      isRead: true,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          fontSize="22px"
          position="relative"
          aria-label="Notifications"
        >
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="6px"
              right="6px"
              bg="red.500"
              borderRadius="full"
              w="8px"
              h="8px"
            />
          )}
        </IconButton>
      </PopoverTrigger>

      <PopoverContent w="420px" boxShadow="xl" borderRadius="lg">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody p={0}>
          {/* Header */}
          <Box p={4}>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="600">
                Notifications
              </Text>
              <Text fontSize="sm" color="blue.500" cursor="pointer">
                Mark all as read
              </Text>
            </Flex>

            <Flex mt={2} gap={4} fontSize="sm">
              <Text fontWeight="600">All</Text>
              <Text color="gray.500">Unread ({unreadCount})</Text>
            </Flex>
          </Box>

          <Divider />

          {/* Notification List */}
          <Stack maxH="400px" overflowY="auto" spacing={0}>
            {notifications.map((item) => (
              <Box
                key={item.id}
                p={4}
                bg={item.isRead ? "white" : "gray.50"}
                _hover={{ bg: "gray.100" }}
              >
                <Flex align="flex-start" gap={3}>
                  <Avatar size="sm" src={item.avatar} />

                  <Box flex="1">
                    <Text fontSize="sm">
                      <Text as="span" fontWeight="600">
                        {item.name}
                      </Text>{" "}
                      {item.message}
                    </Text>

                    <Text fontSize="xs" color="gray.500" mt={1}>
                      {item.time}
                    </Text>
                  </Box>

                  {!item.isRead && (
                    <Box
                      w="8px"
                      h="8px"
                      bg="red.500"
                      borderRadius="full"
                      mt={2}
                    />
                  )}
                </Flex>
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
