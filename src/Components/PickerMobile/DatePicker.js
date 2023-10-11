import React, { useEffect, useState } from "react";
import { DatepickerData } from "../../servies/DataStatic/DatepickerData";
import { GergorianToPersian } from "../Utilities/DateTime";
import Picker from "react-scrollable-picker";
import { Grid } from "@mui/material";
import { P2e } from "../Utilities/ConvertCountFaToEn";

export const DatePicker = ({ date, dateDef }) => {
  if (dateDef === undefined) {
    dateDef = GergorianToPersian(new Date(), "DD MM YYYY").split(" ");
  } else {
    dateDef = GergorianToPersian(new Date(dateDef), "DD MM YYYY").split(" ");
  }

  const [dateRang, setDateRang] = useState({
    day: P2e(dateDef[0]),
    month: P2e(dateDef[1]),
    year: P2e(dateDef[2]),
  });

  const [optionGroup, setOptionGroup] = useState({});
  useEffect(() => {
    setOptionGroup(DatepickerData);
  }, []);
  const handleChange = (name, value) => {
    setDateRang({
      ...dateRang,
      [name]: value,
    });
    date({ ...dateRang, [name]: value });
  };

  return (
    <>
      <Grid container sx={{ fontSize: "14px" }} className="ss02">
        <Picker
          optionGroups={optionGroup}
          valueGroups={dateRang}
          onChange={handleChange}
          height={180}
        />
      </Grid>
    </>
  );
};
