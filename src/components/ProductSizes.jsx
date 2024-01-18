import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFilterContext } from "../context/FilterContext";

export default function ProductSizes() {
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { dispatch } = useFilterContext();

  const handleSizes = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };


  const selectedSizeApi = () => {
    axios
    .get(`${import.meta.env.VITE_APP_BASE_URL}/items/size?sizes=${selectedSizes}`)
    .then((res) => {
      const sizes = res.data.message;
      dispatch({ type: "FILTRATION_ON_SIZES", payload: { sizes } });
    })
    .catch((err) => {
      console.error(err);
    });
  }

const allSizeApi = () => { 
  axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/items/allsizes`)
  .then((res) => {
    setSizes(res.data.message);
  })
  .catch((err) => {
    console.error(err);
  });
}

  useEffect(() => {
    allSizeApi()
    selectedSizeApi()
  }, [selectedSizes]);


  return (
    <>
      {sizes.map((size) => (
        <div
          key={size}
          style={{border:"1px solid #52796f"}}
          className={`boxes  cursor-pointer p-2 my-2 ${
            selectedSizes.includes(size) ? "bg-[#285850] text-white" : ""
          }`}
          onClick={() => handleSizes(size)}
        >
          {size}
        </div>
      ))}
    </>
  );
}
