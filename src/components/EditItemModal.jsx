import React, { useState } from 'react'
import { Button, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Box } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editItemAndSave } from '../features/itemSlice';
import { useCustomToast } from '../hooks/useCustomToast';

function EditItemModal({ item, isOpen, onClose: onCloseProp }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch()
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const onClose = () => {
    setPreviewImage(null);
    if (onCloseProp) onCloseProp();
  };

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Required'),
    item_gender: Yup.string().required('Required'),
    item_age: Yup.number().required('Required').min(0),
  })

  const handleSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
    const itemDatas = JSON.parse(localStorage.getItem('items') || '[]');

    if (itemDatas.some(value => value.name.toLowerCase() === values.item_name.toLowerCase() && (value.name.toLowerCase() !== item.name.toLowerCase()))) {
      setFieldError('item_name', 'Item name already exists');
      setSubmitting(false);
      return;
    }
    updateItem(values, setSubmitting, resetForm);

  }

  const updateItem = (values, setSubmitting, resetForm) => {
    const itemDatas = JSON.parse(localStorage.getItem('items') || '[]');

    const updatedItems = itemDatas.map(data => {
      // if (data.name.toLowerCase() === item.name.toLowerCase()) {
      if (data.id === item.id) {
        return {
          ...data,
          name: values.item_name,
          age: values.item_age,
          gender: values.item_gender,
        };
      }
      return data;
    });

    dispatch(editItemAndSave(updatedItems))
    showSuccessToast("Item successfully edited.");
    setSubmitting(false);
    resetForm();
    onClose();
  }

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={{ base: 'xs', sm: 'lg' }}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              item_name: item ? item.name : '',
              item_gender: item ? item.gender : '',
              item_age: item ? item.age : '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, setFieldError }) => (
              <Form>
                <Box className='bg-teal-500 text-white' roundedTop={'md'}>
                  <ModalHeader>Edit Item</ModalHeader>
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
                        placeholder="Enter item gender"
                      />
                      <ErrorMessage name="item_gender" component="div" className="text-red-500 text-xs italic" />
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel>Age</FormLabel>
                      <Field
                        as={Input}
                        name='item_age'
                        placeholder="Enter item age"
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

export default EditItemModal