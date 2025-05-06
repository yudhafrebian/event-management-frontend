"use client";
import * as React from "react";
import { Formik, Form, FormikProps, FieldArray } from "formik";
import { createEventSchema } from "@/utils/schemas/createEventSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CategoriesSelector from "@/components/selector/Categories";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Image from "next/image";
import LocationSelector from "@/components/selector/Location";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "sonner";
import { format } from "date-fns";

interface IDashboardEventViewProps {
  params: Promise<{ slug: string }>;
}
interface IFormValue {
  id: number;
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

const DashboardEventView: React.FunctionComponent<IDashboardEventViewProps> = (
  props
) => {
  const [event, setEvent] = useState<IFormValue | null>(null);
  const getEventDetail = async () => {
    try {
      const eventName = await props.params;
      const response = await apiCall.get(`/events/${eventName.slug}`);
      console.log("event data", response.data.detail);

      setEvent(response.data.detail);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(event);

  useEffect(() => {
    getEventDetail();
  }, []);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    setIsModified(true);
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
      console.log(values);

      const token = localStorage.getItem("tkn");
      const formData = new FormData();

      // Append event ID
      if (event?.id) {
        formData.append("id", event.id.toString());
      }

      // Append file if uploaded
      if (uploadFile) {
        formData.append("event_picture", uploadFile);
      }

      // Append other fields
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", new Date(values.start_date).toISOString());
      formData.append("end_date", new Date(values.end_date).toISOString());
      formData.append("location", values.location);
      formData.append("category", values.category);
      formData.append("ticket_types", JSON.stringify(values.ticket_types));

      // Send data to the server
      const response = await apiCall.patch(
        `/events/update/${event?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event updated successfully");
      console.log("Response:", response.data);

      // Reset editing state
      setTypeEdit("text");
      setIsModified(false);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    }
  };

  const [typeEdit, setTypeEdit] = React.useState<string>("text");
  const [isModified, setIsModified] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = event.target;
    setIsModified(true); // Mark as modified when input changes
  };

  const onBtEdit = () => {
    if (typeEdit === "editting") {
      setTypeEdit("text");
      setIsModified(false); // Reset modification state when canceling
    } else if (typeEdit === "text") {
      setTypeEdit("editting");
    }
  };

  return (
    <main className="px-4 py-12 md:px-20 md:py-16 bg-[#F9FAFB]">
      <div className="py-8">
        <h1 className="font-bold text-3xl">Event Detail</h1>
        <p className="text-muted-foreground mt-3">
          Fill in the details below to create your event
        </p>
      </div>
      <div className="bg-white shadow p-6 rounded-xl">
        <Formik
          initialValues={{
            id: event?.id || 0, // Provide a default value if event is null
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
                        {typeEdit === "text" ? (
                          <>
                            <div>
                              <Label
                                className="mb-1 font-medium text-sm text-[#374151]"
                                htmlFor="title"
                              >
                                Event Name
                              </Label>
                              <div className="flex h-9 w-full min-w-0">
                                {event?.title}
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-1/2">
                                <Label
                                  className="mb-1 font-medium text-sm text-[#374151]"
                                  htmlFor="start_date"
                                >
                                  Start Date
                                </Label>
                                <div className="flex h-9 w-full min-w-0">
                                  {event?.start_date
                                    ? format(new Date(event.start_date), "P")
                                    : "N/A"}
                                </div>
                              </div>
                              <div className="w-1/2">
                                <Label
                                  className="mb-1 font-medium text-sm text-[#374151]"
                                  htmlFor="end_date"
                                >
                                  End Date
                                </Label>
                                <div className="flex h-9 w-full min-w-0">
                                  {event?.end_date
                                    ? format(new Date(event.end_date), "P")
                                    : "N/A"}
                                </div>
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
                                <div className="flex h-9 w-full min-w-0">
                                  {event?.location}
                                </div>
                              </div>
                              <div>
                                <Label
                                  className="mb-1 font-medium text-sm text-[#374151]"
                                  htmlFor="category"
                                >
                                  Category
                                </Label>
                                <div className="flex h-9 w-full min-w-0">
                                  {event?.category}
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label
                                className="mb-1 font-medium text-sm text-[#374151]"
                                htmlFor="description"
                              >
                                Description
                              </Label>
                              <div className="flex h-9 w-full min-w-0">
                                {event?.description}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
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
                                defaultValue={event?.title} // Default value from event data
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
                                  defaultValue={
                                    event?.start_date
                                      ? new Date(event.start_date)
                                          .toISOString()
                                          .split("T")[0]
                                      : ""
                                  } // Default value from event data
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
                                  defaultValue={
                                    event?.end_date
                                      ? new Date(event.end_date)
                                          .toISOString()
                                          .split("T")[0]
                                      : ""
                                  } // Default value from event data
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
                                defaultValue={event?.description} // Default value from event data
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
                                  <Image
                                    fill
                                    src={imagePreview}
                                    alt="Preview"
                                  />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-4 w-1/2">
                        <h2 className="font-bold text-xl">Ticket Details</h2>

                        {typeEdit === "text" ? (
                          <>
                            <div className="flex flex-col gap-4">
                              {event?.ticket_types.map(
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
                                        <div className="flex h-9 w-full min-w-0">
                                          {ticket.type_name}
                                        </div>
                                      </div>
                                      <div>
                                        <Label
                                          className="mb-1 font-medium text-sm text-[#374151]"
                                          htmlFor={`ticket_types.${index}.price`}
                                        >
                                          Price
                                        </Label>
                                        <div className="relative">
                                          <p className="absolute top-1/3 -translate-y-1/2 flex h-9 w-full min-w-0">
                                            Rp. {ticket.price}
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
                                        <div className="flex h-9 w-full min-w-0">
                                          {ticket.description}
                                        </div>
                                      </div>
                                      <div>
                                        <Label
                                          className="mb-1 font-medium text-sm text-[#374151]"
                                          htmlFor={`ticket_types.${index}.quota`}
                                        >
                                          Quota
                                        </Label>
                                        <div className="flex h-9 w-full min-w-0">
                                          {ticket.quota}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}

                        <div className="flex justify-end">
                          <Button
                            type="button"
                            onClick={
                              isModified
                                ? () => onBtSubmit(props.values) // Submit updated values
                                : onBtEdit // Toggle editing state
                            }
                          >
                            {typeEdit === "text"
                              ? "Edit Event"
                              : isModified
                              ? "Update Event"
                              : "Cancel"}
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

export default DashboardEventView;
