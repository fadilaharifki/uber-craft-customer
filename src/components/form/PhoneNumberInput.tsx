"use client";

import React from "react";
import { MuiTelInput } from "mui-tel-input";
import {
  InputProps as MuiInputProps,
  styled,
  TextFieldProps,
} from "@mui/material";
import { BaseFieldProps } from "@/interface/BaseInterface";
import { FieldValues } from "react-hook-form";
import theme from "@/theme";

interface PhoneNumberInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  InputProps?: MuiInputProps;
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
}

export const CustomTextFieldPhonNumber = styled(MuiTelInput)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: theme.palette.customColor?.gray,
  },
  "& .MuiInput-underline:before": {
    borderBottom: "21px solid black",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "2px solid black",
  },
});

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
    <CustomTextFieldPhonNumber
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
