"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Form, Formik, FormikProps } from "formik";
import { SignInSchema } from "./schema/signInSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hook";
import { apiCall } from "@/utils/apiHelper";
import { setSignIn } from "@/lib/redux/features/authSlice";
import { toast } from "sonner";

const SignIn = () => {
  interface IUserValue {
    email: string;
    password: string;
  }

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [typePass, setTypePass] = React.useState<string>("password");

  const onBtShowPass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else if (typePass === "text") {
      setTypePass("password");
    }
  };

  const onSignIn = async (values: IUserValue) => {
    try {
      console.log(values.email);
      const response = await apiCall.post(`/auth/signin`, {
        email: values.email,
        password: values.password,
      });
      console.log(response.data);

      if (response.data.token) {
        dispatch(
          setSignIn({
            id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            token: response.data.token,
            is_verified: response.data.is_verified,
            role: response.data.role,
          })
        );

        localStorage.setItem("tkn", response.data.token);

        if (response.data.role === "organizer") {
          router.replace(`/dashboard`);
        } else {
          router.replace(`/`);
        }
        // need fix alert response
        toast("Sign in berhasil");
      } else {
        toast("Akun tidak ditemukan");
      }
    } catch (error) {
      console.log(error);

      toast("error");
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
                onSignIn(values);
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
