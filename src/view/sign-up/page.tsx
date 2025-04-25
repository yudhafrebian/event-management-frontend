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
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SignUp = () => {
  interface IFormValue {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confPassword: string;
    referral_code: string;
    role: string;
  }

  const router = useRouter();

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
        role: values.role,
      });
      router.replace(`/sign-in`);

      toast(`Periksa email ${values.email} anda`);
    } catch (error) {
      console.log(error);
      toast("error");
    }
  };

  const [open, setOpen] = React.useState(false);

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
                role: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => {
                console.log("Data from input", values);

                onSignUp(values);
              }}
            >
              {(props: FormikProps<IFormValue>) => {
                // formik not show error at front end
                const { errors, handleChange } = props;
                const [roleValue, setRoleValue] = React.useState("");
                props.values.role = roleValue;

                const roles = [
                  {
                    value: "user",
                    label: "User",
                  },
                  {
                    value: "organizer",
                    label: "Organizer",
                  },
                ];

                console.log("Error from yup", errors);
                return (
                  <Form>
                    <div className="py-2 md:py-6 space-y-5">
                      <div className="flex gap-2">
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
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="text-black font-normal"
                          >
                            {roleValue
                              ? roles.find(
                                  (framework) => framework.value === roleValue
                                )?.label
                              : "Role"}
                            <ChevronsDown />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {roles.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setRoleValue(
                                        currentValue === roleValue
                                          ? ""
                                          : currentValue
                                      );

                                      setOpen(false);
                                    }}
                                    onChange={handleChange}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        roleValue === framework.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {framework.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {roleValue === "organizer" ? (
                        <></>
                      ) : (
                        <>
                          <Input
                            name="referral_code"
                            type="text"
                            placeholder="Referal Code"
                            onChange={handleChange}
                          />
                        </>
                      )}

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
