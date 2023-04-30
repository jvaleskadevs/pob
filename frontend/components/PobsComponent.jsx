import { Stack, Heading, Button, Text, Flex } from '@chakra-ui/react';
import PobCard from './PobCard';

export default function PobsComponent({ pobs }) {
  
  
  return (
    <Stack minHeight='100vh' spacing={4} align='center' bg='black' color='white'>
      <Heading as="h1">Your POBs</Heading>
      <Text as="h3" fontSize={{ base: 'sm', sm: 'md' }} maxW='60%' fontWeight='semibold' color='gray.400'>A comprehensive list including all your proofs of buidlership from our DAO</Text>
      <Flex minW='full' px={32} py={16}>
        { pobs && pobs.map((pob, idx) => (
          <PobCard
            key={idx}
            title="N3tfl1x"
            image="n.jpeg"
            balance={pob.balance}
          />
        ))}
      </Flex>
    </Stack>
  );
}
