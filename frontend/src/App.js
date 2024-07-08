
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCatagory from './Pages/ShopCatagory';
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div >
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCatagory category="mens"/>}/>
        <Route path='/womens' element={<ShopCatagory category="womens"/>}/>
        <Route path='/kids' element={<ShopCatagory category="kids"/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='productId' element={<Product/>}/>
        <Route path='/cart' element ={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}></Route>
        
      </Routes>
      <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
