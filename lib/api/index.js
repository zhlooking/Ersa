import axios from 'axios'
import interceptor from './interceptor'
import config from 'config'


const API = interceptor(
  axios.create({ baseURL: config.baseURL })
)

API.CancelToken = axios.CancelToken

export default API
