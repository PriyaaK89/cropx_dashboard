import { Box, Text, Flex, Spinner } from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import axios from "axios";
import { Config } from "../../utils/Config";
import { useEffect, useState } from "react";
import BestSelling from "../ProductByType/BestSelling";

const ViewCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
  setLoading(true);
  try {
    const res = await axios.get(Config.products_child_category);
    setProducts(res.data.data || []);
  } catch (error) {
    console.log("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box width="100%" bg="#f8f8fb" pt={{ base: "60px", lg: 0 }}>
      <Flex>
        <Box display={{ base: "none", lg: "block" }}>
          <LeftSidebar />
        </Box>

        <Box
          width={{ base: "100%", lg: "calc(100% - 260px)" }}
          ml={{ base: 0, lg: "260px" }}
          px={{ base: 0, lg: 6 }}
          mb={5}
        >
          <Box display={{ base: "block", lg: "none" }}>
            <ResponsiveNavbar />
          </Box>

          <Box
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="0px"
            zIndex={100}
          >
            <TopBar />
          </Box>

          <Box
            bg="white"
            p={4}
            boxShadow="lg"
            borderRadius="0.75rem"
            mx={{ base: 3, lg: 0 }}
            mt={4}
          >
           {loading ? (
  <Flex justify="center" mt={10}>
    <Spinner size="xl" />
  </Flex>
) : products.length === 0 ? (
  <Text textAlign="center" mt={10}>
    No products found
  </Text>
) : (
  <Flex flexWrap="wrap" gap="2rem" justify="center">
    {products.map((p) => (
      <BestSelling
        key={p.id}
        p={p}
        cardBg="white"
        priceColor="green.600"
      />
    ))}
  </Flex>
)}

          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ViewCategory;
