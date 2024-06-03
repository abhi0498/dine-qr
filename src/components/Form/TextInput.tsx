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
} & InputProps;

function TextInput({
  label,
  name,
  errorMessage,
  helperText,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <FormControl>
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
