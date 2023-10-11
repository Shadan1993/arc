/* eslint-disable */
import ApiBase, { ApiCatchError } from "../ApiBase";
export default {
  //#region  user phone otp
  Otp: async (body) => {
    // Clear Authorization of the ApiBase
    ApiBase.defaults.headers.Authorization = undefined;
    return ApiBase.post(`/api/v1/acrs/users/otp`, body)
      .then((response) => {
        return {
          Success: true,
        };
      })
      .catch((error) => {
        if (error.response?.status === 429) {
          return {
            Success: false,
            Info: 429,
            Message: "کد برای شما قبلا ارسال شده است لطفا منتظر بمانید ",
            MessageType: "warning",
          };
        } else {
          return ApiCatchError(error);
        }
      });
  },
  //#endregion
  //#region check phone and code otp for login user
  LoginOtp: async (body) => {
    // Clear Authorization of the ApiBase
    ApiBase.defaults.headers.Authorization = undefined;
    return ApiBase.post(`/api/v1/acrs/users/login/otp`, body)
      .then((response) => {
        if (response.data && response.data.access) {
          ApiBase.defaults.headers.Authorization = `Bearer ${response.data.access}`;
          localStorage.setItem("access-constractor", response.data.access);
          localStorage.setItem("refresh-constractor", response.data.refresh);
          localStorage.setItem(
            "user_config-constractor",
            JSON.stringify(response.data.user)
          );
        }
        return {
          Success: true,
          Message: `${response.data.user.full_name} عزیز خوش  آمدید`,
          MessageType: "success",
        };
      })
      .catch((error) => {
        return ApiCatchError(error);
      });
  },
};
