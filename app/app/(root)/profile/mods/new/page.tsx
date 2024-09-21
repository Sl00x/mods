"use client";
import { Button } from "@/components/Button/Button";
import { FileUpload } from "@/components/Input/FileUpload";
import { ImageUpload } from "@/components/Input/ImageUpload";
import { Input } from "@/components/Input/Input";
import { MarkDownInput } from "@/components/Input/MarkdownInput";
import { Select, SelectOption } from "@/components/Input/Select";
import Switch from "@/components/Input/Switch";
import {
  useCreateModMutation,
  useGetGamesQuery,
  useLazyGetGamePlateformsQuery,
} from "@/features/api/root-api";
import { CreateModDto } from "@/interfaces/mod.interface";
import { Plateform } from "@/interfaces/plateform.interface";
import clsx from "clsx";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";

export default function CreateMod() {
  const [createMod, { isLoading }] = useCreateModMutation();
  const [getGamePlateforms] = useLazyGetGamePlateformsQuery();
  const { data: games } = useGetGamesQuery();
  const [plateforms, setPlateforms] = useState<Plateform[] | undefined>();

  const validate = (values: CreateModDto) => {
    const errors: Record<any, string> = {};

    if (values.name === "") {
      errors.name = "Name is required";
    }

    if (values.description === "") {
      errors.description = "Description is required";
    }

    if (isNaN(values.price)) {
      errors.price = "Price need to be number";
    }
    if (values.gameId === "") {
      errors.gameId = "Game is required";
    }
    if (values.plateformId === "") {
      errors.plateformId = "Plateform is required";
    }
    if (isNaN(values.version)) {
      errors.version = "Version need to be number";
    }

    if (!values.file) {
      errors.file = "File is required";
    }
    if (!values.previews) {
      errors.previews = "Preview files is required";
    }

    return errors;
  };

  const formik = useFormik<CreateModDto>({
    initialValues: {
      name: "",
      description: "",
      isFree: false,
      withLicenseKey: false,
      price: 0,
      gameId: "",
      plateformId: "",
      version: 0,
      file: undefined,
      previews: undefined,
    },
    validateOnChange: false,
    validate,
    onSubmit: (values: CreateModDto, fh: FormikHelpers<CreateModDto>) => {
      const formData = new FormData();
      if (values.price === 0) {
        values = { ...values, isFree: true };
      }
      Object.entries(values).map(([key, value]) => {
        if (key === "previews") {
          Array.from(value).forEach((file) => {
            formData.append("previews", file as File);
          });
        } else {
          formData.append(key, value);
        }
      });
      createMod(formData);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="h-full">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-bold leading-7 text-gray-900">
            New <b className="text-primary">Mod</b>
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="mt-2 w-1/2">
                <Input
                  label="Name"
                  placeholder="Dual Wield - Reboot"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                  id="name"
                  required
                  error={formik.errors.name}
                />
              </div>
            </div>

            <div className="col-span-full">
              <MarkDownInput
                name="description"
                label="Description"
                onChange={(value, event) =>
                  formik.setFieldValue("description", value || "")
                }
                required
                value={formik.values.description}
                error={formik.errors.description}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Mod Informations
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Settings up informations about your mod, if you sell it. If need
            license key.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Input
                label="Price"
                placeholder="0.00"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                required
                error={formik.errors.price}
              />
            </div>
            <div className="sm:col-span-1">
              <Input
                label="Version"
                placeholder="1.0"
                name="version"
                onChange={formik.handleChange}
                value={formik.values.version}
                error={formik.errors.version}
                required
              />
            </div>

            <div
              className={clsx(plateforms ? "sm:col-span-2" : "sm:col-span-3")}
            >
              <Select
                label="Game"
                options={games?.map<SelectOption>((game) => ({
                  label: game.name,
                  value: game.id || "",
                }))}
                onOptionChange={async (e) => {
                  formik.setFieldValue("gameId", e);
                  const game = await getGamePlateforms(e, true).unwrap();
                  setPlateforms(game.plateforms);
                }}
                name="gameId"
                error={formik.errors.gameId}
                required
              />
            </div>
            {plateforms && (
              <div className={"sm:col-span-1"}>
                <Select
                  label="Plateform"
                  options={plateforms?.map<SelectOption>((plateform) => ({
                    label: plateform.name,
                    value: plateform.id || "",
                  }))}
                  onOptionChange={async (e) => {
                    formik.setFieldValue("plateformId", e);
                  }}
                  name="plateformId"
                  error={formik.errors.plateformId}
                  required
                />
              </div>
            )}
            <div className="sm:col-span-6">
              <FileUpload
                label="Mod File"
                name="file"
                onFileChange={(e) => formik.setFieldValue("file", e && e[0])}
                required
                error={formik.errors.file}
              />
            </div>
            <div className="sm:col-span-6">
              <ImageUpload
                label="Mod Previews"
                name="previews"
                multiple
                onFileChange={(e) => formik.setFieldValue("previews", e && e)}
                error={formik.errors.previews}
                required
              />
            </div>
            <div className="sm:col-span-1">
              <Switch
                onChange={(e) =>
                  formik.setFieldValue("withLicenseKey", e.target.checked)
                }
                checked={formik.values.withLicenseKey}
                label="Need to use License Key ?"
                name="withLicenseKey"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center space-x-4 mt-4">
        <Button
          title={"Save"}
          color="primary"
          type="submit"
          name="submit"
          loading={isLoading}
        />
      </div>
    </form>
  );
}
