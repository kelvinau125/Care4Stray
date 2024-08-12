
import {
    postRequestWithToken,
    getRequestWithToken,
    getRequest,
    patchRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createStrayUrl,
    getAllStrayUrl,
    getAllStrayDetailsByIDUrl,
    getAllStrayListUrl,
    updateStrayDetailsUrl,
} from '@/utils/apiConfig.js';

import VueCookies from 'vue-cookies';

// Create News - Admin
export async function createAdoption(adoptionDetails) {
    const url = baseUrl + createStrayUrl;

    const apiDetails = adoptionDetails;


    apiDetails.user = {
        id: VueCookies.get("id"),
        role: VueCookies.get("role"),
    };

    try {
        const response = await postRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in create adoption provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in create adoption provider: ${e}`);
        return false;
    }
}

// Get All Stray - Admin
export async function getAllStrayList() {
    const url = baseUrl + getAllStrayUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get all stray list admin provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in  get all stray list admin provider: ${e}`);
        return false;
    }
}

// Get All Stray - Admin
export async function getStrayDetails(strayID) {
    const url = baseUrl + (getAllStrayDetailsByIDUrl.replace("{strayID}", strayID));

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get stray details by id provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get stray details by id provider: ${e}`);
        return false;
    }
}

// Get All Stray List
export async function getStrayList() {
    const url = baseUrl + getAllStrayListUrl;

    console.log(url)

    try {
        const response = await getRequest(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get stray details by id provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get stray details by id provider: ${e}`);
        return false;
    }
}

// Update Stray Details
export async function udpateStrayDetails(newsDetails) {
    const url = baseUrl + updateStrayDetailsUrl;

    const apiDetails = newsDetails

    try {
        const response = await patchRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in update news details provider: ${status}`);
            return false;
        }
    } catch (e) {
        console.log(`Unsuccessful in update news details provider: ${e}`);
        return false;
    }
}