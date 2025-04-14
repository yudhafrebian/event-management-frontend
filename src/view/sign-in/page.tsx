import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] flex rounded h-screen py-12 text-black p-3">
      <div className="w-full md:w-1/3 m-auto h-fit rounded-lg shadow-xl">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Sign In</h1>
          </CardHeader>
          <CardContent>
            <div className="py-2 md:py-6 space-y-5">
              <Input name="email" type="email" placeholder="Email" />
              <div className="flex items-center justify-between ">
                <Input name="password" placeholder="Password" />
              </div>
              <div className="flex items-center justify-between ">
                <Input name="confPassword" placeholder="Confirm Password" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
