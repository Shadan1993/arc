import React from "react";
import ProjectsMain from "../../pages/Projects/ProjectsMain";
import Profile from "../../pages/Profile/Profile";
import { User, BankTransfer, ShoppingMall } from "@icon-park/react";
import { Light_Green } from "../../layout/Themes/Color";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material";
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
const TabsMain = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let userInfo = {
    email: "naserazt27@gmail.com",
    full_name: "ناصر آزادبخت",
    phone_number: "09355568880",
  };
  // const checkLogin = JSON.parse(
  //   localStorage.getItem("user_config-constractor")
  // );
  // if (checkLogin === undefined || checkLogin === null) {
  //   window.location = "/login";
  //   return;
  // } else {
  return (
    <>
      <Tabs
        variant="fullWidth"
        sx={{
          bottom: 0,
        }}
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          sx: {
            top: 0,
            height: "4px",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Light_Green[700],
          },
        }}
      >
        <Tab
          sx={{ marginX: "20px" }}
          icon={
            <ShoppingMall
              theme="outline"
              size="24"
              style={{ height: "24px" }}
              strokeWidth={3}
            />
          }
          label="پروژه ها"
          {...a11yProps(0)}
        />
        <Tab
          disabled
          sx={{ marginX: "20px" }}
          icon={
            <BankTransfer
              theme="outline"
              size="24"
              strokeWidth={3}
              style={{ height: "24px" }}
            />
          }
          label="امور مابی"
          {...a11yProps(1)}
        />
        <Tab
          sx={{ marginX: "20px" }}
          icon={
            <User
              theme="outline"
              size="24"
              strokeWidth={3}
              style={{ height: "24px" }}
            />
          }
          aria-label="phone"
          label="پروفایل"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProjectsMain />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Profile dataUser={userInfo} />
      </TabPanel>
    </>
  );
  // }
};

export default TabsMain;
