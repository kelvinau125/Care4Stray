import {
  cloudName,
} from '@/utils/accountConfig';

import {
  postFileRequest,
} from '@/service/apiRequestMethod';

import {
  cloudinaryUrl,
} from '@/utils/apiConfig.js';

// Update Image
export async function uploadImage(file, resourcetype) {

  const url = cloudinaryUrl
    .replace("{cloud name}", cloudName)
    .replace("{resource_type}", resourcetype);

  console.log(url)
  try {
    const response = await postFileRequest(file, url);
    const status = response.status;

    // const data = response.data;
    // console.log(response);
    // console.log(response.data.url);
    
    if (status === 200) {
      return response;
    } else {
      console.log(`Unsuccessfully upload to Cloudinary: ${response.status}`);
      return false;
    }
  } catch (e) {
    console.log(`Unsuccessful upload to Cloudinary: ${e}`);
    return false;
  }
}