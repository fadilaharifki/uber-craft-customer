"use client";

import {
  TextField,
  InputAdornment,
  InputProps as MuiInputProps,
  TextFieldProps,
  Autocomplete,
} from "@mui/material";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { BaseFieldProps } from "@/interface/BaseInterface";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";
import { useState } from "react";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

interface PhoneNumberInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  InputProps?: MuiInputProps;
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
}

const specialCountries = new Map([
  ["247", "Ascension"],
  ["290", "St. Helena"],
]);

const countryCodes = getCountries().map((country) => {
  const countryCode = `+${getCountryCallingCode(country)}`;
  return {
    value: countryCode,
    label: `(${countryCode}) ${
      countries.getName(country, "en") ||
      specialCountries.get(getCountryCallingCode(country)) ||
      "Unknown"
    }`,
  };
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
  const [selectedCode, setSelectedCode] = useState("+62");

  return (
    <TextField
      label={label}
      className={clsx(classNameField)}
      value={
        field.value.startsWith(selectedCode.replaceAll("+", ""))
          ? field.value.replace(selectedCode.replaceAll("+", ""), "")
          : field.value
      }
      onChange={(e) => {
        const numericValue = e.target.value.replace(/\D/g, ""); // Hanya angka
        field.onChange(`${selectedCode.replaceAll("+", "")}${numericValue}`);
      }}
      fullWidth
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      placeholder={placeholder}
      size={size}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#dbeafe",
        },
        "& .MuiInputBase-input": {
          backgroundColor: "#ffffff",
          paddingLeft: 2,
        },
        ...sx,
      }}
      slotProps={{
        ...slotPropsInput,
        input: {
          startAdornment: (
            <InputAdornment className="bg-blue-100" position="start">
              <Autocomplete
                disableClearable
                options={countryCodes}
                autoHighlight
                getOptionLabel={(option) =>
                  `${option.value}             ${option.label}`
                }
                value={
                  countryCodes.find(
                    (option) => option.value === selectedCode
                  ) || undefined
                }
                sx={{ width: 85 }}
                onChange={(_, value) => {
                  if (value) {
                    const oldValue = field.value.startsWith(
                      selectedCode.replaceAll("+", "")
                    )
                      ? field.value.replace(
                          selectedCode.replaceAll("+", ""),
                          ""
                        )
                      : field.value;
                    field.onChange(
                      `${value.value.replaceAll("+", "")}${oldValue}`
                    );
                    setSelectedCode(value.value);
                  }
                }}
                renderOption={(props, option, { index }) => (
                  <li
                    {...props}
                    key={`${option.label}-${option.value}`}
                    className={clsx(
                      "hover:bg-gray-100 cursor-pointer p-2",
                      index % 2 === 0 ? "bg-blue-100" : "bg-white"
                    )}
                  >
                    {option.label}
                  </li>
                )}
                componentsProps={{
                  paper: { sx: { width: 300 } },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    variant="standard"
                    sx={{
                      "& .MuiInputBase-input": {
                        backgroundColor: "#dbeafe",
                      },
                      "& .MuiInput-underline:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottom: "none",
                      },
                    }}
                  />
                )}
              />
            </InputAdornment>
          ),
          ...(slotPropsInput?.input ?? {}),
        },
      }}
    />
  );
};

export default PhoneNumberInput;
