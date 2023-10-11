import React, { useState } from "react";
import Project from "../../../servies/Projects/Project";
import { Btn } from "../../btn/Btn";
import { ReactComponent as Logo } from "../../../assets/logo/caution.svg";
import {
  Card,
  CardHeader,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Tool, Caution, Close, CheckSmall, Setting } from "@icon-park/react";
import { Light_Green, Light_Tusi, Natural } from "../../../layout/Themes/Color";
import { Notification } from "../../Notification/Notification";
//#region  this project tools card v
const CardProjectTools = ({
  titleTools = "",
  codeTools = "",
  isBroken = false,
}) => {
  const [darwerOpen, setDarwerOpen] = useState(false);
  //#region get api Tools Failure
  function handleToolsFailure() {
    try {
      let body = {
        tools_id: codeTools,
      };
      Project.ToolsFailure(body).then((res) => {
        if (res.Data.is_broken) {
          Notification("success", "ثبت خرابی با موفقیت ثبت شد");
          setDarwerOpen(false);
        }
      });
    } catch (error) {}
  }
  //#endregion
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid var(--natural-ededed, #EDEDED)",
          margin: "4px",
          alignItems: "center",
        }}
      >
        <CardHeader
          sx={{
            justifyContent: "left",
            alignItems: "left",
            padding: "0px",
            ".MuiCardHeader-avatar": {
              marginRight: "4px",
            },
          }}
          avatar={
            <Tool
              theme="outline"
              size="24"
              style={{ height: "24px" }}
              strokeWidth={3}
            />
          }
          action={
            isBroken ? (
              <IconButton
                sx={{ paddingLeft: "4px" }}
                onClick={() =>
                  Notification("info", "درخواست شما ثبت شده لطفا منتظر بمانید")
                }
              >
                <Caution
                  theme="outline"
                  size="24"
                  fill="#D99513"
                  style={{ height: "24px" }}
                />
              </IconButton>
            ) : (
              <IconButton
                sx={{ paddingLeft: "4px" }}
                onClick={() => setDarwerOpen(!darwerOpen)}
              >
                <Setting
                  theme="outline"
                  size="24"
                  fill="#18C49B"
                  style={{ height: "24px" }}
                />
              </IconButton>
            )
          }
          title={
            <>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="button">{titleTools}</Typography>
                <Typography
                  paddingX={"4px"}
                  color={Natural[200]}
                  variant="body2"
                >
                  {codeTools}
                </Typography>
              </Grid>
            </>
          }
        />
      </Card>
      {/* drawer tools */}
      <Drawer
        anchor="bottom"
        integer="1"
        open={darwerOpen}
        onClose={() => setDarwerOpen(false)}
      >
        <Grid container sx={{ display: "flex" }}>
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              margin: "16px",
              borderBottom: `1px solid var(--natural-ededed,${Natural[500]} )`,
            }}
          >
            <Grid item sx={{ alignItems: "center" }}>
              <Typography variant="h7">اعلام خرابی</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setDarwerOpen(!darwerOpen)}>
                <Close theme="outline" size="24" style={{ height: "24px" }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo height={"88"} width={"88"} style={{ flexShrink: "0" }} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: "18px",
            }}
          >
            <Typography
              sx={{ textAlign: "center", maxWidth: "250px" }}
              variant="body2"
            >
              درصورتی که وسیله مورد نظر ایراد پیدا کرده است خرابی آن را اعلام
              کنید.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "0px 16px 0px 16px",
            }}
          >
            <Btn
              sx={{
                height: "56px",
                ".MuiButton-startIcon": {
                  marginX: "0px",
                },
              }}
              colorbase={Light_Tusi[700]}
              bgcolor={Light_Green[700]}
              hoverbgcolor={Light_Green[400]}
              startIcon={
                <CheckSmall
                  theme="outline"
                  style={{ height: "24px" }}
                  size="24"
                  strokeWidth={3}
                />
              }
              onClick={handleToolsFailure}
            >
              اعلام خرابی
            </Btn>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default CardProjectTools;
