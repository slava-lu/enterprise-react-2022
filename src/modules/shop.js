import { all, call, put, takeLatest, cancel, select } from 'redux-saga/effects'
import { getProductList } from 'utils/api'

const moduleName = 'shop'

const GET_PRODUCT_LIST_TRIGGER = `${moduleName}/GET_PRODUCT_LIST_TRIGGER`
const GET_PRODUCT_LIST_REQUEST = `${moduleName}/GET_PRODUCT_LIST_REQUEST`
const GET_PRODUCT_LIST_SUCCESS = `${moduleName}/GET_PRODUCT_LIST_SUCCESS`
const GET_PRODUCT_LIST_FAILURE = `${moduleName}/GET_PRODUCT_LIST_FAILURE`

const SEARCH_PRODUCT_LIST_TRIGGER = `${moduleName}/SEARCH_PRODUCT_LIST_TRIGGER`
const SEARCH_PRODUCT_LIST_SUCCESS = `${moduleName}/SEARCH_PRODUCT_LIST_SUCCESS`
const SEARCH_PRODUCT_LIST_FAILURE = `${moduleName}/SEARCH_PRODUCT_LIST_FAILURE`

const CLEAR_SEARCH = `${moduleName}/CLEAR_SEARCH`

export const triggerProductList = (limit) => ({
  type: GET_PRODUCT_LIST_TRIGGER,
  limit,
})
export const triggerProductSearch = (searchString) => ({
  type: SEARCH_PRODUCT_LIST_TRIGGER,
  searchString,
})

export const clearProductSearch = () => ({
  type: CLEAR_SEARCH,
})

const initialState = {
  loading: false,
  error: false,
  productList: false,
  searchString: false,
  productListFiltered: [],
}

export function shop(state = initialState, { type, result, searchString, error }) {
  switch (type) {
    case GET_PRODUCT_LIST_REQUEST:
      return { ...state, searchString: false, loading: true, error: false }

    case GET_PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, productList: result, productListFiltered: result, error: false }

    case GET_PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error }

    case SEARCH_PRODUCT_LIST_SUCCESS:
      return { ...state, productListFiltered: result, searchString, error: false }

    case CLEAR_SEARCH:
      return { ...state, productListFiltered: state.productList, searchString: false }

    default:
      return state
  }
}

const searchProductSaga = function* ({ searchString }) {
  try {
    const productList = yield select((state) => state.shop.productList)
    const result = productList.filter((el) => el.title.includes(searchString))
    yield put({ type: SEARCH_PRODUCT_LIST_SUCCESS, result, searchString })
  } catch (error) {
    yield put({ type: SEARCH_PRODUCT_LIST_FAILURE, error })
  }
}

const getProductListSaga = function* ({ limit }) {
  yield put({ type: GET_PRODUCT_LIST_REQUEST })
  try {
    const { isOk, result, error } = yield call(getProductList, limit)
    if (isOk) {
      yield put({ type: GET_PRODUCT_LIST_SUCCESS, result })
    } else {
      yield put({ type: GET_PRODUCT_LIST_FAILURE, error })
      yield cancel()
    }
  } catch (error) {
    yield put({ type: GET_PRODUCT_LIST_FAILURE, error })
  }
}

export const shopSagas = function* () {
  yield all([
    takeLatest(GET_PRODUCT_LIST_TRIGGER, getProductListSaga),
    takeLatest(SEARCH_PRODUCT_LIST_TRIGGER, searchProductSaga),
  ])
}
