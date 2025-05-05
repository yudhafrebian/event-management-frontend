import PromotionView from '@/view/dashboard/promotion/page';
import * as React from 'react';

interface IPromotionPageProps {
}

const PromotionPage: React.FunctionComponent<IPromotionPageProps> = (props) => {
  return (
    <div className='px-10 py-20'>
        <PromotionView />
    </div>
  )
};

export default PromotionPage;
