import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ShoppingMall, Left, Caution } from "@icon-park/react";
import {
  Dark_Green,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../layout/Themes/Color";
import { useNavigate } from "react-router-dom";
//#region this card main project
const CardProject = ({
  projectId = 0,
  titleProject = "saedd",
  endProjects = false,
  task = 0,
  done = 0,
  endReport = 0,
  handleProjectId,
}) => {
  return (
    <>
      <Card
        sx={{
          margin: "5px 12px",
          boxShadow: "none",
          borderBottom: `1px solid ${Natural[500]}`,
        }}
      >
        <CardHeader
          sx={{
            justifyContent: "left",
            alignItems: "left",
            padding: "0px",
            ".MuiCardHeader-avatar": {
              marginRight: "3px",
            },
          }}
          avatar={
            <ShoppingMall
              theme="outline"
              size="24"
              style={{ height: "24px" }}
            />
          }
          action={
            <IconButton onClick={() => handleProjectId(projectId)}>
              <Left theme="outline" size="24" style={{ height: "24px" }} />
            </IconButton>
          }
          title={<Typography variant="h7">{titleProject}</Typography>}
        />
        <CardContent sx={{ padding: "8px 0px" }}>
          <Box className="ss02" sx={{ display: "flex" }}>
            <Typography
              sx={{
                color: `${Light_Tusi[700]}`,
                background: `${Light_Tusi[50]}`,
                padding: "2px 4px",
                borderRadius: "4px 0px 0px 4px",
                height: "25px",
              }}
              variant="body2"
            >
              {task} وظیفه
            </Typography>
            <Typography
              sx={{
                color: `${Dark_Green[500]}`,
                background: `${Light_Green[50]}`,
                padding: "2px 4px",
                borderRadius: "0px 4px 4px 0px",
              }}
              variant="body2"
            >
              {done} انجام شده
            </Typography>
            {!endProjects ? (
              <Typography
                sx={{
                  color: "var(--info-2, #0771ED)",
                  background: " var(--info-1, #E3F0FF)",
                  padding: "2px 8px",
                  display: "flex",
                  borderRadius: "56px",
                  marginLeft: "6px",
                }}
                variant="body2"
              >
                در حال انجام
              </Typography>
            ) : (
              <Typography
                sx={{
                  background: `${Natural[500]}`,
                  padding: "2px 8px",
                  display: "flex",
                  borderRadius: "56px",
                  marginLeft: "8px",
                }}
                variant="body2"
              >
                اتمام پروژه
              </Typography>
            )}
          </Box>
        </CardContent>
        {endReport !== 0 && (
          <CardActions
            sx={{
              padding: "2px 4px",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              background: "var(--warning-02, #FFF8E1)",
              marginBottom: "10px",
            }}
          >
            <IconButton color="warning">
              <Caution
                theme="outline"
                size="24"
                style={{ height: "24px" }}
                strokeWidth={3}
              />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: "var(--warning-01, #D99513)" }}
            >
              {endReport} روز از آخرین گزارش گذشته است
            </Typography>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default CardProject;
