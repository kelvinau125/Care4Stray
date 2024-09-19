
import {
    getRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    getUserStatissticsUrl,
    getDonationStatissticsUrl,
    getPostStatissticsUrl,
    geNotificationStatissticsUrl,
} from '@/utils/apiConfig.js';

// Get User Statistics
export async function getUserStatisstics() {
    const url = baseUrl + getUserStatissticsUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get user statistics provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in  get all user statistics provider: ${e}`);
        return false;
    }
}

// Get Donation Statistics
export async function getDonationStatisstics() {
    const url = baseUrl + getDonationStatissticsUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get donation statistics provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in  get donation statistics provider: ${e}`);
        return false;
    }
}

// Get Post Statistics
export async function getPostStatisstics() {
    const url = baseUrl + getPostStatissticsUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get post statistics provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in  get post statistics provider: ${e}`);
        return false;
    }
}

// Get Post Statistics
export async function getNotificationStatisstics() {
    const url = baseUrl + geNotificationStatissticsUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get notification statistics provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get notification statistics provider: ${e}`);
        return false;
    }
}