"use client";

import React, { ReactNode } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { InputLabel, SxProps, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import TextInput from "./TextInput";
import CurrencyInput from "./CurrencyInput";
import SelectInput from "./SelectInput";
import DateInput, { DateFormat } from "./DateInput";
import AvatarUpload from "./AvatarUpload";
import PhoneNumberInput from "./PhoneNumberInput";

interface CustomFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string | (() => ReactNode);
  labelRequired?: boolean;
  type?:
    | "text"
    | "number"
    | "date"
    | "currency"
    | "select"
    | "email"
    | "password"
    | "phone_number"
    | "avatar";
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  prefix?: string;
  size?: "small" | "medium";
  className?: string;
  classNameField?: string;
  sx?: SxProps;
  labelOutside?: boolean;
  slotPropsInput?: TextFieldProps["slotProps"];
  dateFormat?: DateFormat;
  dateIcon?: boolean;
  isHeighLable?: boolean;
}

const CustomFormField = <T extends FieldValues>({
  name,
  control,
  label,
  labelRequired = false,
  type = "text",
  options = [],
  placeholder,
  prefix,
  size = "small",
  className = "",
  sx,
  labelOutside = true,
  classNameField,
  slotPropsInput,
  dateFormat,
  dateIcon,
  isHeighLable,
}: CustomFormFieldProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <div
          className={clsx(
            "flex flex-col flex-1",
            fieldState.error ? "mb-2" : "mb-2 md:mb-7",
            className
          )}
        >
          {labelOutside && (
            <InputLabel
              className="font-medium mb-1"
              sx={{ fontWeight: 500, marginBottom: 0.5 }}
            >
              {label ? (
                typeof label === "function" ? (
                  label()
                ) : (
                  label
                )
              ) : (
                <>{isHeighLable && <div className="h-6"></div>}</>
              )}
              {labelRequired && <span className="text-red-500"> *</span>}
            </InputLabel>
          )}

          {type === "currency" ? (
            <CurrencyInput
              field={field}
              fieldState={fieldState}
              placeholder={placeholder}
              size={size}
              sx={sx}
              prefix={prefix}
              classNameField={classNameField}
              slotPropsInput={slotPropsInput}
              label={typeof label === "string" && !labelOutside ? label : ""}
            />
          ) : type === "phone_number" ? (
            <PhoneNumberInput
              field={field}
              fieldState={fieldState}
              placeholder={placeholder}
              size={size}
              sx={sx}
              classNameField={classNameField}
              slotPropsInput={slotPropsInput}
              label={typeof label === "string" && !labelOutside ? label : ""}
            />
          ) : type === "select" ? (
            <SelectInput
              field={field}
              fieldState={fieldState}
              options={options}
              placeholder={placeholder}
              size={size}
              sx={sx}
              slotPropsInput={slotPropsInput}
              classNameField={classNameField}
              label={typeof label === "string" && !labelOutside ? label : ""}
            />
          ) : type === "date" ? (
            <DateInput
              format={dateFormat}
              field={field}
              fieldState={fieldState}
              sx={sx}
              classNameField={classNameField}
              label={typeof label === "string" && !labelOutside ? label : ""}
              size={size}
              dateIcon={dateIcon}
            />
          ) : type === "avatar" ? (
            <AvatarUpload
              field={field}
              fieldState={fieldState}
              sx={sx}
              classNameField={classNameField}
            />
          ) : (
            <TextInput
              field={field}
              fieldState={fieldState}
              type={type}
              placeholder={placeholder}
              size={size}
              sx={sx}
              classNameField={classNameField}
              slotPropsInput={slotPropsInput}
              label={typeof label === "string" && !labelOutside ? label : ""}
            />
          )}
        </div>
      )}
    />
  );
};

export default CustomFormField;
