import * as React from 'react';
import DashboardPage from './dashboard/page';

interface IDashboardrops {
}

const Dashboard: React.FunctionComponent<IDashboardrops> = (props) => {
  return (
    <div className='py-20'>
        <DashboardPage/>
    </div>
  )
};

export default Dashboard;
