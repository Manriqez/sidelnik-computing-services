import axios from 'axios'

const API_URL = 'http://localhost:8081/api/v1'

export const request = async ({ url, method, data, headers }) => {
  const response = await axios[method](`${API_URL}/${url}`, data, headers)
  return response
}