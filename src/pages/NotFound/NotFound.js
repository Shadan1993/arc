import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import { Natural } from "../../layout/Themes/Color";
import { ArrowRight } from "@icon-park/react";

const NotFound = () => {
  const navigate = useNavigate();
  function handleClickBack() {
    navigate("/");
  }
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
          <Typography variant="h7">خطا</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px 19px",
          }}
          className="ss02"
        >
          <Grid paddingTop={"10%"}>
            <Typography variant="h1" color={"error"}>
              پیدا نشد 404
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
