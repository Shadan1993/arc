import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActivityContext } from "../../../../../Components/Context/ActivityContext";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { Btn } from "../../../../../Components/btn/Btn";
import {
  Basecolor,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../layout/Themes/Color";
import {
  ArrowRight,
  CheckSmall,
  DoneAll,
  EveryUser,
  Eyes,
  FileDisplayOne,
  FilePdfOne,
  Funds,
  Receive,
  ThunderstormOne,
} from "@icon-park/react";
import {
  GergorianToPersian,
  UTCTimeToPersianTime,
} from "../../../../../Components/Utilities/DateTime";
import { Fragment } from "react";
import UnitMaterials from "../../../../../servies/DataStatic/UnitMaterials";
import Project from "../../../../../servies/Projects/Project";
import { useState } from "react";
import { useEffect } from "react";
import { Separator } from "../../../../../Components/Utilities/Separator";
import { useRef } from "react";
import jsPDF from "jspdf";
const FinalRegistrationReport = () => {
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  const [listTask, setListTask] = useState([]);
  const [listRole, setListRole] = useState([]);
  const refCount = useRef(0);
  const navigate = useNavigate();
  const ProjectId = useParams();

  const projectName = localStorage.getItem("projectName");
  //#region back to project list
  function handleClickBack() {
    navigate(`/prs-report/add/${ProjectId.id}`);
  }
  //#endregion
  //#region  get list role
  function GetListRole(project_id) {
    if (project_id === undefined || project_id === null) {
      return;
    } else {
      try {
        let temp = activityContext.team;
        if (temp.length === 0) return;
        Project.ContractorRoleList(project_id).then((res) => {
          if (res.Success) {
            if (temp !== undefined && temp?.length > 0) {
              res.Data.forEach((el) => {
                if (temp.find((a) => a.role_id === el.id)) {
                  listRole.push(el);
                }
              });
            }
          }
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }
    refCount.current++;
  }
  useEffect(() => {
    if (refCount.current === 0) {
      GetListRole(ProjectId.id);
    }
  }, []); // eslint-disable-line
  //#endregion
  //#region get list task
  function getListTask(Project_id) {
    if (Project_id === undefined) return;
    try {
      Project.TaskList(Project_id).then((res) => {
        if (res.Success) {
          setListTask(res.Data);
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
  useEffect(() => {
    if (ProjectId.id === undefined) {
      return;
    } else {
      getListTask(ProjectId.id);
    }
  }, []);
  //#endregion
  //#region  total cost
  function handleTotalCost() {
    if (activityContext.cost.length > 0) {
      let totalCost = 0;
      activityContext.cost.map((item) => {
        totalCost += item.amount;
      });
      return Separator(totalCost);
    }
  }
  //#endregion
  //#region Tottal member
  function totalMember() {
    if (activityContext.team.length > 0) {
      let totalMember = 0;
      activityContext.team.map((item) => {
        totalMember += item.count;
      });
      return totalMember;
    }
  }
  //#region pdf report
  // const handleClickFinalRegReportPDf = () => {
  //   const report = new jsPDF("portrait", "pt", "a4");
  //   report.html(document.querySelector("#root")).then(() => {
  //     report.save("report.pdf");
  //   });
  // };
  //#endregion
  return (
    <>
      <Grid container display={"flex"} className="ss02">
        {/*  back root project  and name project*/}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
            marginBottom: "25px",
          }}
        >
          <Grid item>
            <IconButton onClick={handleClickBack}>
              <ArrowRight
                theme="outline"
                size="24"
                strokeWidth={3}
                style={{ height: "24px" }}
              />
            </IconButton>
            <Typography variant="h7">ثبت گزارش</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px 8px",
              borderRadius: "56px",
              background: Natural[500],
              color: Basecolor[100],
            }}
          >
            <Typography variant="body2">{projectName}</Typography>
          </Grid>
        </Grid>
        {/* title  */}
        <Grid
          item
          xs={12}
          sx={{
            padding: "19px",
            alignItems: "start",
          }}
        >
          <Typography color={Basecolor[100]} variant="caption">
            در زیر میتوانید گزارش مورد نظر را با جزئیات کامل مشاهده کنید:
          </Typography>
        </Grid>
        {/* Date and Time */}
        <Grid
          item
          xs={12}
          sx={{
            padding: "19px",
            alignItems: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              paddingBottom: "12px",
              borderBottom: `1px solid ${Natural[400]}`,
            }}
            gap={1}
          >
            <Grid
              item
              sx={{
                display: "flex",
                paddingBottom: "12px",
                alignItems: "flex-start",
              }}
              gap={1}
            >
              <Typography variant="caption">تاریخ گزارش</Typography>
              <Typography variant="body1" color={Basecolor[100]}>
                {GergorianToPersian(
                  activityContext.activity_date,
                  "dddd DD MMMM YYYY"
                )}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                paddingBottom: "12px",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
              gap={1}
            >
              <Grid item display={"flex"} gap={1}>
                <Typography variant="caption">ساعت شروع </Typography>
                <Typography variant="body1">
                  {UTCTimeToPersianTime(
                    activityContext.activity_date,
                    activityContext.activity_time_start,
                    "HH:mm"
                  )}
                </Typography>
              </Grid>
              <Grid item display={"flex"} gap={1}>
                <Typography variant="caption">ساعت پایان </Typography>
                <Typography variant="body1">
                  {UTCTimeToPersianTime(
                    activityContext.activity_date,
                    activityContext.activity_time_end,
                    "HH:mm"
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Team */}
        <Grid
          item
          xs={12}
          sx={{
            paddingX: "19px",
            alignItems: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              paddingBottom: "12px",
              borderBottom: `1px solid ${Natural[400]}`,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item sx={{ gap: "8px" }}>
                <EveryUser
                  theme="outline"
                  size="24"
                  style={{ height: "24px" }}
                  fill={Light_Tusi[700]}
                  strokeWidth={3}
                />
                <Typography variant="h7">منابع انسانی</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color={Light_Tusi[700]}>
                  {activityContext.team.length} تیم - {totalMember()} نفر
                </Typography>
              </Grid>
            </Grid>
            <Grid item gap={1} sx={{ display: "flex", paddingBottom: "6px" }}>
              {listRole.length > 0 &&
                listRole.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Typography variant="body2">{item.name_fa}</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: Natural[100],
                          borderRadius: "57px",
                          background: Natural[500],
                          paddingX: "8px",
                        }}
                      >
                        {activityContext.team.length > 0 &&
                          activityContext.team.map((it) => {
                            return it.role_id === item.id && it.count;
                          })}
                      </Typography>
                    </Fragment>
                  );
                })}
            </Grid>
            {/* <Grid item sx={{ paddingBottom: "6px" }}>
              <Typography variant="caption" color={Natural[200]}>
                حسین مولاوردی | محمد علوی | شاهین حسینی | سام مولوی
              </Typography>
            </Grid> */}
            {/* <Grid item gap={1} display={"flex"}>
              <Grid item gap={1} sx={{ display: "flex", paddingBottom: "6px" }}>
                <Typography variant="body2"> کارگر ساده</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: Natural[100],
                    borderRadius: "57px",
                    background: Natural[500],
                    paddingX: "8px",
                  }}
                >
                  7 نفر
                </Typography>
              </Grid>
              <Grid
                item
                gap={1}
                sx={{ display: "flex", paddingBottom: "12px" }}
              >
                <Typography variant="body2">بنا</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: Natural[100],
                    borderRadius: "57px",
                    background: Natural[500],
                    paddingX: "8px",
                  }}
                >
                  1 نفر
                </Typography>
              </Grid>
              <Grid
                item
                gap={1}
                sx={{ display: "flex", paddingBottom: "12px" }}
              >
                <Typography variant="body2">نصاب</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: Natural[100],
                    borderRadius: "57px",
                    background: Natural[500],
                    paddingX: "8px",
                  }}
                >
                  3 نفر
                </Typography>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        {/* material */}
        <Grid
          item
          xs={12}
          sx={{
            padding: "12px 19px",
            alignItems: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              paddingBottom: "12px",
              borderBottom: `1px solid ${Natural[400]}`,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Receive
                  theme="outline"
                  size="24"
                  style={{ height: "24px" }}
                  fill={Light_Tusi[700]}
                  strokeWidth={3}
                />
                <Typography variant="h7">مصالح وارد شده</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color={Light_Tusi[700]}>
                  {activityContext.materials.length} مورد
                </Typography>
              </Grid>
            </Grid>
            <Grid item gap={1} display={"flex"}>
              {activityContext.materials.length > 0 &&
                activityContext.materials.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid
                        item
                        gap={1}
                        sx={{ display: "flex", paddingBottom: "6px" }}
                      >
                        <Typography variant="body2">{item.title}</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: Natural[100],
                            borderRadius: "57px",
                            background: Natural[500],
                            paddingX: "8px",
                          }}
                        >
                          {UnitMaterials.MaterialUnit(item.unit)} {item.count}
                        </Typography>
                      </Grid>
                    </Fragment>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        {/* task */}
        <Grid
          item
          xs={12}
          sx={{
            padding: "12px 19px",
            alignItems: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              paddingBottom: "12px",
              borderBottom: `1px solid ${Natural[400]}`,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item>
                <DoneAll
                  theme="outline"
                  size="24"
                  fill={Light_Tusi[700]}
                  style={{ height: "24px" }}
                  strokeWidth={3}
                />
                <Typography variant="h7"> شرح وظایف </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color={Light_Tusi[700]}>
                  {activityContext.task.length} مورد
                </Typography>
              </Grid>
            </Grid>
            <Grid item gap={1}>
              {activityContext.task.length > 0 &&
                activityContext.task.map((item) => {
                  return (
                    <Fragment key={item.task_id}>
                      <Grid item gap={1} sx={{ paddingBottom: "6px" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: Light_Tusi[700],
                          }}
                        >
                          {listTask.length > 0 &&
                            listTask.map((a) =>
                              a.id === item.task_id ? a.title : ""
                            )}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: Natural[200],
                          }}
                        >
                          {item.detail}
                        </Typography>
                      </Grid>
                    </Fragment>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        {/* cast */}
        <Grid
          item
          xs={12}
          sx={{
            padding: "12px 19px",
            alignItems: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              borderBottom: `1px solid ${Natural[400]}`,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item>
                <Funds
                  theme="outline"
                  size="24"
                  fill={Light_Tusi[700]}
                  style={{ height: "20px" }}
                  strokeWidth={3}
                />
                <Typography variant="h7">صورت مخارج</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color={Light_Tusi[700]}>
                  {activityContext.cost.length} مورد
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                borderBottom: `dashed 1px ${Natural[400]}`,
              }}
            >
              <Grid
                item
                gap={1}
                sx={{
                  display: "flex",
                  paddingBottom: "10px",
                  direction: "rtl",
                }}
              >
                {activityContext.cost.length > 0 &&
                  activityContext.cost.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Avatar
                          sx={{
                            bgcolor: Light_Tusi[500],
                            height: "64px",
                            width: "64px",
                          }}
                          src={item.image_base64}
                          variant="rounded"
                        >
                          خ
                        </Avatar>
                      </Fragment>
                    );
                  })}
              </Grid>

              {activityContext.cost.length > 0 &&
                activityContext.cost.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: "6px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: Light_Tusi[700],
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: Natural[200],
                          }}
                        >
                          {Separator(item.amount)}
                        </Typography>
                      </Grid>
                    </Fragment>
                  );
                })}
            </Grid>
            <Grid item>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingY: "6px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: Light_Tusi[700],
                  }}
                >
                  مجموع مخارج
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: Natural[200],
                  }}
                >
                  {handleTotalCost()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* media */}
        <Grid
          item
          xs={12}
          sx={{
            padding: "19px",
            alignItems: "start",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              paddingBottom: "12px",
              borderBottom: `1px solid ${Natural[400]}`,
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item>
                <FileDisplayOne
                  theme="outline"
                  size="24"
                  style={{ height: "24px" }}
                  fill={Light_Tusi[700]}
                  strokeWidth={3}
                />
                <Typography variant="h7"> مدیا</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color={Light_Tusi[700]}>
                  ۲ مورد
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                item
                gap={1}
                sx={{
                  display: "flex",
                  paddingBottom: "10px",
                  direction: "rtl",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: Light_Tusi[500],
                    height: "64px",
                    width: "64px",
                  }}
                  src="https://images.freeimages.com/images/large-previews/889/early-morning-web-1399473.jpg"
                  variant="rounded"
                />
                <Avatar
                  sx={{
                    bgcolor: Light_Tusi[500],
                    height: "64px",
                    width: "64px",
                  }}
                  src="https://images.freeimages.com/images/large-previews/889/early-morning-web-1399473.jpg"
                  variant="rounded"
                />
                <Avatar
                  sx={{
                    bgcolor: Light_Tusi[500],
                    height: "64px",
                    width: "64px",
                  }}
                  src="https://images.freeimages.com/images/large-previews/889/early-morning-web-1399473.jpg"
                  variant="rounded"
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  paddingBottom: "6px",
                }}
              >
                {activityContext.activity_description !== "" ? (
                  <Typography
                    variant="caption"
                    sx={{
                      color: Basecolor[100],
                    }}
                  >
                    {activityContext?.activity_description}
                  </Typography>
                ) : (
                  <Typography
                    variant="caption"
                    sx={{
                      color: Basecolor[100],
                    }}
                  >
                    این یک متن توضیح میباشد که در جهت این گزارش میتوانید در این
                    قسمت نوشته شود و با کلیک بر روی آن امکان ویرایش آن نیز وجود
                    دارد.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Employer's visit and weather conditions */}
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "flex-start",
            paddingBottom: "12px",
            marginX: "16px",
            marginBottom: "10px",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: Basecolor[100],
              }}
              gap={1}
            >
              <Eyes
                theme="outline"
                size="24"
                strokeWidth={3}
                style={{ height: "24px" }}
                strokeLinejoin="miter"
              />
              <Typography variant="body2">بازدید کارفرما از پروژه</Typography>
            </Grid>
            <Grid item>
              {activityContext.activity_landowner_visite ? (
                <Typography variant="body2" color={Light_Green[700]}>
                  بلی
                </Typography>
              ) : (
                <Typography variant="body2">خیر</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: Basecolor[100],
              }}
              gap={1}
            >
              <ThunderstormOne
                theme="outline"
                size="24"
                strokeWidth={3}
                style={{ height: "20px" }}
                strokeLinejoin="miter"
              />
              <Typography variant="body2">شرایط بد جوی آب و هوا</Typography>
            </Grid>
            <Grid item>
              {activityContext.activity_bad_weather ? (
                <Typography variant="body2" color={Light_Green[700]}>
                  بلی
                </Typography>
              ) : (
                <Typography variant="body2">خیر</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "flex-start",
            paddingBottom: "12px",
            marginBottom: "10 px",
          }}
        >
          <Grid
            item
            gap={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingBottom: "12px",
              marginX: "16px",
              marginBottom: "10px",
            }}
          >
            <Btn
              sx={{ height: "48px" }}
              colorbase={Light_Tusi[700]}
              bgcolor={Light_Green[700]}
              hoverbgcolor={Light_Green[400]}
              // onClick={handleClickFinalRegReport}
              startIcon={
                <CheckSmall
                  theme="outline"
                  style={{ height: "24px" }}
                  size="24"
                  strokeWidth={3}
                />
              }
            >
              ثبت نهایی
            </Btn>
            {/* <Btn
              sx={{
                height: "48px",
                ".MuiButton-startIcon": {
                  marginX: "0px",
                },
              }}
              colorbase={Basecolor[100]}
              bgcolor={Natural[600]}
              hoverbgcolor={Natural[600]}
              onClick={handleClickFinalRegReportPDf}
              startIcon={
                <FilePdfOne
                  theme="outline"
                 style={{ height: "24px" }}
                  size="24"
                  strokeWidth={3}
                />
              }
              borderstyle={`1.5px solid ${Basecolor[100]}`}
            >
              دانلود PDF گزارش
            </Btn> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FinalRegistrationReport;
