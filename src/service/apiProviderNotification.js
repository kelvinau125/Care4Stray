import {
    getRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    getNotificationUrl,
} from '@/utils/apiConfig.js';

import VueCookies from 'vue-cookies';

// Get Notifications
export async function getNotification() {
    const url = baseUrl + (getNotificationUrl.replace("{userID}", VueCookies.get("id"),));

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get notification provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get notification provider: ${e}`);
        return false;
    }
}
