"use client";
import { apiCall } from '@/utils/apiHelper';
import * as React from 'react';

interface ITicketDetailProps {
    params:{ slug: string; slug2: string }
}

const TicketDetail: React.FunctionComponent<ITicketDetailProps> = (props) => {
    const getTicketDetail = async () => {
        try {
            const {slug, slug2} = await props.params
            const response = await apiCall.get(`/events/${slug}/transaction/${slug2}`);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getTicketDetail()
    },[])
  return (
    <div className='pt-20'>
        <h1>Ticket Detail</h1>
    </div>
  )
};

export default TicketDetail;
