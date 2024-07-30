import {
    postRequest,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createUserUrl,
} from '@/utils/apiConfig.js';

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
    };

    console.log(apiDetails)

    try {
        const response = await postRequest(url, apiDetails);

        const status = response.status;
        const data = response.data.message;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data;
        }

    } catch (e) {
        console.log(`Unsuccessful in create user provider: ${e}`);
        return false;
    }
}