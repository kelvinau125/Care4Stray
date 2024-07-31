import VueCookies from 'vue-cookies';

export function setCookie(token, email, role) {
    VueCookies.set('token', token, '7d');
    VueCookies.set('email', email, '7d');
    VueCookies.set('role', role, '7d');
}

export function removeCookie() {
    VueCookies.remove('token');
    VueCookies.remove('email');
    VueCookies.remove('role');
}