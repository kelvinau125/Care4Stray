
import {
    postRequest,
    putRequestWithToken,
    getRequest,
    getRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createDonationUrl,
    updateDonationStatusUrl,
    getAllDonationlistUrl,
    getAllDonationlistAdminUrl,
} from '@/utils/apiConfig.js';

import VueCookies from 'vue-cookies';

// Create News - Admin
export async function createDonation(donationAmount, Anonymously) {
    const url = baseUrl + createDonationUrl;

    const apiDetails = {
        user: {
            "id": VueCookies.get("id"),
            "role": VueCookies.get("role"),
        },
        amount: donationAmount,
        isAnonymously: Anonymously,
    };

    try {
        const response = await postRequest(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in create donation provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in create donation provider: ${e}`);
        return false;
    }
}

// Update Donation Status
export async function updateDonationStatus(donationID, status) {
    const url = baseUrl + (updateDonationStatusUrl.replace("{donationID}", donationID));

    const apiDetails = {
        donationStatus: status
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
            console.log(`Unsuccessfully in update donation status provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in update donation status provider: ${e}`);
        return false;
    }
}

// Get all donation list - donation board
export async function getAllDonationlist() {
    const url = baseUrl + getAllDonationlistUrl;

    try {
        const response = await getRequest(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get all donation list provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get all donation list provider: ${e}`);
        return false;
    }
}

// Get all donation list - admin
export async function getAllDonationlistAdmin() {
    const url = baseUrl + getAllDonationlistAdminUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get all donation list admin provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get all donation list admin provider: ${e}`);
        return false;
    }
}