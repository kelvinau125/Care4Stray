
import {
    postRequestWithToken,
    getRequest,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createNewsUrl,
    getNewsListsUrl,
    getNewsDetailsUrl,
} from '@/utils/apiConfig.js';

// Create News - Admin
export async function createNews(newsDetails) {
    const url = baseUrl + createNewsUrl;

    const apiDetails = {
        title: newsDetails.title,
        author: newsDetails.author,
        content: newsDetails.details,
        pic: newsDetails.media,
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
            console.log(`Unsuccessfully in create news provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in create news provider: ${e}`);
        return false;
    }
}

// Get News List
export async function getNewsList() {
    const url = baseUrl + getNewsListsUrl;

    try {
        const response = await getRequest(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get news list provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get news list provider: ${e}`);
        return false;
    }
}

// Get News Details
export async function getNewsDetails(newsID) {
    const url = baseUrl + (getNewsDetailsUrl.replace("{newID}", newsID));

    try {
        const response = await getRequest(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get news details provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get news details provider: ${e}`);
        return false;
    }
}