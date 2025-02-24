"use client";

import React from "react";
import { MuiTelInput } from "mui-tel-input";
import { InputProps as MuiInputProps, TextFieldProps } from "@mui/material";
import { BaseFieldProps } from "@/interface/BaseInterface";
import { FieldValues } from "react-hook-form";

interface PhoneNumberInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  InputProps?: MuiInputProps;
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
}

const PhoneNumberInput = <T extends FieldValues>({
  field,
  fieldState,
  placeholder = "Enter your phone number",
  size = "small",
  sx,
  slotPropsInput,
  classNameField,
  label = "Phone Number",
}: PhoneNumberInputProps<T>) => {
  return (
    <MuiTelInput
      {...field}
      label={label}
      className={classNameField}
      slotProps={slotPropsInput}
      sx={sx}
      size={size}
      value={field.value || ""}
      onChange={(newPhone) => field.onChange(newPhone)}
      placeholder={placeholder}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

export default PhoneNumberInput;
