import jwt_decode from 'jwt-decode'

let dataToken = null
const JWT = 'hi-world:jwt'

const setToken = (data) => {
  localStorage.setItem(JWT, data)
}

const removeToken = () => {
  localStorage.removeItem(JWT)
}

export const useSession = () => {
  const token = localStorage.getItem(JWT)

  if (token) {
    const decodedToken = jwt_decode(token)
    const expiryTimeSeconds = decodedToken.exp * 1000
    const isExpired = expiryTimeSeconds < Date.now()
    if (isExpired) {
      removeToken()
    } else {
      dataToken = decodedToken
    }
  }

  return { setToken, removeToken, dataToken }
}
