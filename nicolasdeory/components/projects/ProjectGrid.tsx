import { SimpleGrid, VStack } from "@chakra-ui/react";

type ProjectGridProps = {
  children: JSX.Element[]
}

export default function ProjectGrid({ children }: ProjectGridProps) {
  
  // Spreads children in two columns. Doesn't really account for element height but it does the trick
  const column1:JSX.Element[] = [];
  const column2:JSX.Element[] = [];
  for (let i = 0; i < children.length; i++)
  {
    const child = children[i];
    if (i % 2 === 0)
    {
      column1.push(child);
    }
    else
    {
      column2.push(child);
    }
  }
  
  return (
    <SimpleGrid
      w="100%"
      maxW="1000px"
      spacing="50px"
      columns={{ base: 1, lg: 2 }}
    >
      <VStack spacing="50px">{column1}</VStack>
      <VStack spacing="50px">{column2}</VStack>
    </SimpleGrid>
  );
}
