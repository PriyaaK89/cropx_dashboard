import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './components/Context/AuthContext';
import Categories from './pages/Categories';
import AddCategory from './components/Categories/AddCategory';
import Products from './pages/Products';
import AddProduct from './components/Products/AddProduct';
import ViewProduct from './components/Products/ViewProduct';
import Banner from './pages/Banners';
import UpdateProduct from './components/Products/UpdateProduct';
import ProductDetails from './components/Products/ProductDetails';
import Users from './pages/Users';
import Order from './pages/Order';
import AddProduct2 from './components/Products/AddProduct2';
import Collection from './pages/Collection';
function App() {
  return (
    <>
    <ChakraProvider>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/categories-list' element={<Categories/>}/>
          <Route path='/add-category' element={<AddCategory/>}/>
          <Route path='/product-list' element={<Products/>}/>
          <Route path='/add-product' element={<AddProduct2/>}/>
          <Route path='/product/:id' element={<ViewProduct/>}/>
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
          <Route path='/banner' element={<Banner/>}/>
          <Route path='/update-product/:id' element={<UpdateProduct/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/collection' element={<Collection/>}/>

        </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
    </>
  );
}

export default App;
