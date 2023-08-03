import React, { useState } from 'react'
import { Button, Input, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Box } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editItemAndSave } from '../features/itemSlice';
import { useCustomToast } from '../hooks/useCustomToast';

function EditItemModal({ item, isOpen, onClose }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch()
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Required'),
    item_buy_price: Yup.number().required('Required').min(0),
    item_sell_price: Yup.number().required('Required').min(0),
    image: Yup.mixed()
      .test(
        "fileSize",
        "File too large, maximum 100 KB",
        value => !value ||value && value.size <= 1024 * 102.4
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        value => !value || (value.type === "image/jpeg" || value.type === "image/png")
      ),
  })

  const handleSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
    const itemDatas = JSON.parse(localStorage.getItem('items') || '[]');
  
    if (itemDatas.some(value => value.name.toLowerCase() === values.item_name.toLowerCase() && (value.name.toLowerCase() !== item.name.toLowerCase()))) {
      setFieldError('item_name', 'Item name already exists');
      setSubmitting(false);
      return;
    }
  
    // Jika file gambar baru diupload, kita ubah ke base64, jika tidak, kita gunakan gambar yang ada sebelumnya
    let newImage = item.image;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImage = reader.result;
  
        // Jika gambar selesai diubah ke base64, kita lanjutkan proses update item
        updateItem(newImage, values, setSubmitting, resetForm);
      };
      reader.readAsDataURL(file);
    } else {
      updateItem(newImage, values, setSubmitting, resetForm);
    }
  }
  
  const updateItem = (newImage, values, setSubmitting, resetForm) => {
    const itemDatas = JSON.parse(localStorage.getItem('items') || '[]');
  
    const updatedItems = itemDatas.map(data => {
      if (data.name.toLowerCase() === item.name.toLowerCase()) {
        return {
          ...data,
          name: values.item_name,
          buy_price: values.item_buy_price,
          sell_price: values.item_sell_price,
          image: newImage,
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

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={{ base: 'xs', sm: 'lg' }}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              item_name: item ? item.name : '',
              item_buy_price: item ? item.buy_price : '',
              item_sell_price: item ? item.sell_price : '',
              image: '',
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
                    <FormLabel>Item Name</FormLabel>
                    <Field
                      as={Input}
                      name='item_name'
                      placeholder="Enter item name"
                    />
                    <ErrorMessage name="item_name" component="div" className="text-red-500 text-xs italic" />
                  </FormControl>
                  <Box className='flex gap-3'>
                    <FormControl mb={3}>
                      <FormLabel>Item Buy Price</FormLabel>
                      <Field
                        as={Input}
                        name='item_buy_price'
                        placeholder="Enter item buy price"
                      />
                      <ErrorMessage name="item_buy_price" component="div" className="text-red-500 text-xs italic" />
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel>Item Sell Price</FormLabel>
                      <Field
                        as={Input}
                        name='item_sell_price'
                        placeholder="Enter item sell price"
                      />
                      <ErrorMessage name="item_sell_price" component="div" className="text-red-500 text-xs italic" />
                    </FormControl>
                  </Box>
                  <FormControl>
                    <FormLabel>Item Image</FormLabel>
                    <div
                      onClick={() => document.getElementById(`image`).click()}
                      className='flex justify-center items-center border border-teal-500 border-dashed w-full rounded text-center cursor-pointer hover:bg-neutral-100 h-40'>
                      {previewImage ?
                        <img src={previewImage} alt="Preview" className='h-[95%]' />
                        :
                        <p className='text-teal-500 font-semibold'>Upload Image</p>
                      }
                    </div>
                    <input
                      id='image'
                      name='image'
                      type="file"
                      onChange={(event) => handleImageChange(event, setFieldValue, setFieldError)}
                      hidden
                    />
                    <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme='teal' disabled={isSubmitting}>Submit</Button>
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