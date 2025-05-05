import * as Yup from "yup";

export const createVoucherSchema = Yup.object().shape({
    code: Yup.string().required("Code Voucher is required"),
    event_name: Yup.string().required("Event Name is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date().required("End Date is required"),
    disc_amount: Yup.number().required("Discount is required"),
    quota: Yup.number().required("Quota is required"),
});