"use client"
import { apiCall } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { DataTable } from "./dataTable";
import { columns } from "./column";


interface IDashboardTransactionsViewProps {
}

const DashboardTransactionsView: React.FunctionComponent<IDashboardTransactionsViewProps> = (props) => {
  const [data, setData] = useState<any[]>([]);

  const getTransaction = async () => {
    try {
      const token = localStorage.getItem("tkn");
      const res = await apiCall.get("/transactions/organizer/list",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransaction();
  }, [])

  return (
    <div>
        <h1 className='font-bold text-2xl mb-8'>Transaction Page</h1>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
    </div>
  )
};

export default DashboardTransactionsView;
