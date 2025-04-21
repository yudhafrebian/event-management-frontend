import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
  referal_code: Yup.string().optional(),
});
