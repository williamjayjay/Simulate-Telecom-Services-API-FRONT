import { FormControl, FormLabel, InputProps as ChakraInputProps, PinInputField, PinInput, HStack } from "@chakra-ui/react"

function InputNumber({ qtFieldSquare, name, label, ...rest }) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name} >{label}</FormLabel>}
      {
        qtFieldSquare === "codearea" &&
        <HStack  >
          <PinInput
            {...rest}
            focusBorderColor="pink.500">
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

      }

      {
        qtFieldSquare === "minutes" &&
        <HStack  >
          <PinInput
            {...rest}
            focusBorderColor="pink.500">
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

      }


    </FormControl>
  )
}

export default InputNumber