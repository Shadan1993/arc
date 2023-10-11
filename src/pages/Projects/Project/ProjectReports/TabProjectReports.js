import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../../../assets/logo/project_empty.svg";
import { Btn } from "../../../../Components/btn/Btn";
import { FileAddition } from "@icon-park/react";
import { Light_Green } from "../../../../layout/Themes/Color";
import CardProjectReports from "../../../../Components/Cards/CardProject/CardProjectReports";
import { GergorianToPersian } from "../../../../Components/Utilities/DateTime";
const TabProjectReports = ({ reprotData, projectDetail }) => {
  const navigate = useNavigate();
  localStorage.setItem("projectName", projectDetail?.name_fa);
  //#region  handle click Activity detali
  const handleActivity = (ActivityId) => {};
  //#endregion
  //#region this click to add project
  function handleClick() {
    navigate(`/prs-report/add/${5}`);
  }
  //#endregion
  return (
    <>
      <Grid container display={"flex"}>
        {reprotData?.length === 0 ? (
          <>
            <Grid item xs={12} sx={{ padding: "16px" }}>
              <Box
                sx={{
                  marginTop: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Logo
                  height={"112"}
                  width={"112"}
                  style={{ flexShrink: "0" }}
                />
                <Typography color={"secondary"} variant="h7">
                  اولین گزارش را همین الان ثبت کنید.
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sx={{ marginTop: "64px" }}>
              {/* card */}
              {reprotData?.map((item) => {
                return (
                  <CardProjectReports
                    key={item.id}
                    idActivity={item.id}
                    titleReport={GergorianToPersian(item.date)}
                    statusReport={item.status}
                    hadleAction={handleActivity}
                  />
                );
              })}
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Btn
            color="secondary"
            sx={{
              height: "56px",
              marginLeft: "-5px",
              ".MuiButton-startIcon": {
                marginX: "0px",
              },
            }}
            bgcolor={Light_Green[700]}
            hoverbgcolor={Light_Green[400]}
            startIcon={
              <FileAddition
                style={{ height: "24px" }}
                theme="outline"
                size="24"
              />
            }
            // disabled={!disabledBtn}
            onClick={handleClick}
          >
            ثبت گزارش جدید
          </Btn>
        </Grid>
      </Grid>
    </>
  );
};

export default TabProjectReports;
