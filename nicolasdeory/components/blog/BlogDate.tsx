import { Text, useColorModeValue } from "@chakra-ui/react"

export default function BlogDate({date}) {
  const textLightColor = useColorModeValue("light.text.light", "dark.text.light");

  return <Text mb="20px" color={textLightColor}>{date}</Text>
}