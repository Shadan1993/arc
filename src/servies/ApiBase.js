import axios from "axios";
import "../Components/Utilities/Crypto";
const Base_Url = process.env.REACT_APP_API_BASE_URL;
const Acsses_Token = localStorage.getItem("access-constractor");
let headers = {
  Accept: "application/json",
  "Accept-Language": "fa-IR,fa;q=0.9,en-US,en;q=0.8",
};
if (Acsses_Token) {
  headers.Authorization = `Bearer ${Acsses_Token}`;
}
export default axios.create({
  baseURL: Base_Url,
  headers: headers,
});

export function ApiCatchError(error) {
  if (error.response) {
    let HandelMessage =
      error.response.data.detail === undefined
        ? error.response.data
        : error.response.data.detail;
    HandleError401(error);
    return {
      Success: false,
      Message: HandelMessage,
      MessageType: "warning",
    };
  } else if (error.code === "ERR_NETWORK") {
    return {
      Success: false,
      Message: "لطفا اینترنت خود را برسی نمایید.",
      MessageType: "error",
    };
  } else if (error.request) {
    //   The request was made but no response was received
    return {
      Success: false,
      Message: error.request.Message,
      MessageType: "error",
    };
  } else {
    //   Something happened in setting up the request that triggered an Error
    //   Log To serverrrrrrrrr
    //console.log(error);
  }
  //console.log(error.config);
}
export function HandleError401(error) {
  if (error.response.status === 401) {
    const str = `👏👏 This value fake dont try ${new Date().toISOString()}`;
    window.location = `/login/?${str.HashCods()}`;
    Promise.reject(error);
  }
}
