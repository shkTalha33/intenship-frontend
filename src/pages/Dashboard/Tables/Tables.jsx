import React from 'react';
import Breadcrumb from '../../../components/DashboardCompoenets/Breadcrumb';
import TableOne from '../../../components/DashboardCompoenets/TableOne';
import TableThree from '../../../components/DashboardCompoenets/TableThree';
import TableTwo from '../../../components/DashboardCompoenets/TableTwo';
import "./_table.scss"
const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        {/* <TableOne /> */}
        {/* <TableThree /> */}
      </div>
    </>
  );
};

export default Tables;
