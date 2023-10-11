import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Project from "../../../servies/Projects/Project";
import { Btn } from "../../../Components/btn/Btn";
import TabsProjects from "./TabsProjects/TabsProjects";
import { Grid, IconButton, Typography } from "@mui/material";
import {
  Basecolor,
  Dark_Green,
  Light_Green,
  Natural,
} from "../../../layout/Themes/Color";
import { ArrowRight, LeftC, Left } from "@icon-park/react";
import { useEffect } from "react";
import { useState } from "react";
import { Separator } from "../../../Components/Utilities/Separator";
import { Notification } from "../../../Components/Notification/Notification";

const ProjectDetail = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const ProjectId = useParams();
  // region get project detail
  function getListProject() {
    try {
      Project.ProjectDetail(ProjectId.id).then((res) => {
        if (res?.Success) {
          setData(res.Data);
        } else if (!res.Success && res.Info === 403) {
          Notification(res.MessageType, res.Message);
          navigate("/");
        } else {
          Notification(res.MessageType, res.Message);
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
  useEffect(() => {
    getListProject();
  }, []); // eslint-disable-line
  //#endregion
  //#region back to project list
  function handleClickBack() {
    navigate("/");
  }
  //#endregion
  //#region PayingReports
  function handleClick() {
    navigate(`/prs-wallet/${ProjectId.id}`);
  }
  //#endregion
  //#region  handle general project info
  function handleClickInfoProject() {
    navigate(`/prs-info/${ProjectId.id}`, { state: data });
  }
  //#endregion
  return (
    <>
      <Grid container display={"flex"} className="ss02">
        <Grid
          item
          xs={12}
          sx={{
            padding: "16px",
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          <IconButton onClick={handleClickBack}>
            <ArrowRight
              theme="outline"
              size="24"
              style={{ height: "24px" }}
              strokeWidth={3}
            />
          </IconButton>
          <Typography variant="h7">{data?.name_fa}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 19px",
          }}
        >
          <Grid item>
            <Typography variant="body1">
              {data?.landowner?.full_name}
            </Typography>
            <Typography variant="caption">
              {data?.landowner?.phone_number}
            </Typography>
          </Grid>
          <Grid item>
            <Btn
              sx={{
                height: "40px",
                ".MuiButton-startIcon": {
                  marginX: "0px",
                },
              }}
              colorbase={Dark_Green[600]}
              bgcolor={Light_Green[50]}
              hoverbgcolor={Light_Green[200]}
              endIcon={
                <LeftC
                  style={{ height: "24px" }}
                  theme="filled"
                  size="24"
                  fill={`${Dark_Green[600]}`}
                  strokeWidth={3}
                />
              }
              borderstyle={`1.5px solid var(--primary-08,${Dark_Green[600]})`}
              onClick={handleClickInfoProject}
            >
              اطلاعات کلی
            </Btn>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
            marginX: "16px",
            maxHeight: "56px",
          }}
        >
          <Grid
            item
            sx={{
              padding: "25px 12px",
            }}
          >
            <Typography sx={{ color: `${Natural[200]}` }} variant="caption">
              تنخواه پروژه
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              marginY: "28px",
              color: `${Dark_Green[600]}`,
            }}
          >
            <Typography variant="h4">{Separator("5000000")}</Typography>
            <Typography
              sx={{
                padding: "8px 0px 0px 3px",
                color: `${Natural[200]}`,
              }}
              variant="caption"
            >
              توما
            </Typography>
            <Typography
              sx={{
                color: `${Natural[200]}`,
                margin: "-3px 0px 10px -10px",
              }}
              variant="caption"
            >
              ن
            </Typography>
          </Grid>
          <Grid item sx={{ padding: "17px 12px", alignItems: "center" }}>
            <IconButton onClick={handleClick} color="secondary">
              <Typography sx={{ alignItems: "center" }} variant="caption">
                گزارشات
              </Typography>
              <Left
                theme="outline"
                size="16"
                fill={`${Basecolor[100]}`}
                strokeWidth={3}
                style={{ height: "24px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: "16px",
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            marginBottom: "25px",
          }}
        >
          <TabsProjects dataPrs={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDetail;
