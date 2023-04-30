import { VStack, Heading, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function MenuComponent() {
  
  
  return (
    <VStack minHeight='100vh' spacing={4} align='center' py={16}>
      <Heading as="h1" color='gray.200'>PoB manager</Heading>
      <Text as="h3" fontSize={{ base: 'sm', sm: 'md' }} maxW='60%' fontWeight='semibold' color='gray.400' align='center'>The place to go to manage your proof of buidlership</Text>
      <VStack pt={8}>
        <Link href="/mint">
          <Button minW='200px' bg='red' color='white' _hover={{bg: 'black', border: '1px solid white'}}>
            Mint PoB
          </Button>
        </Link>
        <Link href="/pobs">
          <Button minW='200px' bg='red' color='white' _hover={{bg: 'black', border: '1px solid white'}}>
            Your PoBs
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
}
