"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiCall } from "@/utils/apiHelper";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EyeIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export type transactionColumn = {
  id: string;
  invoice_id: string;
  created_at: string;
  total_price: any;
  status: string;
  event_name: string;
  detail: string;
  payment_proof: string;
};

export const columns: ColumnDef<transactionColumn>[] = [
  {
    accessorKey: "invoice_id",
    header: "Invoice ID",
  },
  {
    accessorKey: "events.title",
    header: "Event Name",
  },
  {
    accessorKey: "created_at",
    header: "Transaction Date",
    cell: ({ row }) => {
      const transaction = row.original;
      return format(new Date(transaction.created_at), "PP");
    }
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => {
      const transaction = row.original;
      return transaction.total_price === 0 ? "Free" : transaction.total_price;
    },
  },
  {
    accessorKey: "payment_proof",
    id: "detail",
    header: "Detail",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <Link target="_blank" href={transaction.payment_proof}>
          <Button className="cursor-pointer" variant={"link"}>
            <EyeIcon />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div
          className={
            transaction.status === "Confirmating"
              ? "text-primary"
              : transaction.status === "Rejected"
              ? "text-red-600"
              : "text-green-600"
          }
        >
          {transaction.status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const updateStatus = async (newStatus: string) => {
        try {
          const token = localStorage.getItem("tkn");

          if (transaction.status === "Approved") {
            toast.error("Transaction already approved");
            return;
          } else if (transaction.status === "Rejected") {
            toast.error("Transaction already rejected");
            return;
          } else if (transaction.status === "Expired") {
            toast.error("Transaction already expired");
            return;
          } else {
            const res = await apiCall.patch(
              "/transactions/status",
              {
                transactionId: transaction.id,
                newStatus,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Status updated successfully");
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      };
      const [openDialogApprove, setOpenDialogApprove] = useState(false);
      const [openDialogReject, setOpenDialogReject] = useState(false);
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant={"link"}>
                <MoreHorizontal color="black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-green-600 cursor-pointer"
                onClick={() => setOpenDialogApprove(true)}
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenDialogReject(true)}
                className="text-red-600 cursor-pointer"
              >
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={openDialogApprove} onOpenChange={setOpenDialogApprove}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to approve this transaction?
                </DialogTitle>
                <DialogDescription>
                  Once you approve, you cannot undo this action!
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 justify-center">
                <Button
                className="cursor-pointer"
                  onClick={() => {
                    updateStatus("Approved");
                    setOpenDialogApprove(false);
                  }}
                >
                  Approve
                </Button>
                <DialogClose asChild>
                  <Button className="cursor-pointer" variant={"destructive"} >Cancel</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={openDialogReject} onOpenChange={setOpenDialogReject}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to reject this transaction?
                </DialogTitle>
                <DialogDescription>
                  Once you reject, you cannot undo this action!
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 justify-center">
                <Button
                className="cursor-pointer"
                  onClick={() => {
                    updateStatus("Rejected");
                    setOpenDialogReject(false);
                  }}
                >
                  Reject
                </Button>
                <DialogClose asChild>
                  <Button className="cursor-pointer" variant={"destructive"} >Cancel</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
