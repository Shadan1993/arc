import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../../../assets/logo/project_empty.svg";
import CardProjectTools from "../../../../Components/Cards/CardProject/CardProjectTools";
const ProjectTools = ({ toolsData }) => {
  let project = 0;
  return (
    <>
      <Grid container display={"flex"}>
        {project === 0 ? (
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
                  اولین تجهیزات را همین الان ثبت کنید.
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sx={{ marginTop: "74px", boxShadow: "none" }}>
              {/* card */}
              {toolsData?.map((item) => {
                return (
                  <CardProjectTools
                    key={item.id}
                    titleTools={item.title}
                    codeTools={item.id}
                    isBroken={item.is_broken}
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

export default ProjectTools;
