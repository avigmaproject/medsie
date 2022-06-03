import axios from "axios";
import { API } from "./type.configure";

const axiosTiming = (instance) => {
  instance.interceptors.request.use((request) => {
    // console.log('requestrequestrequest', request);
    request.ts = Date.now();
    return request;
  });

  instance.interceptors.response.use((response) => {
    const timeInMs = `${Number(Date.now() - response.config.ts).toFixed()}ms`;
    response.latency = timeInMs;
    return response;
  });
};
axiosTiming(axios);

export const register = async (data) => {
  return axios(API.REGISTRATION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const login = async (data) => {
  return axios(API.LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  })
    .then((response) => {
      console.log("Response latency: ", response.latency);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const forgotPassword = async (data) => {
  return axios(API.FORGOT_PASSWORD, {
    method: "POST",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const verify = async (data) => {
  console.log("API: ", data, API.VERIFY_API);
  return axios(API.VERIFY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const registerStore = async (data, access_token) => {
  return axios(API.REGISTER_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const categoryStore = async (access_token) => {
  return axios(API.CATEGORY_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + access_token,
    },
    data: JSON.stringify({
      Type: 1,
    }),
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const accountSettings = async (access_token) => {
  return axios(API.ACCOUNT_SETTING, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data: JSON.stringify({
      Type: 1,
    }),
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const registerStoreImage = async (data, access_token) => {
  return axios(
    // 'https://us-central1-medsie-app-vpc-host-prod.cloudfunctions.net/Medsie/upload',
    // 'https://us-central1-avgimaproject.cloudfunctions.net/Medsie/upload',
    "https://us-central1-medsie-app-vpc-host-prod.cloudfunctions.net/Medsie/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      data,
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getBusinessData = async (data, access_token) => {
  return axios(API.GET_BUSINESS_DETAILS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getBusinessListData = async (data, access_token) => {
  return axios(API.GET_BUSINESS_CATEGORY_LIST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getHomeData = async (data) => {
  return axios(API.HOME_PAGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateUserProfile = async (data, access_token) => {
  return axios(API.UPDATE_USER_DETAILS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const checkServer = async () => {
  return axios(API.CHECK_SERVER, {
    method: "POST",
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const userType = async (data, access_token) => {
  return axios(API.USER_TYPE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const rating = async (data, access_token) => {
  return axios(API.RATING, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const reply = async (data, access_token) => {
  return axios(API.REPLY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const filterData = async (data) => {
  return axios(API.FILTER_DATA, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const managedStore = async (data, access_token) => {
  return axios(API.MANAGED_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
