import { Box, Grid, IconButton, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { ReactComponent as LogoText } from "../../assets/logo/text-logo.svg";
import { ReactComponent as LogoText1 } from "../../assets/logo/text-logo1.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "@icon-park/react";
//#region  this static view login page
const LoginBase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Grid container paddingX={"16px"}>
        {location.pathname !== "/login" && (
          <Grid
            item
            xs={12}
            rowSpacing={2}
            sx={{
              display: "flex",
              marginTop: "24px",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => navigate("/login")}>
              <ArrowRight
                theme="outline"
                style={{ height: "24px" }}
                size="24"
                strokeWidth={3}
              />
            </IconButton>
            <Typography variant="body2">تغییر شماره تلفن</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: "81px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo height={"177"} width={"157"} style={{ flexShrink: "0" }} />
          </Box>
          <Box
            sx={{
              marginTop: "0.5rem",
              display: "flex",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LogoText />
          </Box>
          <Box
            sx={{
              marginTop: "0.5rem",
              display: "flex",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LogoText1
              style={{ backgroundColor: "#213543", borderRadius: "5px" }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container paddingX={"16px"} className="ss02">
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginBase;
