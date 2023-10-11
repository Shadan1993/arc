import { Fragment, useContext, useState, useEffect } from "react";
import { ActivityContext } from "../../../../../../Components/Context/ActivityContext";
import { Btn } from "../../../../../../Components/btn/Btn";
import { IOSSwitch } from "../../../../../../Components/Switch/SwitchBase";
import UnitMaterials from "../../../../../../servies/DataStatic/UnitMaterials";
import { NumericFormat } from "react-number-format";
import {
  CheckSmall,
  Close,
  CloseSmall,
  Down,
  Edit,
  ListNumbers,
  Plus,
  Receive,
  ShoppingCartOne,
  Write,
} from "@icon-park/react";
import {
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import {
  Basecolor,
  Dark_Green,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../../layout/Themes/Color";
import { Notification } from "../../../../../../Components/Notification/Notification";

const MaterialReportAdd = () => {
  const [darwerOpenMaterial, setDarwerOpenMaterial] = useState(false);
  const [duplicateValue, setDuplicateValue] = useState(false);
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  const ListUnitMat = UnitMaterials.MaterialUnit();
  const [material, setMaterial] = useState({
    title: "",
    count: 0,
    unit: "",
    resource: "OF",
  });
  //#region add material
  function handleClickOpenDarwer() {
    setDarwerOpenMaterial(!darwerOpenMaterial);
  }
  useEffect(() => {
    if (darwerOpenMaterial === false) {
      setMaterial({
        title: "",
        count: 0,
        unit: "",
        resource: "OF",
      });
    }
  }, [darwerOpenMaterial]);
  //#endregion
  //#region handle change value material data
  function handleChangeMaterial(e) {
    if (e.target.name === "matrial_title") {
      setMaterial({ ...material, title: e.target.value });
    }
    if (e.target.name === "matrial_count") {
      setMaterial({ ...material, count: parseInt(e.target.value) });
    }
    if (e.target.name === "matrial_unit") {
      setMaterial({ ...material, unit: e.target.value });
    }
    if (e.target.name === "resource") {
      setMaterial({
        ...material,
        resource: e.target.checked ? "SU" : "OF",
      });
    }
  }
  //#endregion
  //#region save matrial
  function saveMaterial() {
    if (material.title === "" || material.count === 0 || material.unit === "") {
      return Notification("error", "لطفا مقادیر را پر کنید");
    }
    if (activityContext.materials.length === 0) {
      setActivityContext({
        ...activityContext,
        materials: [...activityContext.materials, material],
      });
    } else {
      const filter = activityContext.materials.filter((it) =>
        Object.values(it).some((val) =>
          String(val).includes(String(material.title))
        )
      );
      if (filter.length === 0) {
        setActivityContext({
          ...activityContext,
          materials: [...activityContext.materials, material],
        });
      } else {
        const newMaterial = activityContext.materials.map((it) => {
          if (it.title === material.title) {
            if (duplicateValue) {
              setDuplicateValue(false);
              return {
                ...it,
                count: material.count,
                unit: material.unit,
                resource: material.resource,
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
          materials: newMaterial,
        });
      }
    }
    setDarwerOpenMaterial(!darwerOpenMaterial);
    setMaterial({
      title: "",
      count: 0,
      unit: "",
      resource: "OF",
    });
  }
  //#endregion
  //#region edit material
  function handleEditMaterial(val) {
    let temp = activityContext.materials;
    let t = temp.filter((a) => a.title === val.title && a.count === val.count);
    setMaterial(t[0]);
    setDarwerOpenMaterial(!darwerOpenMaterial);
    setDuplicateValue(true);
  }
  //#endregion
  //#region delete material
  function handleDeleteMaterial(val) {
    let temp = activityContext.materials;
    setActivityContext({
      ...activityContext,
      materials: temp.filter(
        (a) => a.title !== val.title && a.count !== val.count
      ),
    });
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
            <Receive
              theme="outline"
              size="24"
              style={{ height: "24px" }}
              fill={Light_Tusi[700]}
            />
            <Typography
              sx={{
                paddingLeft: "4px",
                color: `${Light_Tusi[700]}`,
              }}
              variant="h7"
            >
              مصالح وارد شده
            </Typography>
          </Grid>
          <Grid item>
            <Btn
              sx={{
                height: "40px",
                width: "110px",
                fontSize: "14px",
                ".MuiButton-startIcon": {
                  marginX: "0px",
                },
              }}
              colorbase={Dark_Green[600]}
              bgcolor={Light_Tusi[700]}
              hoverbgcolor={Light_Tusi[600]}
              startIcon={
                <Plus theme="outline" style={{ height: "24px" }} size="24" />
              }
              onClick={handleClickOpenDarwer}
            >
              افزودن
            </Btn>
          </Grid>
        </Grid>
        {activityContext.materials.length < 1 && (
          <>
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
          </>
        )}
        {activityContext.materials.length > 0 &&
          activityContext.materials.map((item, index) => {
            return (
              <Fragment key={index}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "4px",
                    border: `1.5px solid ${Natural[500]}`,
                    paddingY: "10px",
                    height: "50px",
                    marginBottom: "5px",
                  }}
                >
                  <Grid item paddingX={"15px"}>
                    <Typography variant="body2" color={Basecolor[100]}>
                      {item.title}
                      {"-"}
                      {item.count} {""}
                      {UnitMaterials.MaterialUnit(item.unit)}
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
                    <IconButton onClick={() => handleEditMaterial(item)}>
                      <Edit
                        theme="outline"
                        size="24"
                        fill="#0771ED"
                        style={{ height: "24px" }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteMaterial(item)}>
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
        {/* drawer */}
        <Drawer
          anchor="bottom"
          integer="1"
          open={darwerOpenMaterial}
          onClose={() => setDarwerOpenMaterial(false)}
        >
          <Grid container sx={{ display: "flex" }}>
            {/* drawer titile and close */}
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
                <Typography variant="button">مصالح وارد شده</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setDarwerOpenMaterial(!darwerOpenMaterial)}
                >
                  <Close theme="outline" size="24" style={{ height: "24px" }} />
                </IconButton>
              </Grid>
            </Grid>
            {/* drawer main */}
            <Grid item xs={12} sx={{ marginX: "16px" }}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-start-adornment"
                  name="matrial_title"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      height: "56px",
                    },
                  }}
                  onChange={(e) => handleChangeMaterial(e)}
                  value={material.title}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ color: Basecolor[100] }}
                      >
                        <Receive
                          theme="outline"
                          size="24"
                          style={{ height: "24px" }}
                        />
                        <Typography sx={{ paddingLeft: "8px" }} variant="body2">
                          نام مصالح
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginY: "12px",
                }}
                gap={1}
              >
                <Grid item xs={6}>
                  <NumericFormat
                    name="matrial_count"
                    fullWidth
                    className="ss02"
                    sx={{
                      height: "56px",
                    }}
                    size="small"
                    value={material.count}
                    customInput={OutlinedInput}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{
                          color: Basecolor[100],
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ListNumbers
                          theme="outline"
                          size="24"
                          style={{ height: "24px" }}
                        />
                        <Typography sx={{ paddingLeft: "8px" }} variant="body2">
                          مقدار
                        </Typography>
                      </InputAdornment>
                    }
                    allowNegative={false}
                    allowLeadingZeros={false}
                    isAllowed={(values) => {
                      const { floatValue } = values;
                      const MIN_LIMIT = 1;
                      const MAX_LIMIT = 2147483647;
                      return (
                        (floatValue >= MIN_LIMIT && floatValue <= MAX_LIMIT) ||
                        floatValue === undefined
                      );
                    }}
                    onChange={(e) => handleChangeMaterial(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="select"
                    select
                    focused
                    name="matrial_unit"
                    onChange={(e) => handleChangeMaterial(e)}
                    value={material.unit}
                    sx={{
                      marginTop: "0px",
                      ".MuiSvgIcon-root": {
                        display: "none",
                      },
                      ".MuiOutlinedInput-root": {
                        height: "56px",
                        paddingRight: "0px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          sx={{ color: Basecolor[100] }}
                          position="start"
                        >
                          <Write
                            theme="outline"
                            style={{ height: "24px" }}
                            size="24"
                          />
                          {material.unit === "" && (
                            <Typography
                              sx={{ paddingLeft: "8px" }}
                              variant="caption"
                            >
                              واحد
                            </Typography>
                          )}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          sx={{ color: Basecolor[100] }}
                          position="end"
                        >
                          <Down
                            theme="two-tone"
                            size="24"
                            style={{ height: "24px", paddingLeft: "8px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  >
                    {ListUnitMat?.map((item) => (
                      <MenuItem key={item.name} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
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
                  <ShoppingCartOne
                    theme="outline"
                    size="24"
                    style={{ height: "24px" }}
                  />
                  <Typography sx={{ paddingLeft: "4px" }} variant="body2">
                    خرید توسط خودم انجام شده است.
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    sx={{ marginRight: "0px" }}
                    defaultValue={false}
                    control={
                      <IOSSwitch
                        name={"resource"}
                        onChange={(e) => handleChangeMaterial(e)}
                        checked={Boolean(material.resource !== "OF")}
                        sx={{ m: 1 }}
                      />
                    }
                  />
                </Grid>
              </Grid>
              {/* btn */}
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
                  onClick={saveMaterial}
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

export default MaterialReportAdd;
