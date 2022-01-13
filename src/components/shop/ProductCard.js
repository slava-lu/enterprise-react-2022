import useTranslation from 'next-translate/useTranslation'
import {
  AspectRatio,
  Box,
  Flex,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import Rating from './Rating'

const ProductCard = (props) => {
  const { t } = useTranslation('common')
  const { product } = props
  const { title, image, price, rating } = product
  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })}>
      <Box>
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={title}
            draggable='false'
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
          />
        </AspectRatio>
      </Box>
      <Flex direction='column' mb={'auto !important'}>
        <Text fontWeight='medium' color='gray.700'>
          {title}
        </Text>
      </Flex>
      <Text as='span' fontWeight='medium' color='gray.700'>
        {t('shop#price', { price })}
      </Text>
      <HStack>
        <Rating rating={rating?.rate} size='sm' />
        <Text fontSize='sm' color='gray.600'>
          {t('shop#rating_count', { count: rating.count })}
        </Text>
      </HStack>
      <Stack align='center'>
        <Button colorScheme='green' isFullWidth>
          {t('shop#add_to_cart')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default ProductCard
