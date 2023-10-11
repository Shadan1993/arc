import { PatternFormat } from "react-number-format";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
//#region  this input custom phone namber
const InputPhone = ({
  title = "",
  type = "text",
  endIcon = "",
  startIcon = "",
  defValue = "",
  disabled = false,
  disabledBtnChecked,
  // valuePhone,
}) => {
  return (
    <>
      <FormControl fullWidth sx={{ textAlign: "left", direction: "ltr" }}>
        <InputLabel variant="outlined" htmlFor="outlined-adornment-amount">
          {title}
        </InputLabel>
        <PatternFormat
          id="outlined-adornment-amount"
          variant={"outlined"}
          format=" #### ### ####"
          type={type}
          sx={{
            ".MuiOutlinedInput-input": {
              direction: "rtl",
              textAlign: "left",
            },
            paddingTop: "20px",
          }}
          size="small"
          disabled={disabled}
          defaultValue={defValue}
          customInput={OutlinedInput}
          endAdornment={
            <InputAdornment position="end">{startIcon}</InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">{endIcon}</InputAdornment>
          }
          onValueChange={(values, sourceInfo) => {
            if (values.value.length > 0 && values.value.length === 11) {
              return disabledBtnChecked(true, values.value);
            } else {
              return disabledBtnChecked(false);
            }
          }}
        />
      </FormControl>
    </>
  );
};
export default InputPhone;
