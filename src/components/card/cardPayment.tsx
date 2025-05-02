"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Form, Formik } from "formik";
import { paymentProofSchema } from "@/utils/schemas/paymentProofSchema";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface ICardPaymentProps {
  invoice_id: string;
  tranasaction_date: Date;
  expired_hours: Date;
  status: string;
  title: string;
  order_summary: {
    type_name: string;
    price: number;
  }[];
  total_price: number;
}

interface iFormValue {
  payment_proof: any;
}

const CardPayment: React.FunctionComponent<ICardPaymentProps> = (props) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<any>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expireTime = new Date(props.expired_hours).getTime();
      const diff = expireTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
  }, [props.expired_hours]);

  const handleSubmit = async (values: iFormValue) => {
    try {
      const token = localStorage.getItem("tkn");
      const formData = new FormData();
      if (!values.payment_proof) {
        throw "Please upload an image";
      }

      formData.append("payment_proof", values.payment_proof);
      const response = await apiCall.patch(
        `/transactions/payment/${props.invoice_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Payment proof uploaded successfully");
      router.replace("/profile/transactions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-3/4">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-center mb-4">
          Transaction Payment
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p>Invoice ID</p>
            <p>{props.invoice_id}</p>
          </div>
          <div className="flex justify-between">
            <p>Transaction Date</p>
            <p>{format(props.tranasaction_date, "Pp")}</p>
          </div>
          <div className="flex justify-between">
            <p>Event Name</p>
            <p>{props.title}</p>
          </div>
          <div className="flex justify-between">
            <p>Transaction Status</p>
            <p
              className={`${
                props.status === "Pending"
                  ? "text-orange-500 border-orange-500"
                  : props.status === "Rejected" ||
                    props.status === "Canceled" ||
                    props.status === "Expired"
                  ? "text-red-500 border-red-500"
                  : props.status === "Confirmating"
                  ? "text-primary border-primary"
                  : "text-green-500 border-green-500"
              } text-sm`}
            >
              {props.status}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div>
          {props.status === "Pending" && (
            <div className="text-center">
              <p className="font-bold text-xl">Time Left</p>
              <p className="font-bold text-2xl text-primary">
                {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
              </p>
            </div>
          )}
          <h4 className="font-bold text-xl my-4">Order Summary</h4>
          <div className="bg-[#F5F3FF] p-4 rounded-xl">
            {props.order_summary.map((item, index) => (
              <div className="flex justify-between mb-2" key={index}>
                <p className="font-bold">{item.type_name}</p>
                <p className="font-bold">
                  {item.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between mt-2 font-bold">
              <p>Total Price</p>
              <p>
                {props.total_price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
          <Formik
            initialValues={{ payment_proof: null }}
            validationSchema={paymentProofSchema}
            onSubmit={(values) => {
              console.log(values), handleSubmit(values);
            }}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="flex flex-col gap-2 mt-6">
                <Label htmlFor="payment_proof" className="font-bold text-xl">
                  Payment Proof Upload
                </Label>
                <Input
                  type="file"
                  name="payment_proof"
                  onChange={(e) =>
                    setFieldValue("payment_proof", e.target.files?.[0])
                  }
                  disabled={props.status !== "Pending"}
                />
                {touched.payment_proof && errors.payment_proof && (
                  <p className="text-red-500 text-sm">{errors.payment_proof}</p>
                )}
                <div className="flex justify-end gap-4 mt-4">
                  {props.status === "Pending" ? (
                    <Button type="submit" className="cursor-pointer">
                      Upload
                    </Button>
                  ) : (
                    props.status === "Rejected" ||
                    props.status === "Canceled" ||
                    (props.status === "Expired" ? (
                      <Button
                        type="button"
                        className="cursor-pointer"
                        onClick={() =>
                          toast.error(
                            "Your Transactions Is Not Valid Anymore",
                            {
                              description:
                                "Please Make New Transaction For This Event",
                            }
                          )
                        }
                      >
                        Upload
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="cursor-pointer"
                        onClick={() =>
                          toast.info("Payment proof already uploaded", {
                            description:
                              "Please wait for organizer to confirm your payment",
                          })
                        }
                      >
                        Upload
                      </Button>
                    ))
                  )}
                  <Button className="cursor-pointer bg-destructive hover:bg-destructive/80" onClick={() => router.back()}>
                    Back
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPayment;
