
import {
    postRequest,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createDonationUrl,
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

    console.log(apiDetails)

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
