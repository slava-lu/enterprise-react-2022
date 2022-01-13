import { Flex, Heading } from '@chakra-ui/react'

const CardHeader = (props) => {
  const { title } = props
  return (
    <Flex align='center' justify='space-between' px='6' py='4' borderBottomWidth='1px'>
      <Heading fontSize='lg'>{title}</Heading>
    </Flex>
  )
}

export default CardHeader
