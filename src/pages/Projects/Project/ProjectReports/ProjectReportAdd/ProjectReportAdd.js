import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActivityContext } from "../../../../../Components/Context/ActivityContext";
import Project from "../../../../../servies/Projects/Project";
import DateReportAdd from "./DateReportAdd";
import TeamReportAdd from "./team/TeamReportAdd";
import MaterialReportAdd from "./material/MaterialReportAdd";
import TaskReportAdd from "./task/TaskReportAdd";
import CastReportAdd from "./cast/CastReportAdd";
import MediaReportAdd from "./media/MediaReportAdd";
import { IOSSwitch } from "../../../../../Components/Switch/SwitchBase";
import { Btn } from "../../../../../Components/btn/Btn";
import { Notification } from "../../../../../Components/Notification/Notification";
import { FormControlLabel, Grid, IconButton, Typography } from "@mui/material";
import {
  Basecolor,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../layout/Themes/Color";
import {
  ArrowRight,
  CheckSmall,
  Eyes,
  ThunderstormOne,
} from "@icon-park/react";
const ProjectReportAdd = () => {
  const navigate = useNavigate();
  const ProjectId = useParams();
  const team1Render = useRef(0);
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  let prsDetail = localStorage.getItem("projectName");
  //#region back to project list
  function handleClickBack() {
    navigate(`/prs-detail/${ProjectId.id}`);
  }
  useEffect(() => {
    if (activityContext.project_id === "") {
      setActivityContext({
        ...activityContext,
        project_id: ProjectId.id,
      });
    }
  }, []); // eslint-disable-line
  //#endregion
  //#region value team
  const ValueTeam = (valueTeam) => {
    if (team1Render.current === 0) {
      let temp = valueTeam.map((it) => {
        return {
          role_id: it.role_id,
          members: it.members.map((cc) => {
            return cc.id;
          }),
          count: it.count,
        };
      });
      setActivityContext({
        ...activityContext,
        team: temp,
      });
      team1Render.current++;
    }
  };
  //#endregion

  //#region handle click to final registration report
  function handleClickFinalRegReport() {
    navigate(`/prs-report/reportfinalreg/${ProjectId.id}`);
  }
  //#endregion
  //#region handle Checked
  const handleChecked = (event) => {
    if (event.target.name === "activity_description") {
      setActivityContext({
        ...activityContext,
        [event.target.name]: String(event.target.value),
      });
    } else {
      setActivityContext({
        ...activityContext,
        [event.target.name]: event.target.checked,
      });
    }
  };
  //#endregion
  //#region save data
  function HandleSave() {
    try {
      Project.ProjectReportAddActivity(activityContext).then((res) => {
        if (res.Success) {
          Notification(res.MessageType, "اطلاعات با موفقیت ثبت شد.");
          navigate(`/prs-detail/${ProjectId.id}`);
        } else if (!res.Success && res.Info === 500) {
          Notification(res.MessageType, res.Message);
        } else {
          Notification(res.MessageType, "خطا در ثبت اطلاعات");
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
  //#endregion
  return (
    <ActivityContext.Provider value={[activityContext, setActivityContext]}>
      <>
        <Grid container display={"flex"} className="ss02">
          {/*  back root project  and name project*/}
          <Grid
            item
            xs={12}
            sx={{
              maxHeight: "56px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              borderBottom: `1px solid var(${Natural[500]})`,
              background: "var(--ffffff, #FFF)",
              boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
              marginBottom: "10px",
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
              <Typography variant="body2">{prsDetail}</Typography>
            </Grid>
          </Grid>
          {/* title  */}
          <Grid
            item
            xs={12}
            sx={{
              paddingX: "19px",
              alignItems: "start",
            }}
          >
            <Typography color={Basecolor[100]} variant="caption">
              جهت ثبت گزارش موارد زیر را به دقت پر کنید.
            </Typography>
          </Grid>
          {/* Date and Time */}
          <Grid
            item
            xs={12}
            sx={{
              padding: "14px 19px",
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
              <DateReportAdd />
            </Grid>
          </Grid>
          {/* Team */}
          <Grid
            item
            xs={12}
            sx={{
              paddingX: "8px",
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
              <TeamReportAdd idProject={ProjectId} ValueTeam={ValueTeam} />
            </Grid>
          </Grid>
          {/* material */}
          <Grid
            item
            xs={12}
            sx={{
              paddingX: "8px",
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
              <MaterialReportAdd />
            </Grid>
          </Grid>
          {/* task */}
          <Grid
            item
            xs={12}
            sx={{
              paddingX: "8px",
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
              <TaskReportAdd projectId={ProjectId.id} />
            </Grid>
          </Grid>
          {/* cast */}
          <Grid
            item
            xs={12}
            sx={{
              paddingX: "8px",
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
              <CastReportAdd />
            </Grid>
          </Grid>
          {/* media */}
          <Grid
            item
            xs={12}
            sx={{
              paddingX: "8px",
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
              <MediaReportAdd />
            </Grid>
          </Grid>
          {/* landowner_visite */}
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flex-start",
              padding: "12px 16px",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "4px",
                border: `1px solid ${Natural[400]}`,
                padding: "5px",
                margin: "5px",
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
                />
                <Typography variant="body2">بازدید کارفرما از پروژه</Typography>
              </Grid>
              <Grid item>
                <FormControlLabel
                  sx={{ marginRight: "0px" }}
                  control={
                    <IOSSwitch
                      name={"activity_landowner_visite"}
                      onChange={handleChecked}
                      checked={Boolean(
                        activityContext.activity_landowner_visite
                      )}
                      sx={{ m: 1 }}
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "4px",
                border: `1px solid ${Natural[400]}`,
                padding: "5px",
                margin: "5px",
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
                  style={{ height: "24px" }}
                />
                <Typography variant="body2">شرایط بد جوی آب و هوا</Typography>
              </Grid>
              <Grid item>
                <FormControlLabel
                  sx={{ marginRight: "0px" }}
                  control={
                    <IOSSwitch
                      name={"activity_bad_weather"}
                      onChange={handleChecked}
                      checked={Boolean(activityContext.activity_bad_weather)}
                      sx={{ m: 1 }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* bad_weather */}
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
              sx={{
                alignItems: "flex-start",
                paddingBottom: "12px",
                marginX: "16px",
                marginBottom: "10px",
              }}
            >
              <Typography variant="caption">
                توجه کنید در صورتی که گزارش تمام شده و میخواهید به ناظران ارسال
                کنید روی گزینه ثبت نهایی گزارش کلیک کنید.
              </Typography>
            </Grid>
          </Grid>
          {/* btn */}
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
                alignItems: "flex-start",
                paddingBottom: "12px",
                marginX: "16px",
                marginBottom: "10px",
              }}
            >
              <Grid item xs={4} sx={{ marginLeft: "12px" }}>
                <Btn
                  sx={{
                    height: "48px",
                    ".MuiButton-startIcon": {
                      marginX: "0px",
                    },
                  }}
                  colorbase={Light_Tusi[700]}
                  bgcolor={Basecolor[200]}
                  hoverbgcolor={Basecolor[200]}
                  borderstyle={`1.5px solid ${Light_Tusi[700]}`}
                  onClick={HandleSave}
                >
                  ذخیره
                </Btn>
              </Grid>
              <Grid item xs={8} sx={{ marginRight: "12px" }}>
                <Btn
                  sx={{
                    height: "48px",
                    ".MuiButton-startIcon": {
                      marginX: "0px",
                    },
                  }}
                  colorbase={Light_Tusi[700]}
                  bgcolor={Light_Green[700]}
                  hoverbgcolor={Light_Green[400]}
                  onClick={handleClickFinalRegReport}
                  startIcon={
                    <CheckSmall
                      theme="outline"
                      style={{ height: "24px" }}
                      size="24"
                      strokeWidth={3}
                    />
                  }
                >
                  مشاهده و ثبت نهایی
                </Btn>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    </ActivityContext.Provider>
  );
};

export default ProjectReportAdd;
