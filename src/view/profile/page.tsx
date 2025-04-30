"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hook";
import axios from "axios";
import { Input } from "@/components/ui/input";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => {
    return state.authState;
  });
  console.log("user", user);

  const [typeEdit, setTypeEdit] = React.useState<string>("text");

  const onBtEdit = () => {
    if (typeEdit === "editting") {
      setTypeEdit("text");
    } else if (typeEdit === "text") {
      setTypeEdit("editting");
    }
  };

  const [imagePreview, setImagePreview] = React.useState<string>(
    "https://via.placeholder.com/150"
  );
  const [upalodFile, setUploadFile] = React.useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userName = event.target.value;
    console.log(userName);
  };

  const handleUpload = async () => {
    try {
      // how to upload all updated data at once

      const formData = new FormData();
      // if (!upalodFile) {
      //   throw "No file selected";
      // }
      // formData.append("img", upalodFile);
      const token = localStorage.getItem("tkn");
      const res = await axios.patch("/auth/profile-img-cloud", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-25 px-5">
      <h1 className="font-bold text-xl">Your Profile</h1>
      <div style={{ marginTop: "20px" }}>
        <div className="py-4">
          {typeEdit === "text" ? (
            <>
              <img
                src={user.profile_img}
                alt="ProfImg"
                style={{
                  textAlign: "center",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                  border: "2px solid #ccc",
                }}
              />
            </>
          ) : (
            <>
              <img
                src={imagePreview}
                defaultValue={user.profile_img}
                alt="ProfImgEdit"
                style={{
                  textAlign: "center",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                  border: "2px solid #ccc",
                }}
              />
              <div>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: "250px" }}
                />
              </div>
            </>
          )}

          <div>
            <Button type="button" onClick={onBtEdit}>
              {typeEdit === "text"
                ? "Edit Profile"
                : // Request ? "Save":
                  "Cancel"}
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="border w-lg p-2 border-gray-300 rounded-lg">
            {typeEdit === "text" ? (
              <h2 className="text-xl">
                {user.first_name} {user.last_name}
              </h2>
            ) : (
              <>
                Name:
                <div className="flex gap-8">
                  <Input
                    className="text-xl"
                    placeholder="First Name"
                    defaultValue={user.first_name}
                    onChange={handleChange}
                  />
                  <Input
                    className="text-xl"
                    placeholder="Last Name"
                    defaultValue={user.last_name}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
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
