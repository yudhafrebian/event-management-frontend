"use client";
import { apiCall } from "@/utils/apiHelper";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import * as React from "react";

const verify: React.FunctionComponent = () => {
  const queryParams = useSearchParams();
  const handleVerified = async () => {
    try {
      console.log(queryParams.get("tkn"));
      const token = localStorage.getItem("tkn");
      const res = await apiCall.patch("/auth/verify", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleVerified();
  }, []);

  return (
    <div>
      <p className="text-4xl text-center my-6">Verify Your Account</p>
    </div>
  );
};

export default verify;
