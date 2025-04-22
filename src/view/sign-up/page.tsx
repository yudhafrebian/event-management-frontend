"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { SignUpSchema } from "./schema/signUpSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiCall } from "@/utils/apiHelper";

const SignUp = () => {
  interface IFormValue {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confPassword: string;
    referral_code: string;
  }

  const [typePass, setTypePass] = React.useState<string>("password");
  const onBtShowPass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else if (typePass === "text") {
      setTypePass("password");
    }
  };

  const onSignUp = async (values: IFormValue) => {
    try {
      const response = await apiCall.post("/auth/register", {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        referral_code: values.referral_code,
      });
      // need fix alert response
      throw `Periksa email ${values.email} anda`;
    } catch (error) {
      // need proper error handling
      console.log(error);
      throw "error";
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] flex rounded h-screen py-36 text-black p-3">
      <div className="w-full md:w-1/3 m-auto h-fit rounded-lg shadow-xl">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Sign Up Now</h1>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confPassword: "",
                referral_code: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => {
                // onSugnUp function not working yet
                // formik not show error at front end
                console.log("Data from input", values);
                onSignUp(values);
              }}
            >
              {(props: FormikProps<IFormValue>) => {
                const { errors, handleChange } = props;
                console.log("Error from yup", errors);
                return (
                  <Form>
                    <div className="py-2 md:py-6 space-y-5">
                      <div className="flex gap-8">
                        <Input
                          name="first_name"
                          type="text"
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                        <Input
                          name="last_name"
                          type="text"
                          placeholder="Last Name"
                          onChange={handleChange}
                        />
                      </div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      <div className="flex items-center justify-between ">
                        <Input
                          name="password"
                          type={typePass}
                          placeholder="Password"
                          onChange={handleChange}
                        />
                        <Button
                          type="button"
                          className="shadow-none p-0"
                          onClick={onBtShowPass}
                        >
                          {typePass === "password" ? (
                            <FaEyeSlash size={24} />
                          ) : (
                            <FaEye size={24} />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between ">
                        <Input
                          name="confPassword"
                          type={typePass}
                          placeholder="Confirm Password"
                          onChange={handleChange}
                        />
                        <Button
                          type="button"
                          className="shadow-none p-0"
                          onClick={onBtShowPass}
                        >
                          {typePass === "password" ? (
                            <FaEyeSlash size={24} />
                          ) : (
                            <FaEye size={24} />
                          )}
                        </Button>
                      </div>
                      <Input
                        name="ref code"
                        type="text"
                        placeholder="Referal Code"
                        onChange={handleChange}
                      />
                      <div className="flex gap-4">
                        <Button type="submit" className="text-white">
                          Sign Up
                        </Button>
                      </div>
                    </div>
                    <Link type="button" href={"/sign-in"} className="font-bold">
                      Have an Account?
                    </Link>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
