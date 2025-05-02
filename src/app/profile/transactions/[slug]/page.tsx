"use client";
import CardPayment from "@/components/card/cardPayment";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/utils/apiHelper";
import { useEffect, useState } from "react";

interface IPaymentPageProps {
  params: Promise<{ slug: string }>;
}

interface IDetail {
  transaction: {
    id: number;
    user_id: number;
    expired_date: Date;
    expired_hours: Date;
    invoice_id: string;
    status: string;
    created_at: Date;
    events: {
      id: number;
      title: string;
      description: string;
      location: string;
      start_date: Date;
      end_date: Date;
      event_picture: string;
      organizer_id: number;
    };
    transaction_detail: {
      id: number;
      ticket_id: number;
      price: number;
      ticket_types: {
        type_name: string;
      };
    }[];
  };
  totalPrice: number;
  ticketSummary: {
    ticket_id: number;
    type_name: string;
    quantity: number;
  }[];
}

const PaymentPage: React.FunctionComponent<IPaymentPageProps> = (props) => {
  const [detail, setDetail] = useState<IDetail | null>(null);

  const getPaymentDetail = async () => {
    try {
      const paymentId = await props.params;
      const response = await apiCall.get(`/transactions/${paymentId.slug}`);

      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentDetail();
  }, []);

  return (
    <main className="py-48 px-96 flex justify-center">
      <CardPayment
        title={detail?.transaction.events.title || ""}
        order_summary={
          detail?.ticketSummary.map((item) => ({
            type_name: `${item.type_name} x ${item.quantity}`,
            price:
              item.quantity *
              (detail?.transaction.transaction_detail.find(
                (d) => d.ticket_id === item.ticket_id
              )?.price || 0),
          })) || []
        }
        total_price={detail?.totalPrice || 0}
        invoice_id={detail?.transaction.invoice_id || ""}
        status={detail?.transaction.status || ""}
        tranasaction_date={detail?.transaction.created_at || new Date()}
        expired_hours={detail?.transaction.expired_hours || new Date()}
      />
    </main>
  );
};

export default PaymentPage;
