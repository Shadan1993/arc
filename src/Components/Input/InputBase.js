import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Basecolor, Dark_Green } from "../../layout/Themes/Color";
//#region  this input custom phone namber
const InputBase = ({
  title = "",
  type = "text",
  endIcon = "",
  startIcon = "",
  defValue = "",
  value = undefined,
  disabled = false,
  onClickEvent = undefined,
  onChangeEvent = undefined,
  size = "56px",
  mulitiLineInput = 1,
}) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel
          color="text"
          variant="outlined"
          htmlFor="outlined-adornment-amount"
        >
          {title}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          variant={"outlined"}
          type={type}
          sx={{
            maxHeight: size,
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "26px",
            paddingTop: "20px",
            borderColor: "#CBCBCB",
            ".MuiInputAdornment-root": {
              alignItems: "end",
            },
            "&.Mui-focused > .MuiOutlinedInput-notchedOutline": {
              borderColor: Dark_Green[500],
            },
            "&.Mui-hover > .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CBCBCB",
            },
          }}
          disabled={disabled}
          // defaultValue={defValue}
          value={value !== undefined ? value : defValue}
          startAdornment={
            <InputAdornment position="start" sx={{ color: Basecolor[100] }}>
              {startIcon}
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">{endIcon}</InputAdornment>
          }
          onClick={(e) => (onClickEvent !== undefined ? onClickEvent() : e)}
          onChange={(e) => (onChangeEvent !== undefined ? onChangeEvent(e) : e)}
        />
      </FormControl>
    </>
  );
};
export default InputBase;
