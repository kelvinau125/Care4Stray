
import {
    postRequestWithToken,
    getRequest,
    getRequestWithToken,
    patchRequestWithToken,
    putRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createNewsUrl,
    getNewsListsUrl,
    getNewsDetailsUrl,
    udpateNewsUrl,
    updateNewsStatusUrl,
    getNewsListsAdminUrl,
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

// Get News List - User
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

// Get News List - Admin
export async function getNewsListAdmin() {
    const url = baseUrl + getNewsListsAdminUrl;

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get news list admin provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get news list admin provider: ${e}`);
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

// Update News
export async function updateNews(newsDetails) {
    const url = baseUrl + udpateNewsUrl;

    const apiDetails = newsDetails

    console.log(apiDetails)

    try {
        const response = await patchRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return true;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in update news provider: ${status}`);
            return false;
        }
    } catch (e) {
        console.log(`Unsuccessful in update news provider: ${e}`);
        return false;
    }
}

// Update News Status
export async function updateNewsStatus(newsID, status) {
    const url = baseUrl + (updateNewsStatusUrl.replace("{newID}", newsID));

    const apiDetails = {
        newsStatus: status
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
            console.log(`Unsuccessfully in update news status provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in update news status provider: ${e}`);
        return false;
    }
}