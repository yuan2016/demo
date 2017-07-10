export function saveToken (value) {
  let token = 'token'
  var Days = 1
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = token + '=' + value + ';expires=' + exp.toGMTString()
}

export function getToken () {
  let token = 'token'
  return getCookie(token)
}

function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  } else {
    return null
  }
}
