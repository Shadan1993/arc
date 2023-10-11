import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../servies/users/User";
import { Notification } from "../../Components/Notification/Notification";
import { Btn } from "../../Components/btn/Btn";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Light_Green, Light_Tusi } from "../../layout/Themes/Color";
import { ArrowLeft } from "@icon-park/react";
import { useRef } from "react";

//#region this phone verify  code
const LoginVerifyPhone = () => {
  const navigate = useNavigate();
  const phoneNumber = localStorage.getItem("phone_namber");
  // if (phoneNumber === null || phoneNumber === undefined) {
  //   navigate("/login");
  // }
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [disableBtn, setDisableBtn] = useState(true);
  const otpFieldsRef = useRef([]);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(1);
  let code = "";
  function UrlFixSHSChuncs() {
    // Danger : if ref other web site to me after logon redirect warning
    let res = "/";
    if (
      document.location.pathname !== "/login" &&
      document.location.pathname !== "/verify"
    )
      res = window.location = document.referrer;
    return res;
  }
  //#region  check user phone and code and login to app
  function handleClick() {
    otpValues.map((item) => {
      code += item;
    });
    try {
      let body = { phone_number: phoneNumber, otp: code };
      User.LoginOtp(body).then((res) => {
        if (res.Success) {
          Notification(res.MessageType, res.Message);
          window.location = UrlFixSHSChuncs();
          // navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  //#region timer for resend code and send requset
  function Timer() {
    let second = seconds;
    let minute = minutes;
    let intervalMinute = setInterval(() => {
      minute--;
      setMinutes(minute);
      second = 59;
      setSeconds(second);
      if (minute <= 0) clearInterval(intervalMinute);
    }, 60000);
    let intervalSecond = setInterval(() => {
      second--;
      setSeconds(second);
      if (second <= 0 && minute <= 0) clearInterval(intervalSecond);
      else if (second === 0) {
        setSeconds(59);
      }
    }, 1000);
  }
  function handleResend() {
    if (minutes === 0 && seconds === 0) {
      ResendApiOtp();
      ResetData();
    }
  }
  useEffect(() => {
    Timer();
    PhoneString();
  }, []); // eslint-disable-line
  function PhoneString(phoneNumber) {
    phoneNumber = String(phoneNumber).split(" ").join("");
    phoneNumber = String(phoneNumber).split("-").join("");
    flipInt(parseInt(phoneNumber));
    return phoneNumber;
  }
  function flipInt(n) {
    var digit,
      result = 0;

    while (n) {
      digit = n % 10; //  Get right-most digit. Ex. 123/10 → 12.3 → 3
      result = result * 10 + digit; //  Ex. 123 → 1230 + 4 → 1234
      n = (n / 10) | 0; //  Remove right-most digit. Ex. 123 → 12.3 → 12
    }
    return result;
  }
  //#endregion
  //#region resend user phone
  function ResendApiOtp() {
    try {
      let body = { phone_number: phoneNumber };
      User.Otp(body).then((res) => {
        if (res.Success) {
          Notification("info", "کد مجدد برای شما ارسال شد");
        } else if (!res.Success && res.Info === 429) {
          Notification(res.MessageType, res.Message);
        } else {
          Notification(res.MessageType, res.Message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion
  //#region reset page and clear input
  function ResetData() {
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }
  //#endregion
  //#region otp input
  const handleInput = (index, value) => {
    if (value.length > 1) {
      return;
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value.length === 1 && index < otpValues.length - 1) {
      otpFieldsRef.current[index + 1].focus();
    }
    if (index === 5) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };
  const handleBackspace = (index) => {
    if (otpValues[index] !== "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
    } else if (index > 0) {
      otpFieldsRef.current[index - 1].focus();
    } else if (index === 5) {
      setDisableBtn(false);
    }
  };
  //#endregion
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" className="ss02">
            کد 5 رقمی به شماره تلفن
            <Typography variant="h7">{PhoneString(phoneNumber)}</Typography>
            ارسال شد.
          </Typography>
        </Grid>
        {/* input code user */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {otpValues.map((value, index) => (
            <TextField
              key={index}
              inputProps={{ maxLength: 1 }}
              size="small"
              value={value}
              autoFocus={index === 0}
              sx={{
                ".MuiOutlinedInput-input": {
                  textAlign: "center",
                },
                height: "56px",
                width: "56px",
                marginLeft: "1.5px",
                padding: "13px 0px 14px 0px",
              }}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              inputRef={(ref) => {
                otpFieldsRef.current[index] = ref;
              }}
            />
          ))}
        </Grid>
        {/* btn page */}
        <Grid
          item
          xs={12}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          display={"flex"}
        >
          <Btn
            sx={{
              height: "56px",
              marginLeft: "0px",
              ".MuiButton-startIcon": {
                marginX: "0px",
              },
            }}
            colorbase={Light_Tusi[700]}
            bgcolor={Light_Green[700]}
            hoverbgcolor={Light_Green[400]}
            endIcon={
              <ArrowLeft
                theme="outline"
                style={{ height: "24px" }}
                size="24"
                strokeWidth={3}
              />
            }
            disabled={disableBtn}
            onClick={handleClick}
          >
            تایید ورود
          </Btn>
        </Grid>
        <Grid
          item
          xs={12}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          marginY={"10px"}
        >
          <Button
            onClick={handleResend}
            disabled={!Boolean(minutes <= 0 && seconds <= 0)}
            href="#"
          >
            ارسال مجدد تا {seconds + " : " + minutes} دیگر
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginVerifyPhone;
