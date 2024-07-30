import {
    postRequest,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createUserUrl,
    loginUrl,
} from '@/utils/apiConfig.js';

import { setCookie } from '@/service/cookie';

// User Register
export async function createUser(firstname, lastname, email, gender, password) {
    const url = baseUrl + createUserUrl;

    const apiDetails = {
        firstName: firstname,
        lastName: lastname,
        username: email,
        password: password,
        role: "USER",
        gender: gender,
        userAvatar: "https://res.cloudinary.com/dfmnw3bin/image/upload/v1722330239/default_avatar.jpg",
    };

    try {
        const response = await postRequest(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in create user provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in create user provider: ${e}`);
        return false;
    }
}

// User Login
export async function login(email, password) {
    const url = baseUrl + loginUrl;

    const apiDetails = {
        username: email,
        password: password,
    };

    try {
        const response = await postRequest(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            const token = data.access_token;
            setCookie(token);
            return true;

        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in login provider: ${status}`);
            return false;
        }
    } catch (e) {
        console.log(`Unsuccessful in login provider: ${e}`);
        return false;
    }
}
