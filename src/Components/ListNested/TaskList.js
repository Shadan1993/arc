import { useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
  ListItem,
} from "@mui/material";
import { Down, Up, DoneAll } from "@icon-park/react";
import { Dark_Green } from "../../layout/Themes/Color";
//#region this task list custom
export default function TaskList({ taskValue }) {
  const [open, setOpen] = useState(false);
  let item = taskValue;
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {item?.taskValues?.length > 0 && (
        <List sx={{ width: "100%" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemText>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingX: "16px",
                  borderLeft: `4px solid ${Dark_Green[600]}`,
                  borderRadius: "4px",
                }}
              >
                <Typography variant="h7">
                  {item?.weektitile}
                  {item?.weekcurrent && (
                    <Typography
                      color={Dark_Green[600]}
                      sx={{ marginLeft: "10px" }}
                      variant="caption"
                    >
                      {""} هفته جاری
                    </Typography>
                  )}
                </Typography>

                <Typography variant="caption">
                  {item?.taskValues.length} وظیفه
                </Typography>
              </Box>
            </ListItemText>
            {open ? (
              <Down style={{ height: "24px" }} theme="outline" size="24" />
            ) : (
              <Up style={{ height: "24px" }} theme="outline" size="24" />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {item.taskValues.map((child, index) => (
              <ListItemButton key={index} sx={{ pl: 4 }}>
                <ListItemIcon>
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
                    <Typography variant="button">{child.titleTask}</Typography>
                    <Typography variant="caption">{child.dateTask}</Typography>
                  </Box>
                </ListItemText>
              </ListItemButton>
            ))}
          </Collapse>
        </List>
      )}
    </>
  );
}
