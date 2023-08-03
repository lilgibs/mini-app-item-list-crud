import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Divider, ButtonGroup, Button, Text, Stack, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import AddItemModal from '../components/AddItemModal'
import { useSelector } from 'react-redux'
import ItemCard from '../components/ItemCard'

function Home() {

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()


  const itemDatas = useSelector(state => state.items)

  return (

    <div className='w-[90%] lg:max-w-6xl mx-auto flex flex-col gap-5'>
      <div className=' border bg-white text-teal-500 shadow-md text-center font-semibold text-5xl py-10 rounded mt-2'>
        <h1>ITEM LIST</h1>
      </div>
      <div className='flex flex-row'>
        <div className=''>
          <Input />
        </div>
        <div>
          <button
            className='px-4 py-2 bg-teal-500 text-white rounded font-semibold hover:bg-teal-700'
            onClick={onAddOpen}
          >
            Add Item
          </button>
          <AddItemModal isOpen={isAddOpen} onClose={onAddClose} />
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
        {itemDatas && itemDatas.map(item => (
          <ItemCard item={item} />
        ))}
      </div>

    </div>
  )
}

export default Home