import { useSelector } from 'react-redux'
import { triggerProductList } from 'modules/shop'
import { Box } from '@chakra-ui/react'
import { ProductCard, SearchBox } from 'components/shop'
import { SimpleGrid } from '@chakra-ui/react'
import ErrorMessage from 'components/ErrorMessage'

const columns = {
  base: 2,
  md: 3,
  lg: 4,
  xl: 5,
}

const Shop = () => {
  const { productListFiltered, productList, error } = useSelector(({ shop }) => shop)
  if (error) return <ErrorMessage message={error.message} />
  if (!productList) return null
  return (
    <>
      <Box mt={6}>
        <SearchBox />
      </Box>
      <Box maxW='7xl' mx='auto' py={{ base: '6', md: '8', lg: '12' }}>
        <SimpleGrid columns={columns} columnGap={{ base: '4', md: '6' }} rowGap={{ base: '16', md: '20' }}>
          {productListFiltered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  )
}

Shop.getInitialProps = async ({ store }) => {
  store.dispatch(triggerProductList(10))
  return {
    navigateAfterSaga: false,
    title: 'title#shop_page',
  }
}

export default Shop
