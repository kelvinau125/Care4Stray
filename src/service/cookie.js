import VueCookies from 'vue-cookies';

export function setCookie(token, email) {
    VueCookies.set('token', token, '7d');
    VueCookies.set('email', email, '7d');
}

export function removeCookie() {
    VueCookies.remove('token');
    VueCookies.remove('email');
}