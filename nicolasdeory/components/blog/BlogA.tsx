import { Link, Text, useColorModeValue } from "@chakra-ui/react"

export default function BlogA({children, ...props}) {

  return <Link mb="20px" {...props}>{children}</Link>
}