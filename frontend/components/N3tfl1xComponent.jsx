import { Stack, Heading, Button, Text, Box, useNumberInput, Input, HStack  } from '@chakra-ui/react';

export default function N3tfl1xComponent ({ subscribe, unsubscribe }) {
  
  const onSubscribeClickListener = async (e) => {
    e.preventDefault()
    
    await subscribe();
  }
  
  const onUnsubscribeClickListener = async (e) => {
    e.preventDefault()
    
    await unsubscribe();
  }
  
  return (
    <Stack minHeight='100vh' spacing={4} align='center' bg='black' color='red'>
      <Stack align='center'>
        <Heading as="h1" fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
          N3TFL1X
        </Heading>
        <Text as="h3" fontSize={{ base: 'sm', sm: 'md' }} maxW='50%' color='white' fontWeight='bold'>
          Subscribe now to get the best series on chain ever! Now, just 100 xDAI / month!
        </Text>
      </Stack>
      <Box as='form' pt={4}>
        <Button
          fontFamily={'heading'}
          mt={4}
          w={'full'}
          bgGradient="linear(to-r, pink.400,red.400)"
          color={'white'}
          _hover={{
            bgGradient: 'linear(to-r, red.400,pink.400)',
            boxShadow: 'xl',
          }}
          onClick={onSubscribeClickListener}          
        >
          Subscribe
        </Button>
        <Button
          fontFamily={'heading'}
          mt={2}
          w={'full'}
          bg='black'
          color={'red'}
          border='1px solid red'
          _hover={{
            bg: 'white',
            boxShadow: 'xl',
            border:'0px'
          }}
          onClick={onUnsubscribeClickListener}          
        >
          Unsubscribe
        </Button>
        <a href="https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa" rel="noopener noreferrer" target="_blank">
          <Text mt={2}><u>Learn more about superfluid flow streams</u></Text>
        </a>
      </Box>
    </Stack>
  );
}
