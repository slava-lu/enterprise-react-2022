import { CloseButton, Flex, Select, Text, Link } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import CartProductMeta from './CartProductMeta'

const QuantitySelect = (props) => {
  return (
    <Select maxW='64px' aria-label='Select quantity' focusBorderColor='blue.500' {...props}>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      <option value='6'>6</option>
      <option value='7'>7</option>
    </Select>
  )
}

const CartItem = (props) => {
  const { t } = useTranslation('common')
  const {
    quantity,
    item: { title, image, price },
  } = props

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify='space-between' align='center'>
      <CartProductMeta name={title} image={image} isGiftWrapping={true} />

      {/* Desktop */}
      <Flex width='full' ml={5} justify='space-between' display={{ base: 'none', md: 'flex' }}>
        <QuantitySelect value={quantity} onChange={() => {}} />
        <Text as='span' fontWeight='medium' color='gray.700'>
          {t('shop#price', { price })}
        </Text>
        <CloseButton aria-label={`Delete ${title} from cart`} onClick={() => {}} />
      </Flex>

      {/* Mobile */}
      <Flex mt='4' align='center' width='full' justify='space-between' display={{ base: 'flex', md: 'none' }}>
        <Link fontSize='sm' textDecor='underline'>
          Delete
        </Link>
        <QuantitySelect value={quantity} onChange={() => {}} />
        <Text as='span' fontWeight='medium' color='gray.700'>
          {t('shop#price', { price })}
        </Text>
      </Flex>
    </Flex>
  )
}

export default CartItem
