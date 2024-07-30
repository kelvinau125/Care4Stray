export const baseUrl = "http://192.168.0.150:8081"

// Upload File -  Cloudinary
export const cloudinaryUrl = "https://api.cloudinary.com/v1_1/{cloud name}/{resource_type}/upload"

// User Auth
export const userBaseUrl = '/care4stray/auth';

export const createUser = '/register';

export const login = '/login';

export const createUserUrl = userBaseUrl + createUser; // create user

export const loginUrl = userBaseUrl + login; // login