import { Box, Text, Flex, Spinner, Button } from "@chakra-ui/react";
import ResponsiveNavbar from "../TopBar/ResponsiveNavbar";
import TopBar from "../TopBar/TopBar";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import axios from "axios";
import { Config } from "../../utils/Config";
import { useEffect, useState } from "react";
import BestSelling from "../ProductByType/BestSelling";
import { useParams } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const ViewCategory = () => {
  // const { cate, slug } = useParams();
  const params = useParams();
  console.log("useParams:", params);

  const { cate, slug } = params;
   const bgColor = useColorModeValue("white", "#1E293B");
   const textColor = useColorModeValue("gray.800", "white");
    const pageBg = useColorModeValue("gray.50", "#0E1629");
    

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal ] = useState(0);
  const [totalPages, setTotalPages]= useState(1);
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${Config.Products_By_Slug}/${cate}/${slug}`,
        {
          params: {
            page,
            limit,
            sort,
            minPrice,
            maxPrice,
            rating,
            stock,
          },
        },
      );
      setProducts(res.data.data || []);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


 
  useEffect(() => {
    fetchProducts();
  }, [cate, slug, page, limit, sort, minPrice, maxPrice, rating, stock]);

  return (
    <Box width="100%" bg={pageBg} pt={{ base: "60px", lg: 0 }}>
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
            bg={bgColor}
            textColor={textColor}
            p={4}
            boxShadow="lg"
            borderRadius="0.75rem"
            mx={{ base: 3, lg: 0 }}
            mt={4}
          >
            <Flex
              mb={4}
              gap={4}
              flexWrap="wrap"
              align="center"
              justify="space-between"
            >
              <Flex gap={3} flexWrap="wrap">
                {/* Sort dropdown */}
                <select
                  style={{
                    padding: "8px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "6px",
                    minWidth: "160px",
                  }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="latest">Latest</option>
                  <option value="price_low_high">Price: Low → High</option>
                  <option value="price_high_low">Price: High → Low</option>
                  <option value="name_asc">Name A → Z</option>
                  <option value="name_desc">Name Z → A</option>
                </select>
                {/* Price DropDown */}
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setMinPrice("");
                      setMaxPrice("");
                    } else {
                      const [min, max] = value.split("-");
                      setMinPrice(min);
                      setMaxPrice(max);
                    }
                  }}
                  style={{
                    padding: "8px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "6px",
                    minWidth: "160px",
                  }}
                >
                  <option value="">Price Range</option>
                  <option value="0-500">₹0 – ₹500</option>
                  <option value="500-1000">₹500 – ₹1000</option>
                  <option value="1000-5000">₹1000 – ₹5000</option>
                  <option value="5000-10000">₹5000 – ₹10000</option>
                </select>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  style={{
                    padding: "8px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "6px",
                    minWidth: "160px",
                  }}
                >
                  <option value="">Rating</option>
                  <option value="4">4 ★ & above </option>
                  <option value="3">3 ★ & above </option>
                  <option value="2"> 2 ★ & above </option>
                </select>
                <select
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{
                    padding: "8px",
                    border: "1px solid #CBD5E0",
                    borderRadius: "6px",
                    minWidth: "160px",
                  }}
                >
                  <option value="">Stock</option>
                  <option value="in">In Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
              </Flex>
            </Flex>
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
                    cardBg={pageBg}
                    priceColor={textColor}
                  />
                ))}
              </Flex>
            )}
              <Flex
                mt={6}
                px={4}
                py={3}
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={3}
              >
                <Text fontSize="12px" color="gray.600">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, total)} of {total} entries
                </Text>
      
                <Flex gap={1}>
                  <Button
                    fontWeight="medium"
                    size="sm"
                    variant="outline"
                    isDisabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
      
                  {Array.from({ length: totalPages || 1 }).map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      colorScheme="blue"
                      variant={page === i + 1 ? "solid" : "outline"}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
      
                  <Button
                    size="sm"
                    fontWeight="medium"
                    variant="outline"
                    isDisabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </Flex>
                </Flex>
          </Box>
        </Box>
      </Flex>
    
    </Box>
  );
};

export default ViewCategory;
