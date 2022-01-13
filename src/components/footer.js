import { Flex, Text, Center, Container, Link } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <Flex shrink={0} bg='gray.700' h={16} align='center' color='white'>
      <Container maxW='container.xl'>
        <Center>
          <Text mr={4}>© 2022</Text>
          <Text mr={4}>|</Text>
          <Text mr={4}>{t('footer#app_text')}</Text>
          <Text mr={4}>|</Text>
          <Link href='mailto:slaval@mail.ch'>slaval@mail.ch</Link>
        </Center>
      </Container>
    </Flex>
  )
}

export default Footer
