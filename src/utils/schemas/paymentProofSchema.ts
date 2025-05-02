import * as Yup from "yup";

export const paymentProofSchema = Yup.object().shape({
  payment_proof: Yup.mixed()
    .required("Payment Proof is required")
    .test("fileExist", "You must upload a file", (value) => {
      return value instanceof File;
    }),
});
