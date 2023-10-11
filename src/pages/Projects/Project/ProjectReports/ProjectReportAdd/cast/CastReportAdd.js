import { useState, useContext, useEffect, Fragment } from "react";
import { ActivityContext } from "../../../../../../Components/Context/ActivityContext";
import { Notification } from "../../../../../../Components/Notification/Notification";
import { NumericFormat } from "react-number-format";
import { Btn } from "../../../../../../Components/btn/Btn";
import { Separator } from "../../../../../../Components/Utilities/Separator";
import { getBase64 } from "../../../../../../Components/Utilities/GetBase64";
import InputBase from "../../../../../../Components/Input/InputBase";
import {
  CheckSmall,
  Close,
  CloseSmall,
  Dollar,
  Edit,
  Funds,
  Plus,
  Upload,
  Write,
} from "@icon-park/react";
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  Avatar,
  InputAdornment,
  OutlinedInput,
  Input,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Basecolor,
  Dark_Green,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../../layout/Themes/Color";

const CastReportAdd = () => {
  const [darwerOpenCost, setDarwerOpenCost] = useState(false);
  const [disableBtnSave, setDisableBtnSave] = useState(false);
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  const [duplicateValue, setDuplicateValue] = useState(false);
  const [costSelect, setCostSelect] = useState({
    description: "",
    amount: 0,
    image_base64: "",
  });
  //#region add material
  function handleClickOpenDarwer() {
    setDarwerOpenCost(!darwerOpenCost);
  }
  //#endregion
  useEffect(() => {
    if (darwerOpenCost === false) {
      setCostSelect({
        description: "",
        amount: 0,
        image_base64: "",
      });
    }
  }, [darwerOpenCost]);
  //#region  handle upload file and base64
  const handleFileUpload = (e) => {
    setDisableBtnSave(true);
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      const file = e.target.files[0];
      getBase64(file)
        .then((result) => {
          file["base64"] = result;
          setCostSelect({ ...costSelect, image_base64: result });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setDisableBtnSave(false);
  };
  //#endregion
  //#endregion
  //#region handle save cost
  function handleSaveCast() {
    if (costSelect.description === "" || costSelect.amount === 0) {
      return Notification("error", "عنوان خرج یا مبلغ نمی تواند خالی باشد");
    }
    if (activityContext.cost.length === 0) {
      setActivityContext({
        ...activityContext,
        cost: [...activityContext.cost, costSelect],
      });
    } else {
      const filter = activityContext.cost.filter((it) =>
        Object.values(it).some((val) =>
          String(val).includes(String(costSelect.description))
        )
      );
      if (filter.length === 0) {
        setActivityContext({
          ...activityContext,
          cost: [...activityContext.cost, costSelect],
        });
      } else {
        const newCost = activityContext.cost.map((it) => {
          if (it.description === costSelect.description) {
            if (duplicateValue) {
              setDuplicateValue(false);
              return {
                ...it,
                detail: costSelect.detail,
                description: costSelect.description,
                amount: costSelect.amount,
                image_base64: costSelect.image_base64,
              };
            } else {
              Notification("error", " گزارشی با این اسم قبلا ثبت شده است ");
              Notification("error", "برای تغییر آن را ویرایش کنید");
              return it;
            }
          } else {
            return it;
          }
        });
        setActivityContext({
          ...activityContext,
          cost: newCost,
        });
      }
    }
    setCostSelect({
      description: "",
      amount: 0,
      image_base64: "",
    });
    setDarwerOpenCost(false);
  }
  //#endregion
  //#region  handle edit cost
  function handleEditCost(val) {
    let temp = activityContext.cost;
    let t = temp.filter((a) => a.description === val.description);
    setCostSelect(t[0]);
    setDarwerOpenCost(!darwerOpenCost);
    setDuplicateValue(true);
  }
  //#endregion
  //#region  handle delete cost
  function handleDeleteCost(val) {
    let temp = activityContext.cost;
    setActivityContext({
      ...activityContext,
      cost: temp.filter((a) => a.description !== val.description),
    });
  }
  //#endregion
  //#region  handle change task
  function handleChangeCost(e) {
    setCostSelect({ ...costSelect, description: e.target.value });
  }
  //#endregion
  return (
    <>
      <Grid container paddingX={"16px"}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Funds
              theme="outline"
              size="24"
              style={{ height: "24px" }}
              fill={Light_Tusi[700]}
            />
            <Typography
              sx={{
                paddingLeft: "8px",
                color: `${Light_Tusi[700]}`,
              }}
              variant="h7"
            >
              صورت مخارج
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Btn
              sx={{
                width: "110px",
                height: "40px",
                fontSize: "14px",
                ".MuiButton-startIcon": {
                  marginX: "0px",
                },
              }}
              colorbase={Dark_Green[600]}
              bgcolor={Light_Tusi[700]}
              hoverbgcolor={Light_Tusi[600]}
              startIcon={
                <Plus
                  theme="outline"
                  style={{ height: "24px" }}
                  size="24"
                  strokeWidth={3}
                />
              }
              onClick={handleClickOpenDarwer}
            >
              افزودن
            </Btn>
          </Grid>
        </Grid>
        {/* cost empty */}
        {activityContext.cost.length === 0 && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `1.5px solid ${Natural[500]}`,
              borderRadius: "4px",
              paddingY: "10px",
            }}
          >
            <Typography variant="caption">
              موردی برای نمایش وجود ندارد.
            </Typography>
          </Grid>
        )}
        {/* list select cost  */}
        {activityContext.cost.length > 0 &&
          activityContext.cost.map((item, index) => {
            return (
              <Fragment key={index}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "4px",
                    border: `1.5px solid ${Natural[500]}`,
                    paddingY: "10px",
                    height: "50px",
                    marginBottom: "5px",
                  }}
                >
                  <Grid
                    item
                    paddingX={"15px"}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ bgcolor: Light_Tusi[500] }}
                      src={item.image_base64}
                      variant="rounded"
                    >
                      خ
                    </Avatar>
                    <Typography
                      margin={"10px"}
                      variant="body2"
                      color={Basecolor[100]}
                    >
                      {Separator(item.amount)} تومان
                    </Typography>
                    <Typography variant="caption" color={Natural[200]}>
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={() => handleEditCost(item)}>
                      <Edit
                        theme="outline"
                        size="24"
                        fill="#0771ED"
                        style={{ height: "24px" }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCost(item)}>
                      <CloseSmall
                        theme="outline"
                        size="24"
                        style={{ height: "24px" }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Fragment>
            );
          })}

        {/* darwer cost */}
        <Drawer
          anchor="bottom"
          integer="1"
          open={darwerOpenCost}
          onClose={() => setDarwerOpenCost(false)}
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
                <Typography variant="button">صورت مخارج</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setDarwerOpenCost(!darwerOpenCost)}>
                  <Close theme="outline" size="24" style={{ height: "24px" }} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginX: "16px" }}>
              <Grid item xs={12} sx={{ paddingBottom: "12px" }}>
                <InputBase
                  title="عنوان خرج"
                  type="text"
                  startIcon={
                    <Write
                      theme="outline"
                      size="24"
                      style={{ height: "24px" }}
                    />
                  }
                  onChangeEvent={handleChangeCost}
                  value={costSelect?.description}
                />
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
                <FormControl
                  // sx={{ }}
                  fullWidth
                >
                  <InputLabel
                    color="text"
                    variant="outlined"
                    htmlFor="outlined-adornment-amount"
                  >
                    مبلغ
                  </InputLabel>
                  <NumericFormat
                    name="matrial_amount"
                    className="ss02"
                    fullWidth
                    sx={{
                      height: "56px",
                      paddingTop: "20px",
                      ".MuiInputAdornment-root": {
                        alignItems: "end",
                      },
                    }}
                    size="small"
                    value={costSelect?.amount}
                    customInput={OutlinedInput}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    thousandSeparator=","
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{
                          color: Basecolor[100],
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Dollar
                          theme="outline"
                          size="24"
                          style={{ height: "24px" }}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment
                        position="end"
                        sx={{
                          color: Basecolor[100],
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2">تومان</Typography>
                      </InputAdornment>
                    }
                    isAllowed={(values) => {
                      const { floatValue } = values;
                      const MIN_LIMIT = 1;
                      const MAX_LIMIT = 2147483647;
                      return (
                        (floatValue >= MIN_LIMIT && floatValue <= MAX_LIMIT) ||
                        floatValue === undefined
                      );
                    }}
                    onValueChange={(val) => {
                      setCostSelect({ ...costSelect, amount: val.floatValue });
                    }}
                  />
                </FormControl>
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
                <label
                  htmlFor="icon-button-file"
                  style={{ width: "100%", margin: "12px 0px" }}
                >
                  <Button
                    fullWidth
                    disabled={disableBtnSave}
                    sx={{
                      color: Basecolor[100],
                      border: `1.5px solid ${Natural[500]}`,
                    }}
                    aria-label="upload picture"
                    component="span"
                  >
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      sx={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    {costSelect.image_base64 !== "" ? (
                      <Avatar
                        sx={{
                          bgcolor: Light_Tusi[500],
                          height: "32px",
                          width: "32px",
                        }}
                        src={costSelect.image_base64}
                        variant="rounded"
                      />
                    ) : (
                      <Upload
                        theme="outline"
                        size="24"
                        style={{ height: "24px" }}
                      />
                    )}

                    <Typography variant="body2">تصویر فیش یا فاکتور</Typography>
                  </Button>
                </label>
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
                  onClick={handleSaveCast}
                >
                  ثبت
                </Btn>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
      </Grid>
    </>
  );
};

export default CastReportAdd;
