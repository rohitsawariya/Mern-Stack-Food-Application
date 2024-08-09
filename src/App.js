import './App.css';
import Home from './screens/Home';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Navbar from './components/Navbar';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Footer from './components/Footer';


function App() {
  return (
    <CartProvider>
   <Router>
    <div>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={ <Home/>}/>
        <Route exact path="/login" element={ <Login/>}/> 
        <Route exact path="/createuser" element={ <Signup/>}/>
        <Route exact path="/myOrder" element={ <MyOrder/>}/>
      </Routes>
      <Footer/>
      </div>
   </Router>

    </CartProvider>
  );
}

export default App;





