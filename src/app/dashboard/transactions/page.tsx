import DashboardTransactionsView from '@/view/dashboard/transactions/page';
import * as React from 'react';

interface IEventPageProps {
}

const EventPage: React.FunctionComponent<IEventPageProps> = (props) => {
  return (
    <div className='px-10 py-20'>
        <DashboardTransactionsView />
    </div>
  )
};

export default EventPage;
