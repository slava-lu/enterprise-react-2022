import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { triggerProductSearch, clearProductSearch } from 'modules/shop'
import {
  Flex,
  Text,
  CloseButton,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import useTranslation from 'next-translate/useTranslation'

const SearchBox = () => {
  const { t } = useTranslation('common')
  const { searchString } = useSelector(({ shop }) => shop)
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (values) => {
    dispatch(triggerProductSearch(values.search))
  }

  const clearSearch = () => {
    dispatch(clearProductSearch())
    reset()
  }

  // this is useful when we change the language
  useEffect(() => {
    if (!searchString) {
      reset()
    }
  }, [searchString])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.search}>
        <FormLabel htmlFor='search'>{t('search#title_text')}</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input
            id='search'
            placeholder={t('search#placeholder')}
            {...register('search', { minLength: { value: 3, message: t('search#error_min_lenght') } })}
          />
        </InputGroup>
        <FormErrorMessage>{errors.search && errors.search.message}</FormErrorMessage>
      </FormControl>
      <Button mb={6} mt={4} colorScheme='green' isLoading={isSubmitting} type='submit'>
        {t('search#submit_button')}
      </Button>
      {searchString && (
        <Flex p={2} bg='gray.100' align='center'>
          <Text mr={2}>{t('search#result_text')}</Text>
          <Text fontWeight='semibold' mr='auto'>
            {searchString}
          </Text>
          <CloseButton onClick={clearSearch} />
        </Flex>
      )}
    </form>
  )
}

export default SearchBox
