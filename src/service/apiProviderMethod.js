import axios from 'axios';

import {
    cloudName,
    apiKey,
  } from '@/utils/accountConfig';

const header = {
    "Content-Type": "application/json; charset=utf-8",
    "accept": "application/json"
}

export async function postFileRequest(file, url) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('public_id', publicId);

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // console.log(response)

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Exception: ${error}`);
    }
}