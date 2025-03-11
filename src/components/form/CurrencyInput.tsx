"use client";

import {
  TextField,
  InputAdornment,
  IconButton,
  InputProps as MuiInputProps,
  TextFieldProps,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import ClearIcon from "@mui/icons-material/Clear";
import { BaseFieldProps } from "@/interface/BaseInterface";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";

interface CurrencyInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  prefix?: string;
  InputProps?: MuiInputProps;
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
}

const CurrencyInput = <T extends FieldValues>({
  field,
  fieldState,
  placeholder,
  size = "small",
  sx,
  slotPropsInput,
  classNameField,
  label,
}: CurrencyInputProps<T>) => (
  <NumericFormat
    label={label}
    suppressHydrationWarning
    className={clsx(classNameField)}
    value={field.value}
    onValueChange={(values) => field.onChange(values.value)}
    customInput={TextField}
    thousandSeparator=","
    decimalSeparator="."
    fullWidth
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    placeholder={placeholder}
    size={size}
    sx={sx}
    slotProps={{
      ...slotPropsInput,
      input: {
        endAdornment: field.value ? (
          <InputAdornment position="end">
            <IconButton
              onClick={() => field.onChange("")}
              edge="end"
              size="small"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
        ...(slotPropsInput?.input ?? {}),
      },
    }}
  />
);

export default CurrencyInput;
