import { all, call, put, takeLatest, cancel } from 'redux-saga/effects'
import { HYDRATE } from 'next-redux-wrapper'
import { getUserInfo } from 'utils/api'

const moduleName = 'user'

const GET_USER_TRIGGER = `${moduleName}/GET_USER_TRIGGER`
const GET_USER_REQUEST = `${moduleName}/GET_USER_REQUEST`
const GET_USER_SUCCESS = `${moduleName}/GET_USER_SUCCESS`
const GET_USER_FAILURE = `${moduleName}/GET_USER_FAILURE`

export const triggerUserInfo = () => ({
  type: GET_USER_TRIGGER,
})

const initialState = {
  loading: false,
  error: false,
  userInfo: false,
}

export function user(state = initialState, { type, result, error, payload }) {
  switch (type) {
    // this is only needed if you use getStaticProps like in pages/user_static.js
    case HYDRATE: {
      if (payload.user.userInfo) {
        return { ...state, ...payload.user }
      }
      return state
    }
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: false }

    case GET_USER_SUCCESS:
      return { ...state, loading: false, userInfo: result, error: false }

    case GET_USER_FAILURE:
      return { ...state, loading: false, error }

    default:
      return state
  }
}

const getUserInfoSaga = function* () {
  yield put({ type: GET_USER_REQUEST })
  try {
    const { isOk, result, error } = yield call(getUserInfo)
    if (isOk) {
      yield put({ type: GET_USER_SUCCESS, result })
    } else {
      yield put({ type: GET_USER_FAILURE, error })
      yield cancel()
    }
  } catch (error) {
    yield put({ type: GET_USER_FAILURE, error })
  }
}

export const userSagas = function* () {
  yield all([takeLatest(GET_USER_TRIGGER, getUserInfoSaga)])
}
