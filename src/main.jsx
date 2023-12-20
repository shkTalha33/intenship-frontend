import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import ProductContextProvider from "./context/productContext.jsx"
import FilterContextProvider from "./context/FilterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
     <AuthContextProvider>
      <ProductContextProvider>
        <FilterContextProvider>
         <App />
        </FilterContextProvider>
      </ProductContextProvider>
     </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
