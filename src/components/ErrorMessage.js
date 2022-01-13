import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

const ErrorMessage = ({ message }) => {
  return (
    <Alert status='error' mt={4}>
      <AlertIcon />
      <AlertTitle mr={2}>Something went wrong</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export default ErrorMessage
