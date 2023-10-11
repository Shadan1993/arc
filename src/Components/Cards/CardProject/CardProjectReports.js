import { Card, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { TransactionOrder, Left } from "@icon-park/react";
import { Basecolor, Dark_Green, Natural } from "../../../layout/Themes/Color";

const CardProjectReports = ({
  idActivity = 0,
  titleReport = "",
  statusReport = "",
  hadleAction = 0,
}) => {
  //#region check status and render text fixed
  function Status(status) {
    let statuss = status;
    switch (statuss) {
      case "AC":
        return (
          <Typography color={Dark_Green[55]} variant="body2">
            تایید شده
          </Typography>
        );
        break;
      case "PO":
        return (
          <Typography
            color="#D99513"
            bgcolor={"#FFF8E1"}
            padding={"2px 8px"}
            borderRadius={"56px"}
            variant="body2"
          >
            در انتظار بررسی
          </Typography>
        );
        break;
      case "DR":
        return (
          <Typography
            color={Basecolor[100]}
            bgcolor={Natural[500]}
            padding={"2px 8px"}
            borderRadius={"56px"}
            variant="body2"
          >
            پیش نویس
          </Typography>
        );
        break;
      case "RJ":
        return (
          <Typography
            color={"error"}
            bgcolor={"#FFF2F2"}
            padding={"2px 8px"}
            borderRadius={"56px"}
            variant="body2"
          >
            رد شده
          </Typography>
        );
        break;
    }
  }
  //#endregion
  return (
    <>
      <Card
        sx={{
          boxShadow: 0,
          borderBottom: `1px solid ${Natural[500]}`,
          // paddingX: "12px",
          margin: "4px",
        }}
      >
        <CardHeader
          sx={{
            justifyContent: "left",
            alignItems: "left",
            padding: "0px",
          }}
          avatar={
            <TransactionOrder
              theme="outline"
              size="24"
              style={{ height: "24px" }}
              strokeWidth={3}
            />
          }
          action={
            <IconButton onClick={() => hadleAction(idActivity)}>
              <Left
                theme="outline"
                size="24"
                strokeWidth={3}
                style={{ height: "24px" }}
              />
            </IconButton>
          }
          title={
            <>
              <Grid
                item
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="button">گزارش {titleReport}</Typography>
                {Status(statusReport)}
              </Grid>
            </>
          }
        />
      </Card>
    </>
  );
};

export default CardProjectReports;
