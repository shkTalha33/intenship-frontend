import React from 'react';
import CardFour from '../../../components/DashboardCompoenets/CardFour.jsx';
import CardOne from '../../../components/DashboardCompoenets/CardOne.jsx';
import CardThree from '../../../components/DashboardCompoenets/CardThree.jsx';
import CardTwo from '../../../components/DashboardCompoenets/CardTwo.jsx';
import ChartOne from '../../../components/DashboardCompoenets/ChartOne.jsx';
import ChartTwo from '../../../components/DashboardCompoenets/ChartTwo.jsx';

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default ECommerce;
