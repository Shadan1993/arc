import React, { useContext, useState } from "react";
import { ActivityContext } from "../../../../../Components/Context/ActivityContext";
import TimePicker from "../../../../../Components/PickerMobile/TimePicker";
import { DatePicker } from "../../../../../Components/PickerMobile/DatePicker";
import InputBase from "../../../../../Components/Input/InputBase";
import { Btn } from "../../../../../Components/btn/Btn";
import {
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../layout/Themes/Color";
import {
  GergorianToPersian,
  LocaleTimeToUTC,
  PersianToGergorian,
  UTCTimeToPersianTime,
} from "../../../../../Components/Utilities/DateTime";
import { Drawer, Grid, IconButton, Typography } from "@mui/material";
import { CalendarThree, CheckSmall, Close, History } from "@icon-park/react";

const DateReportAdd = () => {
  const [darwerOpenDate, setDarwerOpenDate] = useState(false);
  const [darwerOpenStartAt, setDarwerOpenStartAt] = useState(false);
  const [darwerOpenEndAt, setDarwerOpenEndAt] = useState(false);
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  let dateReport = "";
  let timeStart = "";
  let TimeEnd = "";
  //#region Date Report
  const dataDateReport = (date) => {
    let a = `${date.year}/${date.month}/${date.day}`;
    dateReport = PersianToGergorian(a);
  };
  function handleDateReport() {
    setActivityContext({ ...activityContext, activity_date: dateReport });
    setDarwerOpenDate(!darwerOpenDate);
  }
  const checkClickInputDate = () => {
    setDarwerOpenDate(true);
  };
  //#endregion
  //#region  time start at
  const TimeStartAtValue = (startAt) => {
    let temp = [];
    Object.keys(startAt).map((item) => temp.push(startAt[item]));
    timeStart = LocaleTimeToUTC(temp[0], temp[2]);
  };

  function handleTimeStartAt() {
    setActivityContext({ ...activityContext, activity_time_start: timeStart });
    setDarwerOpenStartAt(!darwerOpenStartAt);
  }
  const checkClickInputStartAt = () => {
    setDarwerOpenStartAt(true);
  };
  //#endregion
  //#region  time  end at
  const TimeEndAtValue = (endAt) => {
    let temp = [];
    Object.keys(endAt).map((item) => temp.push(endAt[item]));
    TimeEnd = LocaleTimeToUTC(temp[0], temp[2]);
  };
  function handleTimeEndAt() {
    setActivityContext({ ...activityContext, activity_time_end: TimeEnd });
    setDarwerOpenEndAt(!darwerOpenEndAt);
  }
  function checkClickInputEndAt() {
    setDarwerOpenEndAt(true);
  }
  //#endregion
  return (
    <>
      <Grid container spacing={1}>
        {/* Date */}
        <Grid item xs={12}>
          <InputBase
            title="تاریخ گزارش"
            type="text"
            startIcon={
              <CalendarThree
                theme="outline"
                size="24"
                style={{ height: "24px" }}
              />
            }
            defValue={GergorianToPersian(
              activityContext.activity_date,
              "DD MMMM YYYY"
            )}
            value={GergorianToPersian(
              activityContext.activity_date,
              "DD MMMM YYYY"
            )}
            onClickEvent={checkClickInputDate}
          />
          <Drawer
            anchor="bottom"
            integer="1"
            open={darwerOpenDate}
            onClose={() => setDarwerOpenDate(false)}
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
                  <Typography variant="button">تاریخ گزارش</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => setDarwerOpenDate(!darwerOpenDate)}
                  >
                    <Close
                      theme="outline"
                      size="24"
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
              >
                <DatePicker
                  date={dataDateReport}
                  dateDef={
                    activityContext !== undefined &&
                    activityContext?.activity_date
                  }
                />
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
                    />
                  }
                  onClick={handleDateReport}
                >
                  ثبت
                </Btn>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
        {/* Time */}
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={6}>
            <InputBase
              title="ساعت شروع"
              type="text"
              startIcon={
                <History theme="outline" size="24" style={{ height: "24px" }} />
              }
              value={UTCTimeToPersianTime(
                activityContext.activity_date,
                activityContext.activity_time_start,
                "HH:mm"
              )}
              onClickEvent={checkClickInputStartAt}
            />
            <Drawer
              anchor="bottom"
              integer="1"
              open={darwerOpenStartAt}
              onClose={() => setDarwerOpenStartAt(false)}
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
                    <Typography variant="button">ساعت شروع</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => setDarwerOpenStartAt(!darwerOpenStartAt)}
                    >
                      <Close
                        theme="outline"
                        size="24"
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
                >
                  <TimePicker
                    time={TimeStartAtValue}
                    def={activityContext.activity_time_start}
                  />
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
                    onClick={handleTimeStartAt}
                  >
                    ثبت
                  </Btn>
                </Grid>
              </Grid>
            </Drawer>
          </Grid>
          <Grid item xs={6} paddingLeft={"5px"}>
            <InputBase
              title="ساعت پایان "
              type="text"
              startIcon={
                <History theme="outline" size="24" style={{ height: "24px" }} />
              }
              value={UTCTimeToPersianTime(
                activityContext.activity_date,
                activityContext.activity_time_end,
                "HH:mm"
              )}
              onClickEvent={checkClickInputEndAt}
            />
            <Drawer
              anchor="bottom"
              integer="1"
              open={darwerOpenEndAt}
              onClose={() => setDarwerOpenEndAt(false)}
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
                    <Typography variant="button">ساعت پایان</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => setDarwerOpenEndAt(!darwerOpenEndAt)}
                    >
                      <Close
                        theme="outline"
                        size="24"
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
                >
                  <TimePicker
                    time={TimeEndAtValue}
                    def={LocaleTimeToUTC("18", "00")}
                  />
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
                    onClick={handleTimeEndAt}
                  >
                    ثبت
                  </Btn>
                </Grid>
              </Grid>
            </Drawer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DateReportAdd;
