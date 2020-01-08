import getCookie1 from './Getcookie1'

function cookieExists1(name) {
    if (getCookie1(name) != null) {
        return true
    }
    else if(getCookie1(name)===null)
        return false
}
 export default cookieExists1;