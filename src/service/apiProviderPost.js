
import {
    postRequestWithToken,
    getRequestWithToken,
} from '@/service/apiRequestMethod';

import {
    baseUrl,
    createPostUrl,
    getAllCreatedPostUrl,
    likeorUnlikeUrl,
    getPostDetailsUrl,
    getAlladoptionPostUrl,
    createCommentUrl,
    getCommentListUrl,
    getCreatedListByUserIDUrl,
    searchPostUrl,
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

// Like Or Unlike Post
export async function likeorUnlike(postID) {
    const url = baseUrl + likeorUnlikeUrl;

    const apiDetails = {};

    apiDetails.user = {
        id: VueCookies.get("id"),
    };

    apiDetails.post = {
        postId: postID,
    };

    try {
        const response = await postRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            if(data.message == "success") {
                return true;
            } else{
                return false;
            }
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in like or unlike post provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in like or unlike post provider: ${e}`);
        return false;
    }
}

// Get Post Details
export async function getPostDetails(postId) {
    const url = baseUrl + (getPostDetailsUrl.replace("{postID}", postId));

    const apiDetails = {
        userId: VueCookies.get("id"),
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
            console.log(`Unsuccessfully in get post details provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get post details provider: ${e}`);
        return false;
    }
}

// Get All Adoption Post
export async function getAllAdoptionPost() {
    const url = baseUrl + getAlladoptionPostUrl

    const apiDetails = {
        userId: VueCookies.get("id"),
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
            console.log(`Unsuccessfully in get all adoption post provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get all adoption post provider: ${e}`);
        return false;
    }
}

// Comment Post
export async function commentPost(postID, commentDetails) {
    const url = baseUrl + createCommentUrl;

    const apiDetails = {
        comment: commentDetails
    };

    apiDetails.user = {
        id: VueCookies.get("id"),
    };

    apiDetails.post = {
        postId: postID,
    };

    try {
        const response = await postRequestWithToken(url, apiDetails);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            if(data.message == "success") {
                return true;
            } else{
                return false;
            }
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in comment post provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in comment post provider: ${e}`);
        return false;
    }
}

// Get Comment List
export async function getCommentList(postId) {
    const url = baseUrl + (getCommentListUrl.replace("{postID}", postId));

    try {
        const response = await getRequestWithToken(url);

        const status = response.status;
        const data = response.data;

        if (status === 200) {
            return data.data;
        } else if (status === 400) {
            return data.message;
        } else {
            console.log(`Unsuccessfully in get comment list provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get comment list provider: ${e}`);
        return false;
    }
}

// Get All Created Post by User ID
export async function getAllCreatedPostByUserID(userID) {
    const url = baseUrl + getCreatedListByUserIDUrl;

    const apiDetails = {
        userId: userID
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
            console.log(`Unsuccessfully in get all created post by user id provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in get all created post by user id provider: ${e}`);
        return false;
    }
}

// Search All Post
export async function searchAllPost(userID, searchKeyword) {
    const url = baseUrl + searchPostUrl;

    const apiDetails = {
        userId: parseInt(userID),
        keyword: searchKeyword,
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
            console.log(`Unsuccessfully in search post provider: ${status}`);
            return false;
        }

    } catch (e) {
        console.log(`Unsuccessful in search post provider: ${e}`);
        return false;
    }
}