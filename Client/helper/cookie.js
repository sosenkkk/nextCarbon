import Cookies from 'js-cookie';

export function clearCookie(cookieName) {
    console.log(cookieName)
    Cookies.remove(cookieName)
}