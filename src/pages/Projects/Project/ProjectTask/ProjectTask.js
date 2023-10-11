import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TaskList from "../../../../Components/ListNested/TaskList";
import { GergorianToPersian } from "../../../../Components/Utilities/DateTime";
import { DoneAll } from "@icon-park/react";
import { Natural } from "../../../../layout/Themes/Color";
import { P2e } from "../../../../Components/Utilities/ConvertCountFaToEn";
import { Fragment } from "react";
let taskValue = [
  {
    weektitile: "هفته اول",
    taskValues: [
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
    ],
    weekcurrent: false,
  },
  {
    weektitile: "هفته دوم",
    taskValues: [
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
    ],
    weekcurrent: true,
  },
  {
    weektitile: "هفته سوم",
    taskValues: [
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
    ],
    weekcurrent: false,
  },
  {
    weektitile: "هفته چهارم",
    taskValues: [
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
      { titleTask: "رنگ کاری ساختمان", dateTask: "1402/12/04" },
    ],
    weekcurrent: false,
  },
];
const ProjectTask = ({ taskData }) => {
  // const numAscending = [...taskData].sort(
  //   (a, b) =>
  //     P2e(GergorianToPersian(a.start_at, "WW")) -
  //     P2e(GergorianToPersian(b.start_at, "WW"))
  // );

  return (
    <>
      <Grid container marginTop={"64px"}>
        <TaskList taskValue={taskValue[0]} />
        <TaskList taskValue={taskValue[1]} />
        <TaskList taskValue={taskValue[2]} />
        <TaskList taskValue={taskValue[3]} />
        {/* <List sx={{ width: "100%" }}>
          {numAscending?.map((item) => {
            return (
              <Fragment key={item.id}>
                <ListItemButton
                  key={item.id}
                  sx={{
                    padding: "0px",
                    margin: "4px",
                    borderBottom: `1px solid ${Natural[500]}`,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      alignItems: "center",
                      minWidth: "30px",
                    }}
                  >
                    {
                      <DoneAll
                        theme="outline"
                        size="24"
                        fill="#333"
                        style={{ height: "24px" }}
                      />
                    }
                  </ListItemIcon>
                  <ListItemText>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="button">{item.title}</Typography>
                      <Typography variant="caption">
                        {GergorianToPersian(item.start_at)}
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListItemButton>
              </Fragment>
            );
          })}
        </List> */}
      </Grid>
    </>
  );
};

export default ProjectTask;
