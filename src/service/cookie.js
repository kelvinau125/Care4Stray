import VueCookies from 'vue-cookies';

export function setCookie(token) {
    VueCookies.set('token', token, '7d');
}

export function removeCookie() {
    VueCookies.remove('token');
}