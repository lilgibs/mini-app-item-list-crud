import React, { useState } from 'react'
import { Button, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Box } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addItem, addItemAndSave } from '../features/itemSlice';
import { useCustomToast } from '../hooks/useCustomToast';

function AddItemModal({ isOpen, onClose: onCloseProp }) {

  const dispatch = useDispatch()
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const onClose = () => {
    if (onCloseProp) onCloseProp();
  };

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Required'),
    item_gender: Yup.string().required('Required'),
    item_age: Yup.number().required('Required').min(0),
  })

  const handleSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
    let items = JSON.parse(localStorage.getItem('items')) || [];

    const lastItemId = items.length > 0 ? items[items.length - 1].id : 0;
    const newId = lastItemId + 1

    const item = {
      id: lastItemId ? newId : 1,
      name: values.item_name,
      gender: values.item_gender,
      age: values.item_age,
    };

    dispatch(addItemAndSave(item));
    setSubmitting(false);
    resetForm();

    showSuccessToast("Item successfully added.");
  }

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={{ base: 'xs', sm: 'lg' }}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              item_name: '',
              item_gender: '',
              item_age: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, setFieldError }) => (
              <Form>
                <Box className='bg-teal-500 text-white' roundedTop={'md'}>
                  <ModalHeader>Add Item</ModalHeader>
                  <ModalCloseButton className='mt-2' onClick={onClose} />
                </Box>
                <ModalBody >
                  <FormControl mb={3}>
                    <FormLabel>Name</FormLabel>
                    <Field
                      as={Input}
                      name='item_name'
                      placeholder="Enter item name"
                    />
                    <ErrorMessage name="item_name" component="div" className="text-red-500 text-xs italic" />
                  </FormControl>
                  <Box className='flex gap-3'>
                    <FormControl mb={3}>
                      <FormLabel>Gender</FormLabel>
                      <Field
                        as={Input}
                        name='item_gender'
                        placeholder="Enter item buy price"
                      />
                      <ErrorMessage name="item_gender" component="div" className="text-red-500 text-xs italic" />
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel>Age</FormLabel>
                      <Field
                        as={Input}
                        name='item_age'
                        placeholder="Enter item sell price"
                      />
                      <ErrorMessage name="item_age" component="div" className="text-red-500 text-xs italic" />
                    </FormControl>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme='teal' isDisabled={isSubmitting}>Submit</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddItemModal
