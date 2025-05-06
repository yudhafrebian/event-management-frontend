"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hook";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/utils/apiHelper";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => {
    return state.authState;
  });
  console.log("user", user);

  const [typeEdit, setTypeEdit] = React.useState<string>("text");
  const [isModified, setIsModified] = React.useState(false);

  const onBtEdit = () => {
    if (typeEdit === "editting") {
      setTypeEdit("text");
      setIsModified(false); // Reset modification state when canceling
    } else if (typeEdit === "text") {
      setTypeEdit("editting");
    }
  };

  const [imagePreview, setImagePreview] = React.useState<string>(
    user.profile_img
  );
  const [upalodFile, setUploadFile] = React.useState<File | null>(null);

  const [updatedUser, setUpdatedUser] = React.useState({
    firstName: user.first_name,
    lastName: user.last_name,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    setIsModified(true);
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = event.target;
    setIsModified(true); // Mark as modified when input changes
    if (placeholder === "First Name") {
      setUpdatedUser((prev) => ({ ...prev, firstName: value }));
    } else if (placeholder === "Last Name") {
      setUpdatedUser((prev) => ({ ...prev, lastName: value }));
    }
  };

  const onBtSubmit = async () => {
    try {
      const formData = new FormData();

      // Append the updated user data
      formData.append("first_name", updatedUser.firstName);
      formData.append("last_name", updatedUser.lastName);

      // Append the uploaded file if it exists
      if (upalodFile) {
        formData.append("img", upalodFile);
      }

      const token = localStorage.getItem("tkn");

      console.log(formData.get("img"));
      console.log(formData.get("first_name"));
      console.log(formData.get("last_name"));

      const res = await apiCall.patch("/auth/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="py-25 px-5">
      <h1 className="font-bold text-xl">Your Profile</h1>
      <div style={{ marginTop: "20px" }}>
        <div className="py-4">
          {typeEdit === "text" ? (
            <>
              {user.profile_img ? (
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
              ) : (
                <p>Loading</p> // Placeholder text or spinner
              )}
            </>
          ) : (
            <>
              <img
                src={imagePreview}
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
              <div className="py-4">
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
            <Button type="button" onClick={isModified ? onBtSubmit : onBtEdit}>
              {typeEdit === "text"
                ? "Edit Profile"
                : isModified
                ? "Update Profile"
                : "Cancel"}
            </Button>
          </div>
          <div className="border w-lg p-2 border-gray-300 rounded-lg">
            <div>
              <strong>Email:</strong>
              <p>{user.email}</p>
            </div>
            <br />
            <div>
              {/* <strong>Password:</strong>
              <p>Password</p>
               */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
