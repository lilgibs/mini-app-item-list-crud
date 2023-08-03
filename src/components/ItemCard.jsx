import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Divider, ButtonGroup, Button, Text, Stack, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, AspectRatio } from '@chakra-ui/react'
import EditItemModal from './EditItemModal'

function ItemCard({ item }) {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

  return (

    <div>
      <Card maxW='sm'>
        <CardBody>
          <AspectRatio ratio={1}>
            <Image
              ratio={1 / 1}
              src={item.image}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />

          </AspectRatio>
          <Stack mt='6' spacing='3'>
            <p className='text-2xl font-semibold' >{item.name}</p>
            <div className='flex'>
              <div className='flex flex-col w-1/2 text-left'>
                <p className='text-sm lg:text-md'>Buy Price</p>
                <p className='font-semibold text-md lg:text-xl'>
                  {item.buy_price}
                </p>
              </div>
              <div className='flex flex-col w-1/2 text-right'>
                <p className='text-sm lg:text-md'>Sell Price</p>
                <p className='font-semibold text-md lg:text-xl'>
                  {item.sell_price}
                </p>
              </div>
            </div>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter className='flex justify-end'>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='green' onClick={onEditOpen}>
              Edit
            </Button>
            <EditItemModal item={item} isOpen={isEditOpen} onClose={onEditClose} />
            <Button variant='solid' colorScheme='red'>
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ItemCard