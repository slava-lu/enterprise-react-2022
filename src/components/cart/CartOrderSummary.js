import { Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import useTranslation from 'next-translate/useTranslation'

const OrderSummaryItem = (props) => {
  const { label, value, children } = props
  return (
    <Flex justify='space-between' fontSize='sm'>
      <Text fontWeight='medium' color='gray.600'>
        {label}
      </Text>
      {value ? <Text fontWeight='medium'>{value}</Text> : children}
    </Flex>
  )
}

const CartOrderSummary = ({ priceTotal }) => {
  const { t } = useTranslation('common')
  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' width='full'>
      <Heading size='md'> {t('cart#order_summary')}</Heading>

      <Stack spacing='6'>
        <OrderSummaryItem label={t('cart#subtotal')} value={t('shop#price', { price: priceTotal })} />
        <OrderSummaryItem label={t('cart#shipping_tax')}>
          <Link href='#' textDecor='underline'>
            {t('cart#calculate_shipping')}
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label={t('cart#coupon_code')}>
          <Link href='#' textDecor='underline'>
            {t('cart#add_coupon')}
          </Link>
        </OrderSummaryItem>
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            {t('cart#total')}
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            {t('shop#price', { price: priceTotal })}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme='blue' size='lg' fontSize='md' rightIcon={<FaArrowRight />}>
        {t('cart#checkout')}
      </Button>
    </Stack>
  )
}

export default CartOrderSummary
