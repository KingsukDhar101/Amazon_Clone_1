import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import ContextWrapper from "./Context/ContextWrapper";
import CartPage from "./Components/CartPage";
import ProductPage from "./Components/ProductPage";

function App() {
  return (
    <ContextWrapper>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/api/product/:id" element={<ProductPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ContextWrapper>
  );
}

export default App;
