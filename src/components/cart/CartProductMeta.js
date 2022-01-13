import { Box, HStack, Icon, Image, Link, Stack, Text } from '@chakra-ui/react'
import { FiGift } from 'react-icons/fi'
import useTranslation from 'next-translate/useTranslation'

const CartProductMeta = (props) => {
  const { t } = useTranslation('common')
  const { isGiftWrapping, image, name } = props
  return (
    <Stack direction='row' spacing='5' width='full'>
      <Image rounded='lg' width='100px' fit='cover' src={image} alt={name} draggable='false' loading='lazy' />
      <Box pt='4'>
        <Stack spacing='0.5'>
          <Text fontWeight='medium'>{name}</Text>
        </Stack>
        {isGiftWrapping && (
          <HStack spacing='1' mt='3' color='gray.600'>
            <Icon as={FiGift} boxSize='4' />
            <Link fontSize='sm' textDecoration='underline'>
              {t('cart#add_gift')}
            </Link>
          </HStack>
        )}
      </Box>
    </Stack>
  )
}

export default CartProductMeta
