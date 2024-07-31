import VueCookies from 'vue-cookies';

export function setCookie(token, email, role, id) {
    VueCookies.set('token', token, '7d');
    VueCookies.set('email', email, '7d');
    VueCookies.set('role', role, '7d');
    VueCookies.set('id', id, '7d');
}

export function removeCookie() {
    VueCookies.remove('token');
    VueCookies.remove('email');
    VueCookies.remove('role');
    VueCookies.remove('id');
}