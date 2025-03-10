"use client";

import { BaseFieldProps } from "@/interface/BaseInterface";
import {
  IconButton,
  InputAdornment,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  Clear as ClearIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import clsx from "clsx";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import theme from "@/theme";

interface TextInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  type?: "text" | "number" | "password" | "email";
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
  label?: string;
}

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: theme.palette.customColor?.gray,
  },
  "& .MuiInput-underline:before": {
    borderBottom: "2px solid black",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "2px solid black",
  },
});

const TextInput = <T extends FieldValues>({
  field,
  fieldState,
  type = "text",
  placeholder,
  size = "small",
  sx,
  classNameField,
  slotPropsInput,
  label,
}: TextInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <CustomTextField
      {...field}
      label={label}
      className={clsx("w-full", classNameField)}
      fullWidth
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      placeholder={placeholder}
      size={size}
      sx={{ ...sx, borderRadius: 5 }}
      variant="outlined"
      slotProps={{
        ...slotPropsInput,
        input: {
          ...slotPropsInput?.input,
          endAdornment: (
            <InputAdornment position="end">
              {field.value && (
                <IconButton
                  onClick={() => field.onChange("")}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
              {type === "password" && (
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default TextInput;
