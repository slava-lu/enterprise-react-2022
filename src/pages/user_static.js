import { useSelector } from 'react-redux'
import { triggerUserInfo } from 'modules/user'
import { wrapper } from '../redux/store'
import { END } from 'redux-saga'
import { Box } from '@chakra-ui/react'
import { CardHeader, Property } from 'components/user'
import ErrorMessage from 'components/ErrorMessage'

const UserStatic = () => {
  const { userInfo, error } = useSelector(({ user }) => user)
  const { email, phone, name, address } = userInfo
  const formatFullname = `${name?.firstname || ''}  ${name?.lastname || ''}`
  const formatAddress = `${address?.zipcode || ''}  ${address?.city || ''}, ${address?.street || ''}`
  if (error) return <ErrorMessage message={error.message} />
  if (!userInfo) return null
  return (
    <div>
      <Box as='section' bg='gray.100' py='8' px={{ base: '4', md: '8' }}>
        <Box maxW='3xl' mx='auto' bg='white' rounded={{ md: 'lg' }} shadow='base'>
          <CardHeader title='Account Info' />
          <Box>
            <Property label='Name' value={formatFullname} />
            <Property label='Email' value={email} />
            <Property label='Phone' value={phone} />
            <Property label='Address' value={formatAddress} />
          </Box>
        </Box>
      </Box>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(triggerUserInfo())
  store.dispatch(END)
  await store.sagaTask.toPromise()
  return {
    props: {
      title: 'title#user_page',
    },
  }
})

export default UserStatic
