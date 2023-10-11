import { InputAdornment, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { PhoneTelephone } from "@icon-park/react";
import { PatternFormat } from "react-number-format";

const TextFiledCustom = ({
  title = "",
  type = "text",
  endIcon = "",
  startIcon = "",
  defValue = "",
  disabled = false,
  disabledBtnChecked,
}) => {
  const RedditTextField = styled((props) => (
    <PatternFormat
      id="reddit-input"
      variant="filled"
      format="98 ### ###-####"
      type={type}
      label={title}
      disabled={disabled}
      defaultValue={defValue}
      customInput={TextField}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
      }}
      onValueChange={(values, sourceInfo) => {
        if (values.value.length > 0 && values.value.length === 10) {
          return disabledBtnChecked(true);
        } else {
          return disabledBtnChecked(false);
        }
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      overflow: "hidden",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
      },
    },
  }));
  return (
    <>
      {/* <PatternFormat
        id="reddit-input"
        // variant={"standard"}
        variant="filled"
        format="98 ### ###-####"
        type={type}
        label={title}
        disabled={disabled}
        defaultValue={defValue}
        customInput={TextField}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">{startIcon}</InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">{endIcon}</InputAdornment>
          ),
        }}
        onValueChange={(values, sourceInfo) => {
          if (values.value.length > 0 && values.value.length === 10) {
            return disabledBtnChecked(true);
          } else {
            return disabledBtnChecked(false);
          }
        }}
      /> */}
      <RedditTextField />
    </>
  );
};
export default TextFiledCustom;
