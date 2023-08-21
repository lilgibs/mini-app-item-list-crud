import React from 'react'
import { Button, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Box, Text } from '@chakra-ui/react'

function InfoModal({ item, isOpen, onClose,  }) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', sm: 'lg' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='bg-teal-500 text-white' roundedTop={'md'}>Delete Item</ModalHeader>
          <ModalCloseButton className='mt-2 text-white' />
          <ModalBody mt={'3'}>
            <Text className='text-md md:text-lg'>{item.name}</Text>
            <Text className='text-md md:text-lg'>{item.gender}</Text>
            <Text className='text-md md:text-lg'>{item.age}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  )
}

export default InfoModal