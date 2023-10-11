import React, { useState } from "react";
import { Btn } from "../../Components/btn/Btn";
import { Notification } from "../../Components/Notification/Notification";
import InputPhone from "../../Components/Input/InputPhone";
import { Light_Green, Light_Tusi, Natural } from "../../layout/Themes/Color";
import { PhoneTelephone, ArrowLeft } from "@icon-park/react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoText2 } from "../../assets/logo/text-logo2.svg";
import User from "../../servies/users/User";
import { Grid, Typography } from "@mui/material";
//#region this input phone namber login
const LoginInputPhone = () => {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [valuePhone, setValuePhone] = useState("");
  const navigate = useNavigate();
  const disabledBtnChecked = (disabledBtn, valuePhone) => {
    setDisabledBtn(disabledBtn);
    setValuePhone(valuePhone);
  };
  function handleClick() {
    try {
      let body = { phone_number: valuePhone };
      setDisabledBtn(false);
      User.Otp(body).then((res) => {
        if (res.Success) {
          localStorage.setItem("phone_namber", valuePhone);
          navigate("/verify");
        } else if (!res.Success && res.Info === 429) {
          Notification(res.MessageType, res.Message);
          navigate("/verify");
        } else {
          Notification(res.MessageType, res.Message);
        }
        setDisabledBtn(true);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <LogoText2 />
      <InputPhone
        title={"شماره موبایل"}
        endIcon={
          <PhoneTelephone
            theme="outline"
            size="24"
            strokeWidth={3}
            style={{ height: "24px" }}
          />
        }
        disabled={false}
        disabledBtnChecked={disabledBtnChecked}
      />
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
        endIcon={
          <ArrowLeft
            theme="outline"
            style={{ height: "24px" }}
            size="24"
            strokeWidth={3}
          />
        }
        disabled={!disabledBtn}
        onClick={handleClick}
      >
        ورود به پنل
      </Btn>
      <Typography
        sx={{
          bottom: 1,
          marginBottom: "30px",
          color: Natural[400],
        }}
        variant="body2"
      >
        mr.bazsazi v 0.1
      </Typography>
    </>
  );
};

export default LoginInputPhone;
