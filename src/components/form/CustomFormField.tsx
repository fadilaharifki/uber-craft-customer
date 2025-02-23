import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { InputLabel, SxProps, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import TextInput from "./TextInput";
import CurrencyInput from "./CurrencyInput";
import SelectInput from "./SelectInput";
import DateInput, { DateFormat } from "./DateInput";

interface CustomFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  labelRequired?: boolean;
  type?: "text" | "number" | "date" | "currency" | "select" | "email";
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
}: CustomFormFieldProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <div
          className={clsx(
            "flex flex-col flex-1",
            fieldState.error ? "mb-0" : "mb-6",
            className
          )}
        >
          {labelOutside && (
            <InputLabel
              className="font-medium mb-1"
              sx={{ fontWeight: 500, marginBottom: 0.5 }}
            >
              {label}
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
              label={!labelOutside ? label : ""}
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
              label={!labelOutside ? label : ""}
            />
          ) : type === "date" ? (
            <DateInput
              format={dateFormat}
              field={field}
              fieldState={fieldState}
              sx={sx}
              classNameField={classNameField}
              label={!labelOutside ? label : ""}
              dateIcon={dateIcon}
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
              label={!labelOutside ? label : ""}
            />
          )}
        </div>
      )}
    />
  );
};

export default CustomFormField;
