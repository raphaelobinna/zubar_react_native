import base64 from 'react-native-base64'
import axios from 'axios'


// API Key and Secret: Found on the Dashboard of Cloudinary.
const API_KEY = "689178528841822";
const API_SECRET = "m8kdKr9U2rFKxK9LXnU9QEWUnoQ";

const URL = `https://api.cloudinary.com/v1_1/raphael380/resources/zubar_music/kcnxtjjxzdt2ztxkcoel`;

export const getVideos = (onRes, onError) => {
  console.log('getVideos');
  axios
    .get(URL, {
      headers: {
        Authorization: base64.encode(`${API_KEY}:${API_SECRET}`),
      },
    })
    .then(res => console.log('resuoustddg----',res.data.resources) )
    .catch(error => console.log('error', error.response));
};


//onRes(res.data.resources)
//onError(error)

// {
//   "asset_id": "5680665a6bfc88f29335b2f9cc61984a",
//   "audio": Object {
//     "bit_rate": "256000",
//     "channel_layout": "stereo",
//     "channels": 2,
//     "codec": "mp3",
//     "frequency": 44100,
//   },
//   "bit_rate": 256831,
//   "bytes": 5012684,
//   "created_at": "2022-07-28T16:54:54Z",
//   "duration": 156.139256,
//   "etag": "1722aab3c1ce2c3b1cc9b0edd98a9cc0",
//   "format": "mp3",
//   "frame_rate": 90000,
//   "height": 600,
//   "is_audio": false,
//   "pages": 0,
//   "placeholder": false,
//   "public_id": "uf8kazvfeq83nowvqqvc",
//   "resource_type": "video",
//   "rotation": 0,
//   "secure_url": "https://res.cloudinary.com/raphael380/video/upload/v1659027294/uf8kazvfeq83nowvqqvc.mp3",
//   "signature": "c032749e14563816888414461f5145957e399f04",
//   "tags": Array [],
//   "type": "upload",
//   "url": "http://res.cloudinary.com/raphael380/video/upload/v1659027294/uf8kazvfeq83nowvqqvc.mp3",
//   "version": 1659027294,
//   "version_id": "edf3d708d03133b21ad8da48622a431c",
//   "video": Object {
//     "codec": "mjpeg",
//     "dar": "1:1",
//     "level": -99,
//     "pix_format": "yuvj420p",
//     "profile": "Baseline",
//     "time_base": "1/90000",
//   },
//   "width": 600,
// }
