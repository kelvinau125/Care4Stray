
import {
    postRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createStrayUrl,
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