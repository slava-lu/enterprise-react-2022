import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { triggerProductList } from 'modules/shop'
import { Box } from '@chakra-ui/react'
import { ProductCard } from 'components/shop'
import { SimpleGrid } from '@chakra-ui/react'
import { wrapper } from '../redux/store'
import { END } from 'redux-saga'
import ErrorMessage from 'components/ErrorMessage'

const columns = {
  base: 2,
  md: 3,
  lg: 4,
  xl: 5,
}

const ShopServer = ({ isServer }) => {
  const { productList, error } = useSelector(({ shop }) => shop)
  const dispatch = useDispatch()

  // if this is the initial page load (isServer), dispatch the action in getServerSideProps
  //otherwise in useEffect
  useEffect(() => {
    if (!isServer) {
      dispatch(triggerProductList(10))
    }
  }, [])
  if (error) return <ErrorMessage message={error.message} />

  if (!productList) return null
  return (
    <Box maxW='7xl' mx='auto' py={{ base: '6', md: '8', lg: '12' }}>
      <SimpleGrid columns={columns} columnGap={{ base: '4', md: '6' }} rowGap={{ base: '16', md: '20' }}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  // we only run the call on the server is this is the initial first page load.
  // otherwise we use useEffect hook
  const isServer = !req.url.startsWith('/_next')

  if (isServer) {
    store.dispatch(triggerProductList(10))
    store.dispatch(END)
    await store.sagaTask.toPromise()
  }
  return {
    props: {
      isServer,
      title: 'title#shop_page',
    },
  }
})

export default ShopServer
