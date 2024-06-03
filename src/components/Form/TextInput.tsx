import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

type TextInputProps = {
  label: string;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
} & InputProps;

function TextInput({
  label,
  name,
  required,
  errorMessage,
  helperText,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <FormControl isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder || label} name={name} {...rest} />

      {errorMessage && (
        <FormHelperText color={"red"}>{errorMessage}</FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default TextInput;
