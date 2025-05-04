"use client";
import CardTransactionList from "@/components/card/cardTransactionList";
import { apiCall } from "@/utils/apiHelper";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ITransactionsViewProps {}

const TransactionsView: React.FunctionComponent<ITransactionsViewProps> = (
  props
) => {
  const [data, setData] = useState<any[]>([]);

  const getAllTransactions = async () => {
    const token = localStorage.getItem("tkn");
    try {
      const response = await apiCall.get("/transactions/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printTransactionsList = () => {
    const sortedData = data.sort((a: any, b: any) => {
      const dateA = new Date(a.transaction.created_at);
      const dateB = new Date(b.transaction.created_at);
      return dateB.getTime() - dateA.getTime();
    })
    return sortedData.length > 0 ? (
      sortedData.map((item) => (
        <CardTransactionList
          key={item.transaction.id}
          event_image={item.transaction.events.event_picture}
          event_name={item.transaction.events.title}
          invoice_id={item.transaction.invoice_id}
          transaction_date={item.transaction.created_at}
          total_price={item.transaction.total_price}
          status={item.transaction.status}
        />
      ))
    ) : (
      <div className="font-bold text-2xl flex flex-col justify-center items-center mt-10">
        <Image
          src={"/assets/undraw_empty_4zx0.png"}
          alt="no data"
          width={300}
          height={300}
        />
        <h1>No transactions found</h1>
      </div>
    );
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="p-24">
      <div>
        <h1 className="font-bold text-3xl">Your Transactions</h1>
      </div>
      <div className="flex flex-col gap-4 mt-4">{printTransactionsList()}</div>
    </div>
  );
};

export default TransactionsView;
