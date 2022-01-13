import { Box, Flex } from '@chakra-ui/react'

const Property = (props) => {
  const { label, value } = props
  return (
    <Flex as='dl' direction={{ base: 'column', sm: 'row' }} px='6' py='4' _even={{ bg: 'gray.50' }}>
      <Box as='dt' minWidth='180px'>
        {label}
      </Box>
      <Box as='dd' fontWeight='semibold'>
        {value}
      </Box>
    </Flex>
  )
}

export default Property
