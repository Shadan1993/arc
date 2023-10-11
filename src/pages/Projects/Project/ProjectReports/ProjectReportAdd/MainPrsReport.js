import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LocaleTimeToUTC,
  PersianToGergorian,
} from "../../../../../Components/Utilities/DateTime";
import { ActivityContext } from "../../../../../Components/Context/ActivityContext";
const MainPrsReport = () => {
  const [activityContext, setActivityContext] = useState({
    project_id: "",
    activity_date: PersianToGergorian(new Date()),
    activity_time_start: LocaleTimeToUTC("08", "30"),
    activity_time_end: LocaleTimeToUTC("18", "00"),
    activity_bad_weather: false,
    activity_landowner_visite: false,
    activity_description: null,
    team: [],
    materials: [],
    cost: [],
    task: [],
    activity_images: [],
  });

  return (
    <ActivityContext.Provider value={[activityContext, setActivityContext]}>
      <Outlet />
    </ActivityContext.Provider>
  );
};

export default MainPrsReport;
