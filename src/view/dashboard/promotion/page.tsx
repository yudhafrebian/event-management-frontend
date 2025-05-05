"use client";
import EventNameSelector from "@/components/selector/EventName";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { apiCall } from "@/utils/apiHelper";
import { createVoucherSchema } from "@/utils/schemas/createVoucherSchema";
import { Form, Formik, FormikProps } from "formik";
import { values } from "lodash";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IPromotionViewProps {}

interface iFormValue {
  code: string;
  start_date: Date;
  end_date: Date;
  disc_amount: number;
  quota: number;
  event_name: string;
}

const PromotionView: React.FunctionComponent<IPromotionViewProps> = (props) => {
  const createVoucher = async (values: iFormValue) => {
    try {
      const token = localStorage.getItem("tkn");
      const response = await apiCall.post(
        "/vouchers/create",
        {
          code: values.code,
          start_date: new Date(values.start_date),
          end_date: new Date(values.end_date),
          disc_amount: values.disc_amount,
          quota: values.quota,
          event_name: values.event_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Voucher created successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="font-bold text-2xl">Promotion</h1>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer" type="button">
              Create Voucher <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Voucher</DialogTitle>
              <DialogDescription>
                Make a limited discount voucher for your event
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={{
                code: "",
                start_date: new Date(),
                end_date: new Date(),
                disc_amount: 0,
                quota: 0,
                event_name: "",
              }}
              validationSchema={createVoucherSchema}
              onSubmit={(values) => {
                console.log(values), createVoucher(values);
              }}
            >
              {(props: FormikProps<iFormValue>) => {
                const { errors, touched, handleChange } = props;

                return (
                  <Form>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="event">Event</Label>
                      <EventNameSelector name="event_name" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="code">Code</Label>
                      <Input
                        name="code"
                        placeholder="Input unique code"
                        onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        name="start_date"
                        type="date"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        name="end_date"
                        type="date"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="disc_amount">Discount Amount</Label>
                      <Input
                        name="disc_amount"
                        type="number"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="quota">Quota</Label>
                      <Input
                        name="quota"
                        type="number"
                        onChange={handleChange}
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </Form>
                );
              }}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PromotionView;
