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
export async function uploadImage(file) {

    const url = cloudinaryUrl
        .replace("{cloud name}", cloudName)
        .replace("{resource_type}", "image");
  
    try {
      const response = await postFileRequest(file, url);
      const status = response.status;
      // const data = response.data;
      console.log(response);
      console.log(response.data.url);

      // const isFinished = await pushImageToServer(userToken, data);
      // can remove it
      const isFinished = true;

      if (isFinished) {
        if (status === 200) {
          console.log("good");
          return isFinished;
        } else {
          console.log(`Unsuccessfully upload to Cloudinary: ${response.status}`);
          return false;
        }
      } else {
        console.log(`Unsuccessfully upload to Cloudinary: ${response.status}`);
        return false;
      }
    } catch (e) {
      console.log(`Unsuccessful in provider image: ${e}`);
      return false;
    }
  }