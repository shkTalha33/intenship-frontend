import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./context/productContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <ProductContextProvider>
      <App />
     </ProductContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
