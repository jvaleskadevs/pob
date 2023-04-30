import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function Success({ type }) {
  return (
    <Box textAlign="center" py={12} px={8} bg='black' borderRadius='lg'>
      <CheckCircleIcon boxSize={'50px'} color={'red.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2} color={'gray.200'}>
         { type === 'pob' ? 'PoB minted successfully' : 'Welcome, subscriber!' }
      </Heading>
      <Text color={'gray.300'}>
        { type === 'pob' ? 'Congrats! You successfully minted your PoB.' : 'Congrats! You successfully subscribed to N3tfl1x.' }
      </Text>
      <Text color={'gray.300'}>
        { type === 'pob' ? 'As long as you maintain ownership of this asset you will receive a constant stream of profits from the product you have built.'
          : 'Start watching your favourites series and films now. You can cancel the payment when you want.' }
      </Text>
      <Text color={'gray.300'}>
        { type === 'pob' ? "Isn't that great?" : "If your wallet run out of funds you will lose the equivalent to 4 hours of stream." } 
      </Text>
      <Text mt={4} color={'red.500'} fontWeight='bold'>
        { type === 'pob' ? 'Your DAO fam' : 'The N3tfl1x team' }
      </Text>
    </Box>
  );
}
