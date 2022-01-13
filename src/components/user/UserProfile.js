import { Box } from '@chakra-ui/react'
import CardHeader from './CardHeader'
import Property from './Property'

export const App = () => (
  <Box as='section' bg='gray.100' py='12' px={{ md: '8' }}>
    <Box maxW='3xl' mx='auto' bg='white' rounded={{ md: 'lg' }} shadow='base' overflow='hidden'>
      <CardHeader title='Account Info' />
      <Box>
        <Property label='Name' value='Chakra UI' />
        <Property label='Email' value='chakra-ui.sh@gmail.com' />
        <Property label='Member since' value='February, 2021' />
        <Property label='Subscription Plan' value='Starter Pro' />
      </Box>
    </Box>
  </Box>
)
