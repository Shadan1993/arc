import React from "react";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import { DownTwo, UpTwo } from "@icon-park/react";
import { Dark_Green, ErrorColor } from "../../../layout/Themes/Color";
//#region  this card wallet report project
const CardProjectWalletReport = ({
  titlewalletReport = "",
  datewalletReport = "",
  walletCurrent = 0,
}) => {
  const format = (numStr) => {
    if (numStr === "") return "";
    if (numStr > "9223372036854776000") {
      Notification("warning", "مقدار وارد شده اشتباه است");
      return "";
    }
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(numStr);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: 0,
          borderBottom: "1px solid var(--natural-ededed, #EDEDED)",
          paddingX: "12px",
          margin: "4px",
        }}
      >
        <Grid container justifyContent={"space-between"} padding={"16px"}>
          <Grid item sx={{ flexDirection: "column" }}>
            <Grid item>
              <Typography variant="button">{titlewalletReport}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{datewalletReport}</Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Grid item sx={{ direction: "rtl", paddingTop: "8px" }}>
              <Typography
                color={
                  parseInt(walletCurrent) < 0 ? ErrorColor[100] : Dark_Green[55]
                }
                variant="button"
              >
                {format(walletCurrent)}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                {parseInt(walletCurrent) < 0 ? (
                  <DownTwo
                    theme="outline"
                    size="24"
                    fill={ErrorColor[100]}
                    style={{ height: "24px" }}
                  />
                ) : (
                  <UpTwo
                    theme="outline"
                    size="24"
                    fill={Dark_Green[55]}
                    style={{ height: "24px" }}
                  />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CardProjectWalletReport;
