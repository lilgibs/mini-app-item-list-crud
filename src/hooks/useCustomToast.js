import { useToast } from '@chakra-ui/react';

export function useCustomToast() {
  const toast = useToast();

  function showSuccessToast(description) {
    toast({
      position: 'top-right',
      title: "Operation successful.",
      description: description,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  function showErrorToast(description) {
    toast({
      position: 'top-right',
      title: "An error occurred.",
      description: description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return { showSuccessToast, showErrorToast };
}
