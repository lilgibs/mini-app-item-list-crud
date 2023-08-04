import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Divider, ButtonGroup, Button, Text, Stack, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, AspectRatio } from '@chakra-ui/react'
import EditItemModal from './EditItemModal'
import DeleteItemModal from './DeleteItemModal'
import { BiEdit, BiTrash } from 'react-icons/bi';
import { formatRupiah } from '../utils/formatRupiah'

function ItemCard({ item }) {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

  return (

    <div>
      <Card>
        <AspectRatio ratio={1}>
          <Image
            ratio={1 / 1}
            src={item.image}
            alt='Green double couch with wooden legs'
            borderTopRadius="lg"
          />

        </AspectRatio>
        <CardBody py={"1"} px={"2"}>
          <Stack>
            <p className='text-md sm:text-lg md:text-2xl font-semibold truncate' >{item.name}</p>
            <div className='flex flex-col sm:flex-row gap-1'>
              <div className='flex flex-row gap-1 sm:gap-0 sm:flex-col sm:w-1/2 sm:text-left'>
                <p className='text-xs sm:text-sm lg:text-md text-neutral-500 w-1/3 sm:w-auto'>Buy Price</p>
                <p className='font-semibold text-xs sm:text-sm lg:text-base xl:text-lg'>
                  {formatRupiah(item.buy_price)}
                </p>
              </div>
              <div className='flex flex-row gap-1 sm:gap-0 sm:flex-col sm:w-1/2 sm:text-right'>
                <p className='text-xs sm:text-sm lg:text-md text-neutral-500 w-1/3 sm:w-auto'>Sell Price</p>
                <p className='font-semibold text-xs sm:text-sm lg:text-base xl:text-lg'>
                  {formatRupiah(item.sell_price)}
                </p>
              </div>
            </div>
            <div className='text-right text-neutral-500'>
              <p className='font-semibold text-xs sm:text-sm lg:text-base'>Stock {item.stock}</p>
            </div>
          </Stack>
        </CardBody>
        <Divider className='text-neutral-300'/>
        <div className='flex gap-1 justify-end p-2'>
          <div
            className='flex gap-2 items-center w-1/2 justify-center px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-base bg-green-500 hover:bg-green-600 text-white font-semibold rounded cursor-pointer'
            onClick={onEditOpen}>
            <BiEdit />
            <p className='hidden xl:block'>Edit</p>
          </div>
          <EditItemModal item={item} isOpen={isEditOpen} onClose={onEditClose} />
          <div
            className='flex gap-2 items-center w-1/2 justify-center px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-base bg-red-500 hover:bg-red-600 text-white font-semibold rounded cursor-pointer'
            onClick={onDeleteOpen}>
            <BiTrash />
            <p className='hidden xl:block'>Delete</p>
          </div>
          <div className='hidden'>
            <DeleteItemModal item={item} isOpen={isDeleteOpen} onClose={onDeleteClose} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ItemCard