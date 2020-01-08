import getCookie from './Getcookie'

function cookieExists(name) {
    if (getCookie(name) != null) {
        return true
    }
    else if(getCookie(name)===null)
        return false
}
 export default cookieExists;