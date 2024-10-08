import { Text, useColorModeValue } from "@chakra-ui/react"

export default function BlogP({children, ...props}) {

  return <Text mb="20px" fontSize="md" textAlign="justify" {...props}>{children}</Text>
}