import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'

const StyledLink = chakra(Link, {
  baseStyle: {
    p: 2,
    fontWeight: 'semibold',
    color: 'green.800',
    outline: 'none',
  },
})

const NavMenu = ({ t }) => (
  <>
    <NextLink href='/shop' passHref>
      <StyledLink>{t('menu#shop')}</StyledLink>
    </NextLink>
    <NextLink href='/cart' passHref>
      <StyledLink>{t('menu#cart')}</StyledLink>
    </NextLink>
    <NextLink href='/user' passHref>
      <StyledLink>{t('menu#user')}</StyledLink>
    </NextLink>
    <NextLink href='/shop_server' passHref>
      <StyledLink>{t('menu#shop_server')}</StyledLink>
    </NextLink>
    <NextLink href='/user_static' passHref>
      <StyledLink>{t('menu#user_static')}</StyledLink>
    </NextLink>
  </>
)

export default NavMenu
