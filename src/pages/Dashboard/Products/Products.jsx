import React from 'react';
import Breadcrumb from '../../../components/DashboardCompoenets/Breadcrumb';
import ShowProducts from '../../../components/DashboardCompoenets/ShowProducts';
import "./_table.scss"
const Products = () => {
  return (
    <>
      <Breadcrumb destination="Dashboard /"  pageName="Products" />

      <div className="flex flex-col gap-10">
        <ShowProducts />
      </div>
    </>
  );
};

export default Products;
