import React, { useContext, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, FormControl, FormLabel, Text, Heading, useToast, VStack, InputRightElement, IconButton, InputGroup,} from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../utils/Config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";


const Login = () => {
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate()
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

 const userlogin = async () => {
  try {
    const response = await axios.post(`${Config?.Login_url}`, formdata);

    if (response.data.success) {

      // SAVE FULL DATA TO AUTH CONTEXT
      login({
        userId: response.data.userId,
        email: response.data.email,
        token: response.data.token,
        role: response.data.role,
      });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } else {
      toast({
        title: response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  } catch (error) {
    toast({
      title: "Login Failed",
      description: error.response?.data?.message || "Server Error",
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  }
};

  return (
    <Box bg={"linear-gradient(348deg, #2e686c, #008d9242)"} height="100vh">
      <Flex height="100%" justifyContent="center" alignItems="center" px={{base: 4 , md:0}}>
        <Box
          w={{base: "100%",sm: "90%", md:"420px", lg:"450px"}} bg="white" p={{base: 6, md:8}} borderRadius="1rem" boxShadow="2xl"
          border="1px solid #e2e8f0">
          <Heading size={{base:"md", md:"lg"}} textAlign="center" color="#2e686c">
            Welcome Back
          </Heading>
          <Text textAlign="center" mb="2rem" color="gray.600" fontSize={{base:"sm",md: "md"}}>
            Sign in to continue to your dashboard
          </Text>

          {/* Email */}
          <VStack>
            <FormControl mb="0.5rem">
              <FormLabel fontWeight="600" color="gray.700" mb="0px" fontSize="12px" ml="5px">
                Email Address
              </FormLabel>
              <Input
                name="email"
                value={formdata.email}
                onChange={handleChange}
                placeholder="Enter your email"
                size="sm"
                bg="gray.50"
                borderRadius="0.5rem"
              />
            </FormControl>

            {/* Password */}
            <FormControl mb="0.5rem">
              <FormLabel fontWeight="600" fontSize="12px" color="gray.700"
                mb="0px" ml="5px">
                Password
              </FormLabel>
              <InputGroup>
              <Input name="password" type={showPassword ? "text" : "password"}
                value={formdata.password} onChange={handleChange}
                placeholder="Enter your password" size="sm"
                bg="gray.50" borderRadius="0.5rem"/>
                <InputRightElement width="3rem">
                <IconButton backgroundColor="transparent" mb="8px" _hover={{height: '24px'}} onClick={()=> setShowPassword(!showPassword)} icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>} />
                </InputRightElement>
                </InputGroup>
            </FormControl>
          </VStack>
          <Box textAlign="right" mb="1.5rem"></Box>

          {/* Login Button */}
          <Button width="100%" size="sm"
            bg="#2e686c" color="white" _hover={{ bg: "#245357" }} borderRadius="0.5rem"
            mb="1rem" onClick={userlogin}>
            Sign In
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
