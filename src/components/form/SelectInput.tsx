import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { BaseFieldProps } from "@/interface/BaseInterface";
import { FieldValues } from "react-hook-form";
import clsx from "clsx";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T> {
  options: SelectOption[];
  classNameField?: string;
  slotPropsInput?: TextFieldProps["slotProps"];
}

const SelectInput = <T extends FieldValues>({
  field,
  fieldState,
  options,
  placeholder,
  size = "small",
  sx,
  classNameField,
  slotPropsInput,
  label,
}: SelectInputProps<T>) => (
  <Autocomplete
    fullWidth
    className={clsx(classNameField)}
    options={options}
    value={options.find((option) => option.value === field.value) || null}
    popupIcon={<ExpandMoreRounded />}
    onChange={(_, value) => field.onChange(value?.value ?? undefined)}
    isOptionEqualToValue={(option, value) => option.value === value.value}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        inputRef={params.InputProps.ref}
        slotProps={{
          ...slotPropsInput,
        }}
        fullWidth
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        placeholder={placeholder}
        size={size}
        sx={sx}
      />
    )}
  />
);

export default SelectInput;
