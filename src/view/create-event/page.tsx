"use client";
import { Formik, Form, FormikProps, FieldArray } from "formik";
import { createEventSchema } from "@/utils/schemas/createEventSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CategoriesSelector from "@/components/selector/Categories";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import LocationSelector from "@/components/selector/Location";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "sonner";

interface ICreateEventViewProps {}
interface IFormValue {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  category: string;
  event_image: File | null;
  ticket_types: {
    type_name: string;
    price: number;
    quota: number;
    description: string;
  }[];
}

const CreateEventView: React.FunctionComponent<ICreateEventViewProps> = (
  props
) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onBtSubmit = async (values: IFormValue) => {
    try {
      const token = localStorage.getItem("tkn");
      const formData = new FormData();
      if (!uploadFile) {
        throw "Please upload an image";
      }

      const startDate = new Date(values.start_date);
      const endDate = new Date(values.end_date);

      formData.append("event_picture", uploadFile);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", startDate.toISOString());
      formData.append("end_date", endDate.toISOString());
      formData.append("location", values.location);
      formData.append("category", values.category);
      formData.append("ticket_types", JSON.stringify(values.ticket_types));
      const response = await apiCall.post("/events/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Event created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="px-4 py-12 md:px-20 md:py-16 bg-[#F9FAFB]">
      <div className="py-8">
        <h1 className="font-bold text-3xl">Create New Event</h1>
        <p className="text-muted-foreground mt-3">
          Fill in the details below to create your event
        </p>
      </div>
      <div className="bg-white shadow p-6 rounded-xl">
        <Formik
          initialValues={{
            title: "",
            description: "",
            start_date: new Date(),
            end_date: new Date(),
            location: "",
            category: "",
            event_image: null as File | null,
            ticket_types: [
              {
                type_name: "",
                price: 0,
                quota: 0,
                description: "",
              },
            ],
          }}
          validationSchema={createEventSchema}
          onSubmit={(values) => {
            onBtSubmit(values);
          }}
        >
          {(props: FormikProps<IFormValue>) => (
            <>
              {(() => {
                const { errors, touched, handleChange } = props;
                return (
                  <Form>
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-4 w-1/2">
                        <h2 className="font-bold text-xl">Basic Detail</h2>
                        <div>
                          <Label
                            className="mb-1 font-medium text-sm text-[#374151]"
                            htmlFor="title"
                          >
                            Event Name
                          </Label>
                          <Input
                            id="title"
                            type="text"
                            placeholder="Enter Event Name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="w-1/2">
                            <Label
                              className="mb-1 font-medium text-sm text-[#374151]"
                              htmlFor="start_date"
                            >
                              Start Date
                            </Label>
                            <Input
                              id="start_date"
                              type="date"
                              placeholder="Start Date"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="w-1/2">
                            <Label
                              className="mb-1 font-medium text-sm text-[#374151]"
                              htmlFor="end_date"
                            >
                              End Date
                            </Label>
                            <Input
                              id="end_date"
                              type="date"
                              placeholder="End Date"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label
                              className="mb-1 font-medium text-sm text-[#374151]"
                              htmlFor="location"
                            >
                              Location
                            </Label>
                            <LocationSelector
                              name="location"
                              placeholder="Search Location"
                            />
                          </div>
                          <div>
                            <Label
                              className="mb-1 font-medium text-sm text-[#374151]"
                              htmlFor="category"
                            >
                              Category
                            </Label>
                            <CategoriesSelector
                              name="category"
                              placeholder="Search Category"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            className="mb-1 font-medium text-sm text-[#374151]"
                            htmlFor="description"
                          >
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your event"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label
                            className="mb-1 font-medium text-sm text-[#374151]"
                            htmlFor="event_image"
                          >
                            Picture Event
                          </Label>
                          <Input
                            id="event_image"
                            type="file"
                            onChange={(event) => {
                              handleFileChange(event);
                              handleChange(event);
                            }}
                            accept="image/*"
                          />
                          {imagePreview && (
                            <div className="relative w-full h-[300px] mt-3">
                              <Image fill src={imagePreview} alt="Preview" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 w-1/2">
                        <h2 className="font-bold text-xl">Ticket Details</h2>
                        <FieldArray name="ticket_types">
                          {({ push, remove, form }) => (
                            <div className="flex flex-col gap-4">
                              {form.values.ticket_types.map(
                                (ticket: any, index: number) => (
                                  <div
                                    key={index}
                                    className="bg-[#F9FAFB] p-4 rounded-md"
                                  >
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label
                                          className="mb-1 font-medium text-sm text-[#374151]"
                                          htmlFor={`ticket_types.${index}.type_name`}
                                        >
                                          Ticket Type
                                        </Label>
                                        <Input
                                          name={`ticket_types.${index}.type_name`}
                                          value={ticket.type_name}
                                          onChange={form.handleChange}
                                          placeholder="e.g., Regular"
                                        />
                                      </div>
                                      <div>
                                        <Label
                                          className="mb-1 font-medium text-sm text-[#374151]"
                                          htmlFor={`ticket_types.${index}.price`}
                                        >
                                          Price
                                        </Label>
                                        <div className="relative">
                                          <p className="absolute left-2 top-1/3 -translate-y-1/2">
                                            Rp.
                                          </p>
                                          <Input
                                            className="pl-8"
                                            name={`ticket_types.${index}.price`}
                                            value={ticket.price}
                                            onChange={form.handleChange}
                                            type="number"
                                            placeholder="0"
                                          />
                                          <p className="text-xs text-muted-foreground">
                                            *Fill with 0 if free
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                      <div>
                                        <Label
                                          className="mb-1 font-medium text-sm text-[#374151]"
                                          htmlFor={`ticket_types.${index}.description`}
                                        >
                                          Description
                                        </Label>
                                        <Textarea
                                          name={`ticket_types.${index}.description`}
                                          value={ticket.description}
                                          onChange={form.handleChange}
                                          placeholder="Describe your ticket"
                                        />
                                      </div>
                                      <div>
                                        <Label
                                          className="mb-1 font-medium text-sm text-[#374151]"
                                          htmlFor={`ticket_types.${index}.quota`}
                                        >
                                          Quota
                                        </Label>
                                        <Input
                                          name={`ticket_types.${index}.quota`}
                                          value={ticket.quota}
                                          onChange={form.handleChange}
                                          type="number"
                                          placeholder="0"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end">
                                      {index > 0 && (
                                        <Button
                                          type="button"
                                          onClick={() => remove(index)}
                                          variant={"destructive"}
                                          className="cursor-pointer"
                                        >
                                          Remove
                                          <Trash2Icon />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                              <div>
                                <Button
                                  type="button"
                                  variant={"link"}
                                  onClick={() =>
                                    push({
                                      type_name: "",
                                      price: 0,
                                      quota: 0,
                                      description: "",
                                    })
                                  }
                                  className="cursor-pointer font-semibold"
                                >
                                  + Add Another Ticket Type
                                </Button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            size={"lg"}
                            className="cursor-pointer"
                          >
                            Create Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              })()}
            </>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default CreateEventView;
