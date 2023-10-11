/* eslint-disable */
import ApiBase, { ApiCatchError } from "../ApiBase";
export default {
  //#region get projects list user
  ProjectList: async () => {
    return ApiBase.get(`/api/v1/acrs/projects/list`)
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
  //#endregion
  //#region get project detail
  ProjectDetail: async (ProjectId) => {
    return ApiBase.get(`/api/v1/acrs/projects/detail?project_id=${ProjectId}`)
      .then((response) => {
        return {
          Data: response.data,
          Success: true,
        };
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          return {
            Success: false,
            Info: 403,
            Message: "شما به این پروژه دسترسی ندارید",
            MessageType: "warning",
          };
        } else {
          return ApiCatchError(error);
        }
      });
  },
  //#endregion
  //#region Tools Failure
  ToolsFailure: async (body) => {
    return ApiBase.post(`/api/v1/acrs/projects/tools/failure`, body)
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
  //#endregion
  //#region post projects report add
  ProjectReportAddActivity: async (body) => {
    return ApiBase.post(`/api/v1/acrs/projects/report/add`, body)
      .then((response) => {
        return {
          Data: response.data,
          MessageType: "success",
          Success: true,
        };
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          return {
            Success: false,
            Info: 500,
            Message: "شما نمیتوانید گزارشی برای این پروژه ثبت کنید",
            MessageType: "warning",
          };
        } else {
          return ApiCatchError(error);
        }
      });
  },
  //#endregion
  //#region get list contractor role project
  ContractorRoleList: async (ProjectId) => {
    return ApiBase.get(
      `/api/v1/acrs/contractors/role/list?project_id=${ProjectId}`
    )
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
  //#endregion
  //#region get list contractor role membership project
  ContractorRoleListMemberShip: async (roleId) => {
    return ApiBase.get(
      `/api/v1/acrs/contractors/role/membership?role_id=${roleId}`
    )
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
  //#endregion
  //#region get list task project_id
  TaskList: async (projectId) => {
    return ApiBase.get(
      `/api/v1/acrs/projects/task/list?project_id=${projectId}`
    )
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
  //#endregion
};
