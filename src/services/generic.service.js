import axios from 'axios'

const API_URL = 'https://sidelnik-backend.herokuapp.com/api/v1'

export const request = async ({ url, method, data, headers }) => {
  const response = await axios[method](`${API_URL}/${url}`, data, headers)
  return response
}
