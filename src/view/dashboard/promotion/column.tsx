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
import { set } from "lodash";
import {
  ArrowUpDown,
  EyeIcon,
  MoreHorizontal,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type transactionColumn = {
  id: string;
  invoice_id: string;
  start_date: string;
  end_date: string;
  code: string;
  quota: number;
  detail: string;
  payment_proof: string;
};

export const columns: ColumnDef<transactionColumn>[] = [
  {
    accessorKey: "events.title",
    header: "Event Name",
  },
  {
    accessorKey: "code",
    header: "Voucher Code",
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transaction = row.original;
      return format(new Date(transaction.start_date), "P");
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transaction = row.original;
      return format(new Date(transaction.end_date), "P");
    },
  },
  {
    accessorKey: "quota",
    id: "quota",
    header: "Quota",
    cell: ({ row }) => {
      const transaction = row.original;
      return transaction.quota > 0 ? (
        <div>{transaction.quota}</div>
      ) : (
        <div className="text-destructive">Out of Stock</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const voucher = row.original;
      const deleteVoucher = async () => {
        try {
          const token = localStorage.getItem("tkn");
          const response = await apiCall.delete(
            `/vouchers/delete/${voucher.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Voucher deleted successfully");
          window.location.reload();
        setOpen(false);
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <>
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash2Icon />
          </Button>
          <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this voucher?</DialogTitle>
                <DialogDescription>
                  Once you delete, you cannot undo this action!
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 justify-center">
                <Button className="cursor-pointer" variant={"destructive"} onClick={() => deleteVoucher()}>
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button className="cursor-pointer" variant={"outline2"}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
