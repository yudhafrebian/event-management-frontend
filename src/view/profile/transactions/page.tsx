"use client";
import CardTransactionList from "@/components/card/cardTransactionList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { apiCall } from "@/utils/apiHelper";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ITransactionsViewProps {}

const TransactionsView: React.FunctionComponent<ITransactionsViewProps> = (
  props
) => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(5);

  const getAllTransactions = async (page = 1) => {
    const token = localStorage.getItem("tkn");
    try {
      const response = await apiCall.get(
        `/transactions/list?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.data);
      setTotalPage(response.data.pagination.totalPages);
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
    });
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
    getAllTransactions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-24">
      <div>
        <h1 className="font-bold text-3xl">Your Transactions</h1>
      </div>
      <div className="flex flex-col gap-4 mt-4">{printTransactionsList()}</div>
      {totalPage > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {currentPage > 3 && (
              <PaginationItem >
                <PaginationLink onClick={() => handlePageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {Array.from({ length: totalPage }, (_, i) => i + 1).filter((page) => Math.abs(currentPage - page) <= 2).map((page) => (
              <PaginationItem key={page}  className="cursor-pointer">
                <PaginationLink
                isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? "bg-primary text-white" : ""}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPage - 3 && (
            <PaginationItem >
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage < totalPage - 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(totalPage)}>
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem  className="cursor-pointer">
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TransactionsView;
