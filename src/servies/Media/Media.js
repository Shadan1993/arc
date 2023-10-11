/* eslint-disable */
import ApiBase, { ApiCatchError } from "../ApiBase";
export default {
  ImageAdd: async (body) => {
    ApiBase.defaults.headers.ContentType = "multipart/form-data";
    return ApiBase.post(`/api/v1/acrs/media/images/`, body)
      .then((response) => {
        return {
          Data: response.data,
          MessageType: "success",
          Success: true,
        };
      })
      .catch((error) => {
        return ApiCatchError(error);
      });
  },
  ImageDelete: async (id) => {
    return ApiBase.delete(`/api/v1/acrs/media/images/${id}/`)
      .then((response) => {
        return {
          Data: response.data,
          Success: true,
        };
      })
      .catch((error) => {
        return ApiCatchError(error);
      });
  },
};
