import axios from 'axios';

// get user cookie / set cookie
import VueCookies from 'vue-cookies';

import {
    uploadPreset,
} from '@/utils/accountConfig';

function getHeaders() {
    return {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json"
    };
}

function getHeadersToken() {
    return {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
        "Authorization": "Bearer " + VueCookies.get('token')
    };
}

export async function postRequest(url, body) {
    try {
        const response = await axios.post(url, body, {
            headers: getHeaders(),
        });

        // console.log(response)

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response;
        } else {
            throw new Error(`Exception: ${error.message}`);
        }
    }
}

export async function postRequestWithToken(url, body) {
    try {
        const response = await axios.post(url, body, {
            headers: getHeadersToken(),
        });

        // console.log(response)

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response;
        } else {
            throw new Error(`Exception: ${error.message}`);
        }
    }
}


export async function postFileRequest(file, url) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response)

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Exception: ${error}`);
    }
}