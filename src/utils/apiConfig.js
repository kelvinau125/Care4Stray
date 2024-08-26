// export const baseUrl = "http://192.168.0.150:8081"
export const baseUrl = "http://localhost:8081"

// Upload File -  Cloudinary
export const cloudinaryUrl = "https://api.cloudinary.com/v1_1/{cloud name}/{resource_type}/upload"

export const userBaseUrl = "/care4stray";

export const adminBaseUrl = "/admin_only";

// User Auth
export const userAuthBaseUrl = userBaseUrl + '/auth';

export const createUser = '/register';

export const login = '/login';

export const createUserUrl = userAuthBaseUrl + createUser; // create user

export const loginUrl = userAuthBaseUrl + login; // login

// User Info
export const userInfoBaseUrl = userBaseUrl + '/user';

export const userInfo = '/user';

export const updateUserInfo = '/update';

export const checkUserInfoStatus = '/check/';

export const getAllUserList = '/user/all';

export const updateUserStatus = '/status/{userID}'

export const getUserInfoAdmin = '/userid'

export const userInfoUrl = userInfoBaseUrl + userInfo; // get user info

export const updateUserInfoUrl = userInfoBaseUrl + updateUserInfo; // update user info

export const checkUserInfoStatusUrl = userInfoBaseUrl + checkUserInfoStatus; // check user info status

export const getAllUserListUrl = adminBaseUrl + getAllUserList; // get all user list - Admin

export const updateUserStatusUrl = adminBaseUrl + updateUserStatus; // get all user list - Admin

export const getUserInfoAdminUrl = adminBaseUrl + getUserInfoAdmin; // get all user list - Admin


// News

export const createNews = '/news';

export const udpateNews = '/news/update';

export const getNewsLists = '/news/lists';

export const getNewsListsAdmin = '/news/all';

export const getNewsDetails = '/news/lists/{newID}';

export const updateNewsStatus = '/news/status/{newID}';

export const getNewsListsUrl = userBaseUrl + getNewsLists; // get News Lists

export const getNewsDetailsUrl = userBaseUrl + getNewsDetails; // get News Details

export const createNewsUrl = adminBaseUrl + createNews; // create news - Admin

export const udpateNewsUrl = adminBaseUrl + udpateNews; // update news - Admin

export const getNewsListsAdminUrl = adminBaseUrl + getNewsListsAdmin; // get News Lists - Admin

export const updateNewsStatusUrl = adminBaseUrl + updateNewsStatus; // update news status - Admin

// donation

export const donationBaseUrl = userBaseUrl + '/donation';

export const donationAdminBaseUrl = adminBaseUrl + '/donation';

export const createDonation = '/create';

export const updateDonationStatus = '/updateStatus/{donationID}';

export const getAllDonationlistAdmin = '/all'

export const getAllDonationlist = '/donationList'

export const getDonationbyUserID = '/list?userId={userID}'

export const createDonationUrl = donationBaseUrl + createDonation;

export const updateDonationStatusUrl = donationBaseUrl + updateDonationStatus;

export const getAllDonationlistUrl = donationBaseUrl + getAllDonationlist;

export const getDonationbyUserIDUrl = donationBaseUrl + getDonationbyUserID;

export const getAllDonationlistAdminUrl = donationAdminBaseUrl + getAllDonationlistAdmin; // Admin

// Adoption

export const adoptionBaseUrl = userBaseUrl + '/adoption';

export const adoptionAdminBaseUrl = adminBaseUrl + '/adoption';

export const createStray = '/create_stray';

export const getAllStray = '/stray/all';

export const updateStrayStatus = '/stray/updateStatus/{strayID}';

export const updateStrayDetails = '/stray/update';

export const getAllStrayList = '/getStray';

export const getAllStrayDetailsByID = '/getStray/{strayID}';

export const createAdoption = '/create_application';

export const getAllAdoption = '/application_list';

export const getAdminAllAdoption = '/application_list_admin';

export const getAdoptionDetails = '/application/{applicationID}';

export const updateAdoption = '/application/update';

export const cancelAdoption = '/application/cancel';

export const deletePost = '/delete_stray'

export const createStrayUrl = adoptionAdminBaseUrl + createStray;

export const getAllStrayUrl = adoptionAdminBaseUrl + getAllStray;

export const updateStrayStatusUrl = adoptionAdminBaseUrl + updateStrayStatus;

export const updateStrayDetailsUrl = adoptionAdminBaseUrl + updateStrayDetails;

export const getAllStrayListUrl = adoptionBaseUrl + getAllStrayList;

export const getAllStrayDetailsByIDUrl = adoptionBaseUrl + getAllStrayDetailsByID;

export const createAdoptionUrl = adoptionBaseUrl + createAdoption;

export const getAllAdoptionUrl = adoptionBaseUrl + getAllAdoption;

export const getAdminAllAdoptionUrl = adoptionAdminBaseUrl + getAdminAllAdoption;

export const getAdoptionDetailsUrl = adoptionBaseUrl + getAdoptionDetails;

export const updateAdoptionUrl = adoptionBaseUrl + updateAdoption;

export const cancelAdoptionUrl = adoptionBaseUrl + cancelAdoption;

export const deletePostUrl = adoptionAdminBaseUrl + deletePost;

// Post
export const postBaseUrl = userBaseUrl + '/post';

export const postAdminBaseUrl = adminBaseUrl + '/post';

export const getAlladoptionPost = '/adoption-list';

export const createPost = '/create';

export const getPostDetails = '/{postID}';

export const getAllCreatedPost = '/create-list';

export const likeorUnlike = '/like';

export const createComment = '/comment'

export const getCommentList = '/comment-list/{postID}'

export const getCreatedListByUserID = '/create-list-user'

export const searchPost = '/search-posts'

export const getAlladoptionPostUrl = postBaseUrl + getAlladoptionPost;

export const createPostUrl = postBaseUrl + createPost;

export const getPostDetailsUrl = postBaseUrl + getPostDetails;

export const getAllCreatedPostUrl = postBaseUrl + getAllCreatedPost;

export const likeorUnlikeUrl = postBaseUrl + likeorUnlike;

export const createCommentUrl = postBaseUrl + createComment;

export const getCommentListUrl = postBaseUrl + getCommentList;

export const getCreatedListByUserIDUrl = postBaseUrl + getCreatedListByUserID;

export const searchPostUrl = postBaseUrl + searchPost;








