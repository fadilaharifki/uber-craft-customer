import {
  DatePicker,
  LocalizationProvider,
  DatePickerProps,
  DateRangeIcon,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { BaseFieldProps } from "@/interface/BaseInterface";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";
import { useState } from "react";

export type DateFormat =
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY-MM-DD"
  | "DD-MM-YYYY"
  | "MMMM D, YYYY"
  | "ddd, MMM D, YYYY";

interface DateInputProps<T extends FieldValues> extends BaseFieldProps<T> {
  slotPropsInput?: DatePickerProps<Dayjs>["slotProps"];
  classNameField?: string;
  format?: DateFormat;
  dateIcon?: boolean;
}

const DateInput = <T extends FieldValues>({
  field,
  fieldState,
  sx,
  slotPropsInput,
  classNameField,
  format = "DD/MM/YYYY",
  label,
  dateIcon = true,
}: DateInputProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        {...field}
        className={clsx("w-full", classNameField)}
        format={format}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={sx}
        value={field.value ? dayjs(field.value) : null}
        onChange={(date) => field.onChange(date ? date.toISOString() : null)}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
            inputProps: { readOnly: true },
            onClick: () => setOpen(true),
            InputProps: {
              endAdornment: field.value ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      field.onChange("");
                      setTimeout(() => {
                        setOpen(false);
                      }, 50);
                    }}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                  {dateIcon && (
                    <IconButton
                      onClick={() => setOpen(true)}
                      edge="end"
                      size="small"
                    >
                      <DateRangeIcon fontSize="small" />
                    </IconButton>
                  )}
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  {dateIcon && (
                    <IconButton
                      onClick={() => setOpen(true)}
                      edge="end"
                      size="small"
                    >
                      <DateRangeIcon fontSize="small" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            },
            ...slotPropsInput?.textField,
          },
        }}
      />
      {/* {field.value && (
        <InputAdornment position="end">
          <IconButton
            onClick={() => field.onChange(null)}
            edge="end"
            size="small"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      )} */}
    </LocalizationProvider>
  );
};

export default DateInput;
