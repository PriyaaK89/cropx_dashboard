import { useState,useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Config } from "../../utils/Config";
import LeftSidebar from "../LeftSidebarLayout/LeftSidebar";
import TopBar from "../TopBar/TopBar";
  
const UpdateProduct = () => {
  const { id } = useParams();
  const toast = useToast();
const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  const [formData, setFormData] = useState({
    product_name: "",
    product_category: "",
    sub_category: "",
    child_category: "",
    brand: "",
    product_description: "",
    product_type: "",
    stock_qty: "",
    mfg_date: "",
    exp_date: "",
    product_img: null,
    previewImg: "",
  });

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0];
  };

  // 🔹 Fetch product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${Config.get_product_by_id}/${id}`
      );
      const p = res.data.product;

      setFormData({
        product_name: p.product_name || "",
        product_category: p.product_category || "",
        sub_category: p.sub_category || "",
        child_category: p.child_category || "",
        brand: p.brand || "",
        product_description: p.product_description || "",
        product_type: p.product_type || "",
        stock_qty: p.stock_qty || "",
        mfg_date: formatDate(p.mfg_date),
        exp_date: formatDate(p.exp_date),
        product_img: null,
        previewImg: p.product_img || "",
      });

      setProductLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to load product",
        status: "error",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // 🔹 Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      product_img: file,
      previewImg: URL.createObjectURL(file),
    });
  };

  // 🔹 Submit update
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();

      data.append("product_name", formData.product_name);
      data.append("product_category", formData.product_category);
      data.append("sub_category", formData.sub_category);
      data.append("child_category", formData.child_category);
      data.append("brand", formData.brand);
      data.append("product_description", formData.product_description);
      data.append("product_type", formData.product_type);
      data.append("stock_qty", formData.stock_qty);
      data.append("mfg_date", formData.mfg_date);
      data.append("exp_date", formData.exp_date);

      if (formData.product_img) {
        data.append("product_img", formData.product_img);
      }

      await axios.put(
        `${Config.update_product}/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Product updated successfully",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Update failed",
        status: "error",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  if (productLoading) {
    return (
      <Flex justify="center" mt="100px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
          <Box width="100%" backgroundColor="#f8f8fb" >
     
            <Box display="flex" justifyContent="space-between">
              <Box>
                   <LeftSidebar />
              </Box>

      <Box w="77.5%"  minH="100vh" pl="1rem" mr="1rem">
        <TopBar />

        <Box bgColor="white" mt={4} p={4} borderRadius="0.75rem" boxShadow="lg"
         
        >
          <Box fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
            Update Product
          </Box>
          <SimpleGrid columns={[1,1,2]} spacingY={4} spacingX={8}>

          <FormControl mb={1}>
            <FormLabel fontSize="12px">Product Name</FormLabel>
            <Input fontSize="12px" name="product_name" value={formData.product_name} onChange={handleChange} />
          </FormControl>

          <FormControl mb={1}>
            <FormLabel fontSize="12px">Product Category</FormLabel>
            <Input fontSize="12px" name="product_category" value={formData.product_category} onChange={handleChange} />
          </FormControl>

          <FormControl mb={1}>
            <FormLabel>Sub Category</FormLabel>
            <Input name="sub_category" value={formData.sub_category} onChange={handleChange} />
          </FormControl>

          <FormControl mb={1}>
            <FormLabel>Child Category</FormLabel>
            <Input name="child_category" value={formData.child_category} onChange={handleChange} />
          </FormControl>

          <FormControl mb={1}>
            <FormLabel>Brand</FormLabel>
            <Input name="brand" value={formData.brand} onChange={handleChange} />
          </FormControl>

          <FormControl mb={1}>
            <FormLabel>Description</FormLabel>
            <Textarea name="product_description" value={formData.product_description} onChange={handleChange} />
          </FormControl>

          <FormControl mb={1}>
            <FormLabel>Product Type</FormLabel>
            <Select name="product_type" value={formData.product_type} onChange={handleChange}>
              <option value="">Select type</option>
              <option value="solid">Solid</option>
              <option value="liquid">Liquid</option>
            </Select>
          </FormControl>

          <FormControl mb={1}>
            <FormLabel>Stock Qty</FormLabel>
            <Input type="number" name="stock_qty" value={formData.stock_qty} onChange={handleChange} />
          </FormControl>

          <Flex gap={4}>
            <FormControl mb={1}>
              <FormLabel>MFG Date</FormLabel>
              <Input type="date" name="mfg_date" value={formData.mfg_date} onChange={handleChange} />
            </FormControl>

            <FormControl mb={1}>
              <FormLabel>EXP Date</FormLabel>
              <Input type="date" name="exp_date" value={formData.exp_date} onChange={handleChange} />
            </FormControl>
          </Flex>

          <FormControl mb={1}>
            <FormLabel>Product Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormControl>
             </SimpleGrid>


          {formData.previewImg && (
            <Image src={formData.previewImg} h="150px" objectFit="cover" mb={4} />
          )}

          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Update Product
          </Button>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default UpdateProduct;
