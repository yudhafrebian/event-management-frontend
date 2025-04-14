"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Form, Formik, FormikProps } from "formik";
import { SignInSchema } from "./schema/signInSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  interface IUserValue {
    email: string;
    password: string;
  }

  const [typePass, setTypePass] = React.useState<string>("password");

  const onBtShowPass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else if (typePass === "text") {
      setTypePass("password");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] flex rounded h-screen py-12 text-black p-3">
      <div className="w-full md:w-1/3 m-auto h-fit rounded-lg shadow-xl">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Sign In</h1>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignInSchema}
              onSubmit={(values) => {
                console.log(values);
                //onSignIn function
              }}
            >
              {(props: FormikProps<IUserValue>) => {
                const { errors, values, handleChange } = props;
                console.log("Error from yup", errors);
                return (
                  <Form>
                    <div className="py-2 md:py-6 space-y-5">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      <div className="flex items-center justify-between ">
                        <Input
                          name="password"
                          type={typePass}
                          placeholder="Password"
                          onChange={handleChange}
                          value={values.password}
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
                      <div className="flex gap-4">
                        <Button type="submit" className="text-white">
                          Sign In
                        </Button>
                      </div>
                    </div>
                    <Link type="button" href={"/sign-up"} className="font-bold">
                      No Account?
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

export default SignIn;
