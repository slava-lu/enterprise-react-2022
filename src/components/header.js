import { useState, useEffect } from 'react'
import { Flex, Box, Container, Link, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { NavMenu, LangSwitcher } from './menu'

const Header = (props) => {
  const { t, lang } = useTranslation('common')
  const [display, changeDisplay] = useState('none')
  const router = useRouter()

  // hiding the menu after navigation
  useEffect(() => {
    router.events.on('routeChangeStart', () => changeDisplay('none'))
    return () => {
      router.events.off('routeChangeStart', () => changeDisplay('none'))
    }
  }, [])

  const toggleMenu = () => {
    changeDisplay(display === 'none' ? 'flex' : 'none')
  }
  return (
    <>
      <Flex shrink={0} bg='green.50' h={12} align='center' display={{ base: 'none', md: 'flex', lg: 'flex' }}>
        <Container maxW='container.xl'>
          <Flex align='center'>
            <Box mr='auto'>
              <NavMenu t={t} />
            </Box>
            <Link isExternal mr={6} href='https://github.com/slava-lu/work-next-enterprise'>
              <FaGithub size={22} color='#4A5568' />
            </Link>
            <Box mr={4}>
              <LangSwitcher t={t} lang={lang} />
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Flex shrink={0} bg='green.50' h={12} align='center' display={{ base: 'flex', md: 'none' }}>
        <IconButton
          colorScheme='green'
          size='sm'
          ml={2}
          aria-label='Open Menu'
          icon={display === 'none' ? <HamburgerIcon /> : <CloseIcon />}
          display={['flex', 'flex', 'none', 'none']}
          onClick={toggleMenu}
        />
      </Flex>
      <Flex
        shrink={0}
        position='absolute'
        w={250}
        h='100vh'
        bg='green.50'
        direction='column'
        display={{ base: display, md: 'none' }}
        zIndex={20}>
        <NavMenu t={t} />
      </Flex>
    </>
  )
}
export default Header
