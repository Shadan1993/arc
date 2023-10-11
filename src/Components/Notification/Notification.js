import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckOne, CloseOne, Attention, Info } from "@icon-park/react";

export const NotifType = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  DEFAULT: "default",
};
//#region  this alert toastify custom
export function Notification(intype = "info", message = "") {
  const options = {
    style: {
      fontFamily: "IRANYekanX",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "180%",
      borderRadius: "4px",
      border: "1px solid ",
      background: "",
      color: "",
      margin: "5px 5%",
    },
    type: intype,
    icon: () => <Info theme="outline" size="24" style={{ height: "24px" }} />,
  };
  switch (intype) {
    case "success":
      options.style.background = "var(--success-background, #E3FFF2)";
      options.style.border = "1px solid var(--success-dark, #00966D)";
      options.style.color = "var(--success-01, #00966D)";
      options.icon = () => (
        <CheckOne theme="outline" style={{ height: "24px" }} size="24" />
      );
      break;
    case "error":
      options.style.background = "var(--error-02, #FFF2F2)";
      options.style.border = "1px solid var(--error-01, #C30000)";
      options.style.color = "var(--error-01, #C30000)";
      options.icon = () => (
        <CloseOne theme="outline" style={{ height: "24px" }} size="24" />
      );
      break;
    case "warning":
      options.style.background = "var(--warning-background, #FFF8E1)";
      options.style.border = "1px solid var(--warning-dark, #CF8C09)";
      options.style.color = "var(--warning-01, #D99513)";
      options.icon = () => (
        <Attention theme="outline" style={{ height: "24px" }} size="24" />
      );
      break;
    case "info":
      options.style.background = "var(--info-1, #E3F0FF)";
      options.style.border = "1px solid var(--info-2, #0771ED)";
      options.style.color = "var(--info-2, #0771ED)";
      options.icon = () => (
        <Info theme="outline" style={{ height: "24px" }} size="24" />
      );
      break;
  }

  toast.info(message, options);
}

export const NotifiContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      limit={3}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable={false}
      hideProgressBar
      pauseOnHover
      closeButton={false}
    />
  );
};
