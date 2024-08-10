// export const baseUrl = "http://192.168.0.150:8081"
export const baseUrl = "http://localhost:8081"

// Upload File -  Cloudinary
export const cloudinaryUrl = "https://api.cloudinary.com/v1_1/{cloud name}/{resource_type}/upload"

// User Auth
export const userAuthBaseUrl = '/care4stray/auth';

export const createUser = '/register';

export const login = '/login';

export const createUserUrl = userAuthBaseUrl + createUser; // create user

export const loginUrl = userAuthBaseUrl + login; // login

// User Info
export const userInfoBaseUrl = '/care4stray/user';

export const userInfo = '/user';

export const updateUserInfo = '/update';

export const checkUserInfoStatus = '/check/';

export const userInfoUrl = userInfoBaseUrl + userInfo; // get user info

export const updateUserInfoUrl = userInfoBaseUrl + updateUserInfo; // update user info

export const checkUserInfoStatusUrl = userInfoBaseUrl + checkUserInfoStatus; // check user info status

// News
export const newsAdminBaseUrl = '/admin_only';

export const newsBaseUrl = '/care4stray';

export const createNews = '/news';

export const udpateNews = '/news/update';

export const getNewsLists = '/news/lists';

export const getNewsListsAdmin = '/news/all';

export const getNewsDetails = '/news/lists/{newID}';

export const updateNewsStatus = '/news/status/{newID}';

export const createNewsUrl = newsAdminBaseUrl + createNews; // create news

export const udpateNewsUrl = newsAdminBaseUrl + udpateNews; // update news

export const getNewsListsUrl = newsBaseUrl + getNewsLists; // get News Lists

export const getNewsListsAdminUrl = newsAdminBaseUrl + getNewsListsAdmin; // get News Lists Admin

export const getNewsDetailsUrl = newsBaseUrl + getNewsDetails; // get News Details

export const updateNewsStatusUrl = newsAdminBaseUrl + updateNewsStatus; // update news status