import { useSelector } from 'react-redux'
import { triggerUserInfo } from 'modules/user'
import useTranslation from 'next-translate/useTranslation'
import { Box } from '@chakra-ui/react'
import { CardHeader, Property } from 'components/user'
import ErrorMessage from 'components/ErrorMessage'

const User = () => {
  const { userInfo, error } = useSelector(({ user }) => user)
  const { t } = useTranslation('common')
  const { email, phone, name, address } = userInfo
  const formatFullname = `${name?.firstname || ''}  ${name?.lastname || ''}`
  const formatAddress = `${address?.zipcode || ''}  ${address?.city || ''}, ${address?.street || ''}`
  if (error) return <ErrorMessage message={error.message} />
  if (!userInfo) return null
  return (
    <div>
      <Box as='section' bg='gray.100' py='8' px={{ base: '4', md: '8' }}>
        <Box maxW='3xl' mx='auto' bg='white' rounded={{ md: 'lg' }} shadow='base'>
          <CardHeader title={t('user#title')} />
          <Box>
            <Property label={t('user#name')} value={formatFullname} />
            <Property label={t('user#email')} value={email} />
            <Property label={t('user#phone')} value={phone} />
            <Property label={t('user#address')} value={formatAddress} />
          </Box>
        </Box>
      </Box>
    </div>
  )
}

User.getInitialProps = async ({ store }) => {
  store.dispatch(triggerUserInfo())
  return {
    title: 'title#user_page',
  }
}

export default User
