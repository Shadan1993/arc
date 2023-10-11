import React, { useState } from "react";
import { Drawer, Grid, IconButton, Typography } from "@mui/material";
import { Light_Green, Light_Tusi, Natural } from "../../layout/Themes/Color";
import { Close, CheckSmall } from "@icon-park/react";
import { Btn } from "../btn/Btn";

const DrawerMain = ({
  title = "",
  btntitle = "",
  childrenDrawer = {},
  drawerOpen = false,
}) => {
  const [darwerOpen, setDarwerOpen] = useState(drawerOpen);

  return (
    <>
      <Drawer
        anchor="bottom"
        integer="1"
        open={drawerOpen}
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
            <Grid item>
              <Typography variant="button">{title}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setDarwerOpen(!darwerOpen)}>
                <Close
                  theme="outline"
                  size="24"
                  fill="#D99513"
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {childrenDrawer}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
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
            >
              {btntitle}
            </Btn>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default DrawerMain;
