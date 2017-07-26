export function saveToken (value) {
  let token = 'token'
  var Days = 3 / 24
  // var exp = new Date()
  // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  // document.cookie = token + '=' + value + ';expires=' + exp.toGMTString()
  setCookie(token, value, Days)
}

export function getToken () {
  let token = 'token'
  return getCookie(token)
}

export function clearToken () {
  let token = 'token'
  setCookie(token, '', -1)
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

function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
