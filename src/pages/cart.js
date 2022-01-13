import { useSelector } from 'react-redux'
import { triggerUserCart } from 'modules/cart'
import useTranslation from 'next-translate/useTranslation'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { CartItem, CartOrderSummary } from 'components/cart'
import ErrorMessage from 'components/ErrorMessage'

const Cart = () => {
  const { userCart, productList, error } = useSelector(({ cart }) => cart)
  const { t } = useTranslation('common')
  if (error) return <ErrorMessage message={error.message} />
  if (!userCart) return null
  const cartData = userCart?.products
  const productCount = cartData?.length
  const priceTotal = cartData ? cartData.reduce((sum, item) => sum + productList[item.productId].price, 0) : null

  return (
    <Box maxW={{ base: '3xl', lg: '7xl' }} mx='auto' px={{ base: '8', md: '12' }} py={{ base: '8', md: '12' }}>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }} spacing={{ base: '8', md: '16' }}>
        <Stack spacing={{ base: '8', md: '10' }} flex='2'>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            {t('cart#product_count', { productCount })}
          </Heading>
          <Stack spacing='6'>
            {cartData.map((item) => (
              <CartItem key={item.productId} quantity={item.quantity} item={productList[item.productId]} />
            ))}
          </Stack>
        </Stack>
        <Flex direction='column' align='center' flex='1'>
          <CartOrderSummary priceTotal={priceTotal} />
        </Flex>
      </Stack>
    </Box>
  )
}

Cart.getInitialProps = async ({ store }) => {
  store.dispatch(triggerUserCart())
  return {
    navigateAfterSaga: false,
    title: 'title#cart_page',
  }
}

export default Cart
