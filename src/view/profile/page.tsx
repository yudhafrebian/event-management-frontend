"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hook";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => {
    return state.authState;
  });
  console.log("user", user);

  return (
    <div className="py-25 px-5">
      <h1 className="font-bold text-xl">Your Profile</h1>
      <div style={{ marginTop: "20px" }}>
        <div className="py-4">
          <img
            // src={imagePreview}
            alt="ProfImg"
            style={{
              textAlign: "center",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />

          <div>
            <Button>Edit Profile</Button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="border w-lg p-2 border-gray-300 rounded-lg">
            <h2 className="text-xl">
              {user.first_name}
              {user.last_name}
            </h2>
            <br />

            <div>
              <strong>Role:</strong>
              <p className="first-letter: capitalize">{user.role}</p>
            </div>
            <br />
            <div>
              <strong>Referral Code:</strong>
              <p>{user.code}</p>
            </div>
            <br />
            <div>
              <strong>Points:</strong>
              <p>{user.points}</p>
            </div>
          </div>
          <div className="border w-lg p-2 border-gray-300 rounded-lg">
            <div>
              <strong>Email:</strong>
              <p>{user.email}</p>
            </div>
            <br />
            <div>
              <strong>Password:</strong>
              <p>Password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
