import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Divider, ButtonGroup, Button, Text, Stack, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, AspectRatio, Switch } from '@chakra-ui/react'
import EditItemModal from './EditItemModal'
import DeleteItemModal from './DeleteItemModal'
import { BiEdit, BiInfoCircle, BiTrash } from 'react-icons/bi';
import { formatRupiah } from '../utils/formatRupiah'
import InfoModal from './InfoModal';

function ItemCard({ item, setCurrentPage }) {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose} = useDisclosure()

  return (
    <div>
      <Card>
        <CardBody py={"1"} px={"2"}>
          <Stack>
            <div className='flex justify-between '>
              <div className='flex gap-2'>
                <div className=''>
                  <Switch id='active' />
                </div>
                <div className=''>
                  <p className='text-md sm:text-lg md:text-2xl font-semibold truncate' >{item.name}</p>
                </div >
              </div>
              <div className='flex'>
                <div className='flex flex-row gap-1'>
                  <p className='font-semibold text-xs sm:text-sm lg:text-base xl:text-lg'>{item.gender}</p>
                </div>
              </div>
              <div className='text-right text-neutral-500'>
                <p className='font-semibold text-xs sm:text-sm lg:text-base'>{item.age}</p>
              </div>
            </div>
          </Stack>
        </CardBody>
        <Divider className='text-neutral-300' />
        <div className='flex gap-1 justify-end p-2'>
          <div
            className='flex gap-2 items-center w-1/3 justify-center px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-base bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded cursor-pointer'
            onClick={onInfoOpen}>
            <BiInfoCircle />
            <p className='hidden xl:block'>Info</p>
          </div>
          <InfoModal item={item} isOpen={isInfoOpen} onClose={onInfoClose} />
          <div
            className='flex gap-2 items-center w-1/3 justify-center px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-base bg-green-500 hover:bg-green-600 text-white font-semibold rounded cursor-pointer'
            onClick={onEditOpen}>
            <BiEdit />
            <p className='hidden xl:block'>Edit</p>
          </div>
          <EditItemModal item={item} isOpen={isEditOpen} onClose={onEditClose} />
          <div
            className='flex gap-2 items-center w-1/3 justify-center px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-base bg-red-500 hover:bg-red-600 text-white font-semibold rounded cursor-pointer'
            onClick={onDeleteOpen}>
            <BiTrash />
            <p className='hidden xl:block'>Delete</p>
          </div>
          <div className='hidden'>
            <DeleteItemModal item={item} isOpen={isDeleteOpen} onClose={onDeleteClose} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ItemCard