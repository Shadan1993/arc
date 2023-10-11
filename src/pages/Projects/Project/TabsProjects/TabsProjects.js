import React from "react";
import ProjectTask from "../ProjectTask/ProjectTask";
import ProjectTools from "../ProjectTools/ProjectTools";
import TabProjectReports from "../ProjectReports/TabProjectReports";
import {
  Basecolor,
  Light_Tusi,
  Natural,
} from "../../../../layout/Themes/Color";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
//#region Tab panel superviser
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ marginTop: "-50px" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
//#endregion

const TabsProjects = ({ dataPrs }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const checkLogin = localStorage.getItem("user_config-constractor");
  // if (checkLogin === undefined || checkLogin === null) {
  //   window.location = "/login";
  //   return;
  // } else {
  return (
    <>
      <Tabs
        variant="fullWidth"
        textColor="secondary"
        sx={{
          position: "static",
          width: "100%",
          background: `${Basecolor[200]}`,
          // height: "68px",
          borderBottom: `1px solid ${Natural[500]}`,
        }}
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          sx: {
            height: "4px",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            background: `${Light_Tusi[700]}`,
          },
        }}
      >
        <Tab label="گزارشات پروژه" {...a11yProps(0)} />
        <Tab label="تجهیزات کارگاه" {...a11yProps(1)} />
        <Tab label="وظایف" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TabProjectReports
          projectDetail={dataPrs}
          reprotData={dataPrs?.prs_activity}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProjectTools toolsData={dataPrs?.prs_tools} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProjectTask taskData={dataPrs?.prs_task} />
      </TabPanel>
    </>
  );
  // }
};

export default TabsProjects;
