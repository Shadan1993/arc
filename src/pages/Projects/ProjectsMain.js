import React, { useEffect, useState } from "react";
import Project from "../../servies/Projects/Project";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import CardProject from "../../Components/Cards/CardProject/CardProject";
import { Natural } from "../../layout/Themes/Color";
import { ReactComponent as Logo } from "../../assets/logo/superviser.svg";
const ProjectsMain = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  //#region  get api list project user
  function getListProject() {
    try {
      Project.ProjectList().then((res) => {
        if (res.Success) {
          setData(res.Data);
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
  useEffect(() => {
    getListProject();
  }, []);
  //#endregion
  //#region handle root  project detail
  const handleProjectDetail = (projectId) => {
    navigate(`prs-detail/${projectId}`);
  };
  //#endregion
  return (
    <>
      <Grid container display={"flex"}>
        <Grid
          item
          xs={12}
          sx={{
            padding: "16px",
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
            marginBottom: "12px",
          }}
        >
          <Typography variant="h7">پنل سرپرست اجرا</Typography>
        </Grid>
        {data.length === 0 ? (
          <>
            <Grid item xs={12} sx={{ padding: "16px" }}>
              <Box
                sx={{
                  marginTop: "81px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Logo
                  height={"176"}
                  width={"253"}
                  style={{ flexShrink: "0" }}
                />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
              {data.map((item) => {
                return (
                  <CardProject
                    key={item.id}
                    projectId={item.id}
                    titleProject={item.name_fa}
                    endProjects={item.is_finished}
                    task={item.total_task}
                    done={item.total_task_done}
                    endReport={item.last_report}
                    handleProjectId={handleProjectDetail}
                  />
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ProjectsMain;
