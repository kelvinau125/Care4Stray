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
export const newsBaseUrl = '/admin_only';

export const createNews = '/news';

export const udpateNews = '/news/update';

export const createNewsUrl = newsBaseUrl + createNews; // create news

export const udpateNewsUrl = newsBaseUrl + udpateNews; // update news