import axios from "axios";
export const http = axios.create({
  baseURL: 'https://beta-api-test.s360.cloud',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,

});


export const SIGNUP = "/api/signup"; //POST


export const CHANGE_NAME = (id) => {
  return `/api/myprofile/username/update/${id}`;
}; //PATCH
export const CHANGE_LOCATION = (id) => {
  return `/api/myprofile/country/update/${id}`;
}; //PATCH

export const SIGNIN = "/api/signin"; // POST

export const HOME = "/api/home"; //GET

export const VIDEO_CREATE = "/api/video/create"; //POST

export const MY_VIDEOS = "/api/myvideos/show"; //GET

export const DELETE_VIDEO = (id) => {
  return `/api/myvideo/delete/${id}`;
}; //DELETE

export const MY_SUBSCRIPTIONS = "/api/mysubscriptions/show"; //GET

export const SUBSCRIBE = (id) => {
  return `/api/subscribe/${id}`;
};

export const DELETE_SUBSCRIPTION = (id) => {
  return `/api/mysubscriptions/remove/${id}`;
}; //DELETE

export const MY_PROFILE = "/api/myprofile"; //GET

export const PHOTO_UPLOAD = "/api/propic/upload"; //POST

export const CATEGORIES = "/api/categories"; //GET

export const COUNTRIES = "https://beta-api-test.s360.cloud/api/countries"; //GET