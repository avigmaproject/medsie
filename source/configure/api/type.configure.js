const BASE_URL = 'http://api.medsie.com/';
// const BASE_URL = 'http://medsie.ikaart.org/';

export const API = {
  LOGIN_API: BASE_URL + '//token',
  REGISTRATION_API: BASE_URL + '//token',
  VERIFY_API: BASE_URL + '//token',
  REGISTER_STORE: BASE_URL + 'api/Medsie/PostBusinessMasterData',
  CATEGORY_STORE: BASE_URL + 'api/Medsie/GetcategoryMasterData',
  ACCOUNT_SETTING: BASE_URL + 'api/Medsie/GetProfileData',
  HOME_PAGE: BASE_URL + 'api/Medsie/GetHomeDetails',
  GET_BUSINESS_DETAILS: BASE_URL + 'api/Medsie/GetBusinessMasterData',
  UPDATE_USER_DETAILS: BASE_URL + 'api/Medsie/PostUserMasterData',
  CHECK_SERVER: BASE_URL + 'api/Medsie/CheckServer',
  GET_BUSINESS_CATEGORY_LIST:
    BASE_URL + 'api/Medsie/GetBusinessMasterByLatLong',
  USER_TYPE: BASE_URL + 'api/Medsie/GetUserMasterData',
  RATING: BASE_URL + 'api/Medsie/PostRatingMasterData',
  REPLY: BASE_URL + 'api/Medsie/AddUpdateReplyReviewTrans',
  FILTER_DATA: BASE_URL + 'api/Medsie/GetBusinessMasterFilterDetails',
  FORGOT_PASSWORD: BASE_URL + 'api/Medsie/ForGotPassword',
  MANAGED_STORE: BASE_URL + 'api/Medsie/GetBusinessMasterByUserID',
};
