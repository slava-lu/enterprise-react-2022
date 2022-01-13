import { all, call, put, takeLatest, cancel, select } from 'redux-saga/effects'
import { getUserCart, getProductList } from 'utils/api'

const moduleName = 'cart'

const GET_USER_CART_TRIGGER = `${moduleName}/GET_USER_CART_TRIGGER`
const GET_USER_CART_REQUEST = `${moduleName}/GET_USER_CART_REQUEST`
const GET_USER_CART_SUCCESS = `${moduleName}/GET_USER_CART_SUCCESS`
const GET_USER_CART_FAILURE = `${moduleName}/GET_USER_CART_FAILURE`

export const triggerUserCart = (isServer) => ({
  type: GET_USER_CART_TRIGGER,
  isServer,
})

const initialState = {
  loading: false,
  error: false,
  userCart: false,
  productList: false,
}

export function cart(state = initialState, action) {
  const { type, productList, userCart, error } = action
  switch (type) {
    case GET_USER_CART_REQUEST:
      return { ...state, loading: true, error: false }

    case GET_USER_CART_SUCCESS:
      return { ...state, loading: false, productList, userCart, error: false }

    case GET_USER_CART_FAILURE:
      return { ...state, loading: false, error }

    default:
      return state
  }
}

const getUserCartSaga = function* () {
  yield put({ type: GET_USER_CART_REQUEST })
  try {
    const [result1, result2] = yield all([call(getProductList), call(getUserCart)])
    const isOk = result1?.isOk && result2?.isOk
    const error = result2?.error || result1?.error

    if (isOk) {
      const productList = result1?.result.reduce((result, { id, ...rest }) => ({ ...result, [id]: rest }), {})
      const userCart = result2?.result
      yield put({ type: GET_USER_CART_SUCCESS, productList, userCart })
    } else {
      yield put({ type: GET_USER_CART_FAILURE, error })
      yield cancel()
    }
  } catch (error) {
    yield put({ type: GET_USER_CART_FAILURE, error })
  }
}

export const cartSagas = function* () {
  yield all([takeLatest(GET_USER_CART_TRIGGER, getUserCartSaga)])
}
