// wrapper around axios to add some unification and error handling
import axios from 'axios'
import queryString from 'query-string'
import { NETWORK_TIMEOUT } from '../config/consts'

const fetchData = async (options) => {
  try {
    const result = await axios(options)
    return {
      isOk: true,
      result: result.data,
    }
  } catch (error) {
    if (error.response) {
      return {
        isOk: false,
        error: {
          message: error.message,
          status: error.response.status,
        },
      }
    } else if (error.request) {
      return {
        isOk: false,
        error: {
          message: error.message,
        },
      }
    } else {
      return {
        isOk: false,
        error: {
          message: error.message,
        },
      }
    }
  }
}

const makeRequest = ({ url: fullUrl, method, queryParams, bodyObj }) => {
  const { url, query } = queryString.parseUrl(fullUrl)
  const newQueryString = queryString.stringify({ ...query, ...queryParams })
  const newURL = newQueryString ? `${url}?${newQueryString}` : url

  return fetchData({
    url: newURL,
    method,
    data: bodyObj ? JSON.stringify(bodyObj) : null,
    timeout: NETWORK_TIMEOUT,
  })
}

export default makeRequest
