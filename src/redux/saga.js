import { all } from 'redux-saga/effects'
import { shopSagas } from '../modules/shop'
import { userSagas } from '../modules/user'
import { cartSagas } from '../modules/cart'

const rootSaga = function* () {
  yield all([shopSagas(), userSagas(), cartSagas()])
}

export default rootSaga
