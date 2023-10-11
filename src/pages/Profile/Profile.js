import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logo/ProfileMessage.svg";
import { Btn } from "../../Components/btn/Btn";
import { Transaction } from "@icon-park/react";
import {
  Basecolor,
  Dark_Green,
  Light_Tusi,
  Natural,
} from "../../layout/Themes/Color";

const Profile = ({ dataUser }) => {
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
            marginBottom: "25px",
          }}
        >
          <Typography variant="h7">پنل سرپرست اجرا</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: "16px",
            paddingBottom: "16px",
            borderBottom: `1px solid ${Natural[500]}`,
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              padding: "8px",
            }}
          >
            <Grid item xs={6} sx={{ flexDirection: "column" }}>
              <Grid item>
                <Typography variant="caption" sx={{ color: Natural[200] }}>
                  نام خانوادگی
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ color: Basecolor[100] }}>
                  {dataUser.full_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ flexDirection: "column" }}>
              <Grid item>
                <Typography variant="caption" sx={{ color: Natural[200] }}>
                  شماره تماس
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ color: Basecolor[100] }}>
                  {dataUser.phone_number}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ flexDirection: "column", padding: "8px" }}>
            <Grid item>
              <Typography variant="caption" sx={{ color: Natural[200] }}>
                ایمیل
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ color: Basecolor[100] }}>
                {dataUser.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginX: "16px" }}>
          <Btn
            sx={{
              height: "40px",
              ".MuiButton-startIcon": {
                marginX: "0px",
              },
            }}
            colorbase={Dark_Green[600]}
            bgcolor={Light_Tusi[700]}
            hoverbgcolor={Light_Tusi[700]}
            startIcon={
              <Transaction
                theme="outline"
                style={{ height: "24px" }}
                size="20"
                strokeWidth={3}
              />
            }
            // disabled={!disabledBtn}
            // onClick={handleClick}
          >
            شروع گفتگو جدید با پشتیبانی
          </Btn>
        </Grid>
        <Grid item xs={12} sx={{ marginX: "16px" }}>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: Natural[100] }}>
              گفتگوهای اخیر
            </Typography>
          </Grid>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
