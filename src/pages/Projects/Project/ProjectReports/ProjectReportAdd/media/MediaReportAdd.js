import { useState, useContext, Fragment, useEffect } from "react";
import Media from "../../../../../../servies/Media/Media";
import { ActivityContext } from "../../../../../../Components/Context/ActivityContext";
import { Btn } from "../../../../../../Components/btn/Btn";
import { Notification } from "../../../../../../Components/Notification/Notification";
import {
  CheckSmall,
  Close,
  CloseOne,
  Edit,
  FileDisplayOne,
  Pic,
  Plus,
  Text,
  Voice,
  Write,
} from "@icon-park/react";
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  Avatar,
  Badge,
  InputAdornment,
  Input,
  Button,
  FormControl,
  OutlinedInput,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  Basecolor,
  Dark_Green,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../../layout/Themes/Color";
const MediaReportAdd = () => {
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  const [darwerOpenMedia, setDarwerOpenMedia] = useState(false);
  const [darwerOpenMMediaText, setDarwerOpenMMediaText] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoadings, setIsLoadings] = useState(false);
  //#region add media
  function handleClickOpenDarwer() {
    setDarwerOpenMedia(!darwerOpenMedia);
  }
  //#endregion
  //#region add media voice
  function handleClickOpenDarwerMediaText() {
    setDarwerOpenMMediaText(!darwerOpenMMediaText);
  }
  function handleClickOpenDarwerMediaTextEdit() {
    setDarwerOpenMedia(!darwerOpenMedia);
    setDarwerOpenMMediaText(!darwerOpenMMediaText);
    setDescription(activityContext.activity_description);
  }
  //#endregion
  //#region upload image to server
  function UploadImageToServer(imgFile) {
    var formData = new FormData();
    formData.append("desktop", imgFile);
    Media.ImageAdd(formData).then((res) => {
      if (res.Success) {
        let tmp = {
          Urlimg: res.Data.desktop,
          title: imgFile.name,
          file: imgFile,
          id: parseInt(res.Data.id), // Use for update page and del image
        };
        setFileList([...fileList, tmp]);
      }
    });
  }
  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    handleIsLoadOpen();
    const file = e.target.files[0];
    if (
      fileList.length > 0 &&
      fileList.find((item) => item.title === file.name)
    ) {
      handleIsLoadClose();
      return Notification("success", "این تصویر قبلا اضافه شده است");
    }
    UploadImageToServer(file);
    handleIsLoadClose();
  };
  useEffect(() => {
    if (fileList.length > 0) {
      setActivityContext({
        ...activityContext,
        activity_images: fileList.map((a) => a.id),
      });
    } else if (fileList.length === 0) {
      setActivityContext({
        ...activityContext,
        activity_images: [],
      });
    }

    setDarwerOpenMedia(false);
  }, [fileList]); // eslint-disable-line
  //#endregion
  //#region delete media image
  function HandelRemoveImage(index, id, onServer) {
    if (onServer) {
      handleIsLoadOpen();
      RemoveImageFromServer(index, id);
      // code delete on server
    } else {
      let newLst = [...fileList];
      URL.revokeObjectURL(newLst[index].Urlimg);
      newLst.splice(index, 1);
      setFileList(newLst);
    }

    handleIsLoadClose();
  }
  function RemoveImageFromServer(index, imgId) {
    Media.ImageDelete(imgId).then((res) => {
      if (res.Success) {
        let newLst = [...fileList];
        newLst.splice(index, 1);
        setFileList(newLst);
      }
    });
  }
  //#endregion
  //#region
  const handlechangevalueText = (event) => {
    if (event.target.name === "activity_description") {
      setDescription(String(event.target.value));
    }
  };
  //#endregion
  //#region Save Description
  function handleSaveDescription() {
    if (description === "") {
      setActivityContext({
        ...activityContext,
        ["activity_description"]: null, // eslint-disable-line
      });
    } else {
      setActivityContext({
        ...activityContext,
        ["activity_description"]: description, // eslint-disable-line
      });
    }

    setDescription("");
    setDarwerOpenMedia(!darwerOpenMedia);
    setDarwerOpenMMediaText(!darwerOpenMMediaText);
  }
  //#endregion
  //#region open and close is loading
  const handleIsLoadOpen = () => {
    setIsLoadings(true);
  };
  const handleIsLoadClose = () => {
    setIsLoadings(false);
  };
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
            <FileDisplayOne
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
              توضیحات و مدیا
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
                <Plus theme="outline" style={{ height: "24px" }} size="24" />
              }
              onClick={handleClickOpenDarwer}
            >
              افزودن
            </Btn>
          </Grid>
        </Grid>
        {activityContext.activity_images.length < 1 &&
          activityContext?.activity_description === null && (
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
        {activityContext.activity_images.length > 0 && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              direction: "rtl",
              paddingY: "10px",
              height: "85px",
              marginBottom: "5px",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {fileList.map((item, index) => {
                return (
                  <Fragment key={item.id}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      badgeContent={
                        <>
                          <IconButton
                            onClick={() =>
                              HandelRemoveImage(index, item.id, true)
                            }
                          >
                            <CloseOne
                              theme="two-tone"
                              size="24"
                              fill={["#FFF", "#C30000"]}
                              style={{ height: "24px" }}
                            />
                          </IconButton>
                        </>
                      }
                      sx={{
                        padding: "3px",
                        margin: "2px",
                        border: `1.5px solid ${Natural[500]}`,
                        borderRadius: "4px",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: Light_Tusi[500],
                          height: "64px",
                          width: "64px",
                        }}
                        src={item.Urlimg}
                        variant="rounded"
                      />
                    </Badge>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
        )}
        {activityContext?.activity_description !== null &&
          activityContext?.activity_description !== "" && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                direction: "rtl",
                borderRadius: "4px",
                border: `1.5px solid ${Natural[500]}`,
                marginY: "16px",
                marginBottom: "5px",
              }}
            >
              <Grid item>
                <IconButton onClick={handleClickOpenDarwerMediaTextEdit}>
                  <Edit
                    theme="outline"
                    size="24"
                    fill="#0771ED"
                    style={{ height: "24px" }}
                  />
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{
                  direction: "ltr",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ textAlign: "right", paddingLeft: "8px" }}
                  variant="caption"
                >
                  {activityContext?.activity_description}
                </Typography>
              </Grid>
            </Grid>
          )}
        {/* drawer media text*/}
        <Drawer
          anchor="bottom"
          integer="1"
          open={darwerOpenMedia}
          onClose={() => setDarwerOpenMedia(false)}
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
                <Typography variant="button">افزودن...</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setDarwerOpenMedia(!darwerOpenMedia)}
                >
                  <Close
                    theme="outline"
                    size="24"
                    strokeWidth={3}
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
                justifyContent: "space-between",
                marginX: "16px",
                marginBottom: "20px",
                flexDirection: "row-reverse",
              }}
            >
              <Grid
                item
                sx={{
                  borderRadius: "4px",
                  background: "var(--primary-01, #E2FCF5)",
                  padding: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton disabled>
                  <Avatar
                    sx={{
                      bgcolor: "transparent",
                      height: "60px",
                      width: "60px",
                    }}
                    variant="rounded"
                  >
                    <Voice
                      theme="filled"
                      size="60"
                      fill="#1BE0B1"
                      strokeWidth={3}
                      style={{ height: "60px" }}
                    />
                  </Avatar>
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{
                  borderRadius: "4px",
                  background: "var(--info-1, #E3F0FF)",
                  padding: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label
                  htmlFor="icon-button-file"
                  style={{ width: "100%", margin: "12px 0px" }}
                >
                  <Button
                    fullWidth
                    sx={{
                      color: Basecolor[100],
                      border: `3.5px solid ${Natural[500]}`,
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
                    <Pic
                      theme="filled"
                      size="41"
                      fill="#0771ED"
                      style={{ height: "41px" }}
                    />
                  </Button>
                </label>
              </Grid>
              <Grid
                item
                sx={{
                  borderRadius: "4px",
                  background: "var(--info-1, #DDE7EE)",
                  padding: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={handleClickOpenDarwerMediaText}>
                  <Avatar
                    sx={{
                      bgcolor: "transparent",
                      height: "60px",
                      width: "60px",
                    }}
                    variant="rounded"
                  >
                    <Text
                      theme="filled"
                      size="48"
                      fill="#436B88"
                      strokeWidth={3}
                      style={{ height: "48px" }}
                    />
                  </Avatar>
                </IconButton>
                {/* drawer media text */}
                <Drawer
                  anchor="bottom"
                  integer="1"
                  open={darwerOpenMMediaText}
                  onClose={() => setDarwerOpenMMediaText(false)}
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
                        <Typography variant="button">افزودن متن</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() =>
                            setDarwerOpenMMediaText(!darwerOpenMMediaText)
                          }
                        >
                          <Close
                            theme="outline"
                            size="24"
                            strokeWidth={3}
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
                        margin: "0px 16px 0px 16px",
                        borderBottom: `1px solid var(--natural-ededed,${Natural[500]} )`,
                      }}
                    >
                      <FormControl fullWidth>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          name="activity_description"
                          variant={"outlined"}
                          type={"text"}
                          multiline
                          rows={4}
                          sx={{
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "26px",
                            paddingTop: "20px",
                            borderColor: "#CBCBCB",
                            ".MuiInputAdornment-root": {
                              alignItems: "end",
                            },
                            ".MuiOutlinedInput-input": {
                              marginTop: "25px",
                              marginLeft: "-72px",
                            },
                            "&.Mui-focused > .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor: Dark_Green[500],
                              },
                            "&.Mui-hover > .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#CBCBCB",
                            },
                          }}
                          onChange={handlechangevalueText}
                          value={description}
                          startAdornment={
                            <InputAdornment
                              position="start"
                              sx={{
                                color: Basecolor[100],
                                marginTop: "-110px",
                              }}
                            >
                              <Write
                                theme="outline"
                                style={{ height: "24px" }}
                                size="24"
                              />
                              <Typography
                                sx={{
                                  paddingLeft: "4px",
                                  marginBottom: "-8px",
                                }}
                                variant="span"
                              >
                                توضیحات
                              </Typography>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        margin: "16px",
                        borderBottom: `1px solid var(--natural-ededed,${Natural[500]} )`,
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
                        onClick={handleSaveDescription}
                      >
                        ثبت
                      </Btn>
                    </Grid>
                  </Grid>
                </Drawer>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoadings}
          onClick={handleIsLoadClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </>
  );
};

export default MediaReportAdd;
