import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] flex rounded h-screen py-36 text-black p-3">
      <div className="w-full md:w-1/3 m-auto h-fit rounded-lg shadow-xl">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Sign Up Now</h1>
          </CardHeader>
          <CardContent>
            <div className="py-2 md:py-6 space-y-5">
              <div className="flex gap-8">
                <Input name="firstname" type="text" placeholder="First Name" />
                <Input name="lastname" type="text" placeholder="Last Name" />
              </div>
              <Input name="email" type="email" placeholder="Email" />
              <div className="flex items-center justify-between ">
                <Input name="password" placeholder="Password" />
              </div>
              <div className="flex items-center justify-between ">
                <Input name="confPassword" placeholder="Confirm Password" />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="text-white">
                  Sign Up
                </Button>
              </div>
            </div>
            <Link type="button" href={"/sign-in"} className="font-bold">
              Have an Account?
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
