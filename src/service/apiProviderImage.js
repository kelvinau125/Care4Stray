import {
    cloudName,
  } from '@/utils/accountConfig';

import {
    postFileRequest,
  } from '@/service/apiRequestMethod';

import {
    cloudinaryUrl,
 } from '@/utils/apiConfig.js';

const cloudinary = require('cloudinary').v2;

// Update Image
export async function updateProfilePic(file) {
    const cloudNameUrl = cloudName
    const resourceTypeUrl = "image"

    const url = cloudinaryUrl
        .replace("{cloud name}", cloudNameUrl)
        .replace("{resource_type}", resourceTypeUrl);
  
    try {
      const response = await postFileRequest(file, url);
      const code = response.code;
      const data = response.data;
      console.log(response);

      // const isFinished = await pushImageToServer(userToken, data);
      // can remove it
      const isFinished = true;

      if (isFinished) {
        if (code === 200) {
          return isFinished;
        } else {
          console.log(`Unsuccessfully upload to Cloudinary: ${code}`);
          return false;
        }
      } else {
        console.log(`Unsuccessfully upload to Cloudinary: ${code}`);
        return false;
      }
    } catch (e) {
      console.log(`Unsuccessful in provider image: ${e}`);
      return false;
    }
  }