import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Divider, ButtonGroup, Button, Text, Stack, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Box, Center } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';


function AddItemModal({ isOpen, onClose }) {

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Required'),
    item_price: Yup.number().required('Required').min(0),
    // image: Yup.mixed().required('Required')
    //   .test(
    //     "fileSize",
    //     "File too large, maximum 1MB",
    //     value => value && value.size <= 1024 * 1024  // file size <= 1MB
    //   )
    //   .test(
    //     "fileFormat",
    //     "Unsupported Format",
    //     value => value && (value.type === "image/jpeg" || value.type === "image/png")
    //   ),
  })

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('test')
    const item = { name: values.item_name, price: values.item_price };

    // Mengambil data yang sudah ada di localStorage
    let items = JSON.parse(localStorage.getItem('items')) || [];
    console.log(items)

    // Menambahkan item baru ke array
    items.push(item);

    // Mengubah array menjadi string dan menyimpannya ke localStorage
    localStorage.setItem('items', JSON.stringify(items));

    // Setel submitting ke false dan reset form
    setSubmitting(false);
    resetForm();
}

return (
  <div>
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={{ base: 'sm', sm: 'md', md: 'lg' }}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            item_name: '',
            item_price: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box className='bg-cyan-500 text-white' roundedTop={'md'} alignItems={'center'}>
              <ModalHeader>Add Item</ModalHeader>
              <ModalCloseButton className='mt-2' />
            </Box>
            <ModalBody>
              <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Field
                  as={Input}
                  name='item_name'
                  placeholder="Enter item name"
                />
                <ErrorMessage name="item_name" component="div" className="text-red-500 text-xs italic" />
              </FormControl>
              <FormControl>
                <FormLabel>Item Price</FormLabel>
                <Field
                  as={Input}
                  name='item_price'
                  placeholder="Enter item price"
                />
                <ErrorMessage name="item_price" component="div" className="text-red-500 text-xs italic" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme='red' mr={3} onClick={onClose}>
                  Close
                </Button> */}
              <Button type="submit" colorScheme='green' textColor={'white'}>Submit</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  </div>
)
}

export default AddItemModal