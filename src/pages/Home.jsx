import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Divider, ButtonGroup, Button, Text, Stack, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import AddItemModal from '../components/AddItemModal'

function Home() {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()

  return (
    
    <div className='max-w-7xl mx-auto flex flex-col gap-5'>
      <div className='bg-teal-500 text-white text-center font-semibold text-5xl py-10 rounded mt-2'>
        <h1>ITEM LIST</h1>
      </div>
      <div className='flex flex-row bg-red-200'>
        <div className=''>
          <Input />
        </div>
        <div>
          <button
            className='px-4 py-2 bg-cyan-500 text-white rounded'
            onClick={onAddOpen}
          >
            Add Item
          </button>
          <AddItemModal isOpen={isAddOpen} onClose={onAddClose} />
        </div>
      </div>
      <Card maxW='sm'>
        <CardBody>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design with a
              sprinkle of vintage design.
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Home