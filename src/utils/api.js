import makeRequest from 'utils/makeRequest'
import { API_URL } from 'config/consts'

export const getProductList = (limit) =>
  makeRequest({
    url: limit ? `${API_URL}/products?limit=${limit}` : `${API_URL}/products`,
    method: 'GET',
  })

export const getUserInfo = () =>
  makeRequest({
    url: `${API_URL}/users/1`,
    method: 'GET',
  })

export const getUserCart = () =>
  makeRequest({
    url: `${API_URL}/carts/1`,
    method: 'GET',
  })
