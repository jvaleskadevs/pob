import {useState} from 'react';
import { Stack, Heading, Button, Text, Box, useNumberInput, Input, HStack  } from '@chakra-ui/react';
import Link from 'next/link';

export default function MintComponent({ mint, isLoading }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 10
  });
  
  const [id, setId] = useState('');

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
 
  const onClickListener = async (e) => {
    e.preventDefault()
    
    if (!id) return;
    await mint(id, input.value);
  }
  
  const onChangeInput = (e) => {
    setId(e.target.value)
  }
  
  return (
    <Stack minHeight='100vh' spacing={4} align='center' py={16}>
      <Stack align='center'>
        <Heading as="h1" fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
          Mint your PoB
        </Heading>
        <Text as="h3" fontSize={{ base: 'sm', sm: 'md' }} maxW='60%' fontWeight='semibold' color='gray.400'>
          Mint your proof of buidlership to start earning from the projects you have built. 
        </Text>
      </Stack>
      <Box as='form' pt={8}>
        <Stack spacing={4} align='center'>

          <Text color='gray.300'>Select an amount:</Text>
          <HStack maxW='full'>
            <Button {...dec} color='gray.800'>-</Button>
            <Input {...input} color='gray.300' />
            <Button {...inc} color='gray.800'>+</Button>
          </HStack>
          <Input
            placeholder='project_id' 
            _placeholder={{ color: 'gray.300' }}
            onChange={onChangeInput}
          />
        </Stack>
        <Button
          fontFamily={'heading'}
          mt={8}
          w={'full'}
          bgGradient="linear(to-r, red.400,pink.400)"
          color={'white'}
          _hover={{
            bgGradient: 'linear(to-r, red.400,pink.400)',
            boxShadow: 'xl',
          }}
          onClick={onClickListener}          
        >
          Mint PoB
        </Button>
        <Text mt={2}>*This NFT is compliant with ERC1155</Text>
      </Box>
    </Stack>
  );
}
