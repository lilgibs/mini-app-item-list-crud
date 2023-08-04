import React from 'react'
import { Button, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Box, Text } from '@chakra-ui/react'
import { useCustomToast } from '../hooks/useCustomToast';
import { useDispatch } from 'react-redux';
import { deleteItemAndSave } from '../features/itemSlice';

function DeleteItemModal({ item, isOpen, onClose, setCurrentPage  }) {
  const dispatch = useDispatch()
  const { showSuccessToast } = useCustomToast();

  const handleDelete = () => {
    dispatch(deleteItemAndSave(item))
    showSuccessToast("Item successfully deleted.")
    setCurrentPage(0);
    onClose();
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', sm: 'lg' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='bg-teal-500 text-white' roundedTop={'md'}>Delete Item</ModalHeader>
          <ModalCloseButton className='mt-2 text-white' />
          <ModalBody mt={'3'}>
            <Text className='text-md md:text-lg'>Are you sure you want to delete this item?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button colorScheme='gray' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  )
}

export default DeleteItemModal