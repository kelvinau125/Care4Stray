
import {
    postRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createPostUrl,
    getAllCreatedPostUrl,
} from '@/utils/apiConfig.js';

import VueCookies from 'vue-cookies';

// Create Post
export async function createPost(postDetails) {
    const url = baseUrl + createPostUrl;

    const apiDetails = postDetails;

    apiDetails.author = {
        id: VueCookies.get("id"),
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
            console.log(`Unsuccessfully in create post provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in create post provider: ${e}`);
        return false;
    }
}


// Get All Created Post
export async function getAllCreatedPost() {
    const url = baseUrl + getAllCreatedPostUrl;

    const apiDetails = {
        userId: VueCookies.get("id")
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
            console.log(`Unsuccessfully in get all created post provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get all created post provider: ${e}`);
        return false;
    }
}
