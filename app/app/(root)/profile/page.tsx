/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/Button/Button";
import { ImageUpload } from "@/components/Input/ImageUpload";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";
import {
  useGetNotAvailableUsernameQuery,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/features/api/root-api";
import { useUserHook } from "@/features/hooks/user-hook";
import { UpdateUserDto } from "@/interfaces/user.interface";
import { RiPencilLine } from "@remixicon/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useUserHook();
  const { data: usernames } = useGetNotAvailableUsernameQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [updateAvatar] = useUpdateAvatarMutation();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const validate = (values: UpdateUserDto) => {
    return sleep(1000).then(() => {
      const errors: any = {};

      if (!values.email) {
        errors.email = "Email address is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.username) {
        errors.username = "Username is required";
      }

      if (usernames && usernames.includes(values.username!)) {
        errors.username = `${values.username} is not available`;
      }

      if (!values.lastname) {
        errors.lastname = "Lastname is required";
      }

      if (!values.firstname) {
        errors.firstname = "Firstname is required";
      }
      return errors;
    });
  };

  const handleSaveAvatar = () => {
    if (!avatar) {
      return;
    }
    const fmd = new FormData();
    fmd.append("avatar", avatar as File);
    updateAvatar(fmd)
      .unwrap()
      .then((data) => {
        toast.success("Avatar updated with success !");
        setOpen(false);
      })
      .catch((error) => {
        toast.error("An error was occured during upload.");
      });
  };

  if (!user) return;
  return (
    <>
      <Modal
        open={open}
        title="Update Avatar"
        onClose={() => setOpen((prev) => !prev)}
        onSave={handleSaveAvatar}
      >
        <ImageUpload
          label={"Avatar"}
          multiple={false}
          onFileChange={(e) => e && setAvatar(e[0])}
        />
      </Modal>
      <div className="space-y-4">
        <section className="relative pt-36 pb-6 ">
          {user && (
            <img
              src={`https://via.assets.so/game.jpg?id=5&w=2000&h=1000`}
              alt="cover-image"
              className="w-full absolute top-0 left-0 z-0 h-60 object-cover rounded-t-[4px]"
            />
          )}
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex items-center justify-center relative z-10 mb-2.5">
              <div className="relative">
                <img
                  src={
                    user?.avatar
                      ? user.avatar
                      : "https://pagedone.io/asset/uploads/1705471668.png"
                  }
                  alt="user-avatar-image"
                  className="border-4 w-40 h-40 border-solid border-white rounded-full object-cover"
                />
                <button
                  className="absolute right-2 bottom-0 bg-dark rounded-full p-2 text-light transition-colors duration-200 hover:bg-primary"
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  <RiPencilLine size={20} />
                </button>
              </div>
            </div>
            <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
              {user?.username}
            </h3>
          </div>
          <hr />
          <div className="w-full">
            <Formik
              initialValues={{
                username: user?.username,
                email: user?.email,
                lastname: user?.lastname,
                firstname: user?.firstname,
              }}
              validate={validate}
              onSubmit={(values) => {
                updateUser(values)
                  .unwrap()
                  .then((data) =>
                    toast.success("You profile was successfully updated.")
                  )
                  .catch(() =>
                    toast.error(
                      "Unable to update your profile please verify information."
                    )
                  );
              }}
            >
              {({ values, errors, setFieldValue }) => (
                <Form className="w-full flex flex-col items-center justify-center mt-6">
                  <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                    <Input
                      label="Username"
                      name="username"
                      value={values.username}
                      error={errors.username}
                      onTextChange={(value) => setFieldValue("username", value)}
                    />
                    <div className="flex flex-col lg:flex-row lg:space-x-2">
                      <Input
                        label="Firstname"
                        name="firstname"
                        value={values.firstname}
                        onTextChange={(value) =>
                          setFieldValue("firstname", value)
                        }
                      />
                      <Input
                        label="Lastname"
                        name="lastname"
                        value={values.lastname}
                        onTextChange={(value) =>
                          setFieldValue("lastname", value)
                        }
                      />
                    </div>
                    <Input
                      label="E-mail"
                      name="email"
                      value={values.email}
                      error={errors.email}
                      onTextChange={(value) => setFieldValue("email", value)}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-row justify-end items-center mt-2">
                    <Button
                      title="Save"
                      name="submit"
                      color="primary"
                      type="submit"
                      loading={isLoading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
