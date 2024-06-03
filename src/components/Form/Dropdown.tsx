"use client";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  Select,
  SelectProps,
} from "@chakra-ui/react";

type TextInputProps = {
  label: string;
  errorMessage?: string;
  helperText?: string;
  options: any[];
} & SelectProps;

function Dropdown({
  label,
  name,
  options,
  errorMessage,
  helperText,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select placeholder={placeholder || label} name={name} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {errorMessage && (
        <FormHelperText color={"red"}>{errorMessage}</FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default Dropdown;
