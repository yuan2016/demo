export function saveToken (value) {
  let token = window.localStorage.__token__
  if (!token) {
    window.localStorage.__token__ = value
  }
}

export function getToken () {
  let token = window.localStorage.__token__
  if (token) {
    return JSON.stringify(token)
  }
}
