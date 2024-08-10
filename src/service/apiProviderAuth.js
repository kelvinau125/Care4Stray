import {
    postRequest,
    postRequestWithToken,
    patchRequestWithToken,
    getRequestWithToken,
    putRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createUserUrl,
    loginUrl,
    userInfoUrl,
    updateUserInfoUrl,
    checkUserInfoStatusUrl,
    getAllUserListUrl,
    updateUserStatusUrl,
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
            setCookie(data.access_token, email, data.data.role, data.data.id);
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

// User Info
export async function getUserInfo(email) {
    const url = baseUrl + userInfoUrl;

    const apiDetails = {
        username: email,
    };

    try {
        const response = await postRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in user info provider: ${status}`);
            return false;
        }
    } catch (e) {
        console.log(`Unsuccessful in user info provider: ${e}`);
        return false;
    }
}

// Update User Info
export async function updateUserInfo(profileDetails) {
    const url = baseUrl + updateUserInfoUrl;

    const apiDetails = profileDetails

    try {
        const response = await patchRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in update user info provider: ${status}`);
            return false;
        }
    } catch (e) {
        console.log(`Unsuccessful in update user info provider: ${e}`);
        return false;
    }
}

// Check User Info Status
export async function getUserInfoStatus(email) {

    const url = baseUrl + checkUserInfoStatusUrl + email

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in check user info status provider: ${status}`);
            return [];
        }

    } catch (e) {
        console.log(`Unsuccessfully in check user info status provider: ${e}`);
        return [];
    }
}

// Get All User - admin
export async function getUserList() {

    const url = baseUrl + getAllUserListUrl

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get all user provider: ${status}`);
            return [];
        }

    } catch (e) {
        console.log(`Unsuccessfully in get all user status provider: ${e}`);
        return [];
    }
}

// Update User Status - admin
export async function updateUserStatus(userID, status) {
    const url = baseUrl + (updateUserStatusUrl.replace("{userID}", userID));

    const apiDetails = {
        userStatus: status
    };

    try {
        const response = await putRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in update news status provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in update news status provider: ${e}`);
        return false;
    }
}


