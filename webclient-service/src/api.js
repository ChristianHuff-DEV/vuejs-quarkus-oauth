import axios from 'axios'
import { authService } from './auth'

/**
 * Initializes the interceptors to include the authorization header with each outoing request.
 */
export function initAxios () {
  // Add the bearer token to all outgoing requests
  // Taken from here (https://github.com/axios/axios/issues/754) since I couldn't figure it out myself...
  axios.interceptors.request.use(async (config) => {
    let accessToken = await authService.getAccessToken()
    config.headers.common.Authorization = 'Bearer ' + accessToken
    return config
  })
}

/**
 * Request the secret message from the backend-service
 */
export function getSecretMessage () {
  return axios('http://localhost:7000/api/secretMessage', {
    method: 'get'
  })
}
