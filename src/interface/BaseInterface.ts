import { SxProps } from "@mui/material";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

export interface BaseFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: { error?: FieldError };
  placeholder?: string;
  size?: "small" | "medium";
  sx?: SxProps;
  label?: string;
}
