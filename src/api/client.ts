import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 請求異常:', error)
    return Promise.reject(error)
  }
)

export default apiClient