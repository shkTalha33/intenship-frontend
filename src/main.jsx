import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import ProductContextProvider from "./context/productContext.jsx"
import FilterContextProvider from "./context/FilterContext.jsx";
import CartContextProvider from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter >
     <AuthContextProvider>
      <ProductContextProvider>
        <FilterContextProvider>
          <CartContextProvider>
              <App />
          </CartContextProvider>
        </FilterContextProvider>
      </ProductContextProvider>
     </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
