import { request } from './generic.service'
import axios from 'axios'

// const getUserData = (jwt) = request({ url: `authorization/userData`, method: 'post', Authorization: `Bearer ${jwt}`})
// const getUserData = (jwt) => request({ url: `authorization/userData`, method: 'post', data: {}, headers: { 'Authorization': `bearer ${jwt}` } })
const getUserData = async (jwt) => await axios.post('https://sidelnik-backend.onrender.com/api/v1/authorization/userData', {}, { headers: {
    'Authorization': `bearer ${jwt}`
}})

const login = (data) => request({ url: `authorization/login`, method: 'post', data})

const registration = (data) => request({ url: `authorization/registration`, method: 'post', data})

export { getUserData, login, registration }
