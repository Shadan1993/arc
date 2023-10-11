import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EveryUser, Plus } from "@icon-park/react";
import { Btn } from "../../../../../../Components/btn/Btn";
import { Grid, Typography } from "@mui/material";
import {
  Basecolor,
  Dark_Green,
  Light_Tusi,
  Natural,
} from "../../../../../../layout/Themes/Color";

const TeamReportAdd = ({ idProject, ValueTeam }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    if (location.state !== null && location.state.length > 0) {
      setTeamData(location.state);
      handleDataTeam();
    }
  }, []); // eslint-disable-line
  //#region back to project add team
  function handleClickTeam() {
    navigate("/prs-report/team", { state: { id: idProject?.id, teamData } });
  }
  //#endregion
  //#region pass data parent
  function handleDataTeam() {
    if (teamData.length > 0) {
      let temp = teamData.filter((a) => a.members.length > 0 || a.count > 0);
      return ValueTeam(temp);
    }
  }
  //#endregion
  return (
    <>
      <Grid container paddingX={"16px"}>
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
            }}
          >
            <EveryUser
              style={{ height: "24px" }}
              theme="outline"
              size="24"
              fill={Light_Tusi[700]}
            />
            <Typography
              sx={{
                paddingLeft: "4px",
                color: `${Light_Tusi[700]}`,
              }}
              variant="h7"
            >
              منابع انسانی
            </Typography>
          </Grid>
          <Grid item>
            <Btn
              sx={{
                height: "40px",
                width: "168px",
                fontSize: "14px",
                ".MuiButton-startIcon": {
                  marginX: "0px",
                },
              }}
              colorbase={Dark_Green[600]}
              bgcolor={Light_Tusi[700]}
              hoverbgcolor={Light_Tusi[600]}
              startIcon={
                <Plus theme="outline" style={{ height: "24px" }} size="24" />
              }
              onClick={handleClickTeam}
            >
              جزئیات و ثبت
            </Btn>
          </Grid>
        </Grid>
        {(location.state === null || location.state?.length === 0) && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `1.5px solid ${Natural[500]}`,
              borderRadius: "4px",
              paddingY: "10px",
            }}
          >
            <Typography variant="caption">
              موردی برای نمایش وجود ندارد.
            </Typography>
          </Grid>
        )}
        {teamData.length > 0 &&
          teamData.map(
            (item) =>
              (item.members.length > 0 || item.count > 0) && (
                <Fragment key={item.role_id}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "4px",
                      border: `1.5px solid ${Natural[500]}`,
                      paddingY: "10px",
                      marginTop: "2px",
                    }}
                  >
                    <Grid item paddingX={"15px"}>
                      <Typography variant="body2" color={Basecolor[100]}>
                        {item.role_name}
                      </Typography>
                    </Grid>
                    <Grid item paddingX={"15px"}>
                      <Typography variant="body2" color={Natural[200]}>
                        {item.count}نفر
                      </Typography>
                    </Grid>
                  </Grid>
                </Fragment>
              )
          )}
      </Grid>
    </>
  );
};

export default TeamReportAdd;
