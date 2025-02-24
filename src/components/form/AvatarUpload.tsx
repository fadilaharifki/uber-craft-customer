"use client";

import { BaseFieldProps } from "@/interface/BaseInterface";
import { Avatar } from "@mui/material";
import type React from "react";
import { useState, useRef } from "react";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";
import { EditOutlined } from "@mui/icons-material";

interface AvatarUploadProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  classNameField?: string;
}

const AvatarUpload = <T extends FieldValues>({
  sx,
  field,
  fieldState,
  classNameField,
}: AvatarUploadProps<T>) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileURL = reader.result as string;
        setImage(fileURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={clsx("relative flex justify-center", classNameField)}>
      <div className="relative inline-block">
        <Avatar
          src={image || "/assets/images/avatar.png"}
          sizes="200"
          sx={{ width: 140, height: 140, ...sx }}
        />
        <div className="absolute bottom-0 right-3">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-800 rounded-full p-1 cursor-pointer"
            onClick={handleUploadClick}
          >
            <EditOutlined className="text-white" />
          </div>
        </div>
      </div>

      <input
        {...field}
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = "";
        }}
      />

      {fieldState?.error && (
        <span style={{ color: "red" }}>{fieldState.error.message}</span>
      )}
    </div>
  );
};

export default AvatarUpload;
