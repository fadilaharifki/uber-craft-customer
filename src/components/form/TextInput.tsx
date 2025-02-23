import { BaseFieldProps } from "@/interface/BaseInterface";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import clsx from "clsx";
import { FieldValues } from "react-hook-form";

interface TextInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  type?: "text" | "number" | "password" | "email";
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
  customInput?: React.ElementType;
}

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
}: TextInputProps<T>) => (
  <TextField
    {...field}
    label={label}
    className={clsx("w-full ", classNameField)}
    fullWidth
    type={type}
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    placeholder={placeholder}
    size={size}
    sx={sx}
    variant="outlined"
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

export default TextInput;
