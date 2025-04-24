import * as Yup from "yup"

export const createEventSchema = Yup.object().shape({
    title: Yup.string().required("Event Name is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date().required("End Date is required"),
    description: Yup.string().max(255).required("Description is required"),
    location: Yup.string().required("Location is required"),
    category: Yup.string().required("Category is required"),
    event_image: Yup.string().required("Event Image is required"),
    ticket_types: Yup.array().of(
        Yup.object().shape({
            type_name: Yup.string().required("Ticket Type Name is required"),
            price: Yup.number().required("Price is required"),
            quota: Yup.number().min(1).required("Quota is required"),
            description: Yup.string().required("Description is required"),
        })
    ),
})