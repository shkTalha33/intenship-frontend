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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/items/size?sizes=${selectedSizes}`)
      .then((res) => {
        const sizes = res.data.message;
        console.log(sizes)
        dispatch({ type: "FILTRATION_ON_SIZES", payload: { sizes } });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedSizes]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/items/allsizes")
      .then((res) => {
        setSizes(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {sizes.map((size) => (
        <div
          key={size}
          className={`boxes border cursor-pointer p-2 my-2 ${
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
