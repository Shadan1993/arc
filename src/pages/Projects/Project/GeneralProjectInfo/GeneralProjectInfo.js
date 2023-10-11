import { Divider, Grid, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import {
  Basecolor,
  Dark_Green,
  Light_Green,
  Natural,
} from "../../../../layout/Themes/Color";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarThirty,
  Funds,
  MapDraw,
  Modify,
  PhoneCall,
  User,
} from "@icon-park/react";
import ImgsliderMui from "../../../../Components/Imageslider/ImgsliderMui";
import { Separator } from "../../../../Components/Utilities/Separator";
import { GergorianToPersian } from "../../../../Components/Utilities/DateTime";

const GeneralProjectInfo = () => {
  const navigate = useNavigate();
  const ProjectId = useParams();
  const location = useLocation();
  let infoData = location.state;
  //#region back to project list
  function handleClickBack() {
    navigate(`/prs-detail/${ProjectId.id}`);
  }
  //#endregion
  return (
    <>
      <Grid container display={"flex"} className="ss02">
        <Grid
          item
          xs={12}
          sx={{
            padding: "16px",
            borderBottom: `1px solid var(${Natural[400]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          <IconButton onClick={handleClickBack}>
            <ArrowRight
              theme="outline"
              size="24"
              fill={Basecolor[100]}
              strokeWidth={3}
              style={{ height: "24px" }}
            />
          </IconButton>
          <Typography variant="h7">اطلاعات کلی پروژه</Typography>
        </Grid>
        <Grid item xs={12}>
          <ImgsliderMui />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: "16px",
            paddingBottom: "16px",
            borderBottom: `1px dashed  ${Natural[400]}`,
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "16px",
              borderBottom: `1px solid var(${Natural[500]})`,
              background: "var(--ffffff, #FFF)",
              boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <MapDraw
                theme="outline"
                size="24"
                strokeWidth={3}
                style={{ height: "24px", padding: "0px 4px" }}
              />
              <Typography variant="body2">
                {/* {infoData?.city?.name_fa} */}
                تهران
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Modify
                theme="outline"
                size="24"
                strokeWidth={3}
                style={{ height: "24px", padding: "0px 4px" }}
              />
              <Typography variant="body2">
                {/* {infoData?.meterage}M */}
                20 * 100 M
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            marginX: "16px",
            paddingBottom: "16px",
            borderBottom: `1px dashed  ${Natural[400]}`,
          }}
        >
          <Grid item xs={12}>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingY: "4px",
                }}
              >
                <User theme="outline" size="24" style={{ height: "24px" }} />
                <Typography variant="body2" sx={{ color: Natural[200] }}>
                  کارفرما
                </Typography>
                <Typography variant="body2" sx={{ color: Basecolor[100] }}>
                  {/* {infoData?.landowner?.full_name} */}
                  ناصر آزادبخت
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  height: "36px",
                  width: "36px",
                  alignItems: "center",
                  borderRadius: "56px",
                  background: Light_Green[50],
                }}
              >
                <a href={`tel:${infoData?.landowner?.phone_number}`}>
                  <IconButton onClick={() => {}}>
                    <PhoneCall
                      theme="outline"
                      size="24"
                      fill={Dark_Green[600]}
                      style={{ height: "24px" }}
                    />
                  </IconButton>
                </a>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingY: "4px",
                }}
              >
                <User theme="outline" size="24" style={{ height: "24px" }} />
                <Typography variant="body2" sx={{ color: Natural[200] }}>
                  سرپرست اجرا
                </Typography>
                <Typography variant="body2" sx={{ color: Basecolor[100] }}>
                  {/* {infoData?.supervisor?.full_name} */}
                  آرش رضایی
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* row5 */}
        <Grid
          item
          xs={12}
          sx={{
            marginX: "16px",
            paddingBottom: "16px",
            borderBottom: `1px dashed  ${Natural[400]}`,
          }}
        >
          <Grid item xs={12}>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingY: "4px",
                }}
              >
                <Funds theme="outline" size="24" style={{ height: "24px" }} />
                <Typography variant="body2" sx={{ color: Natural[200] }}>
                  حداکثر هزینه
                </Typography>
                <Typography variant="body2" sx={{ color: Basecolor[100] }}>
                  {Separator(50000)}
                  تومان
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingY: "4px",
                }}
              >
                <CalendarThirty
                  theme="outline"
                  size="24"
                  style={{ height: "24px" }}
                />
                <Typography variant="body2" sx={{ color: Natural[200] }}>
                  شروع
                </Typography>
                <Typography variant="body2" sx={{ color: Basecolor[100] }}>
                  {GergorianToPersian("2023-06-01")}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingY: "4px",
                  gap: "8px",
                }}
              >
                <CalendarThirty
                  theme="outline"
                  size="24"
                  style={{ height: "24px" }}
                />
                <Typography variant="body2" sx={{ color: Natural[200] }}>
                  اتمام
                </Typography>
                <Typography variant="body2" sx={{ color: Basecolor[100] }}>
                  {GergorianToPersian("2023-09-01")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*description project */}
        <Grid item xs={12} sx={{ padding: "16px 16px 50px 16px" }}>
          {/* <Typography variant="body2">{infoData?.description}</Typography> */}
          <Typography variant="body2">
            پروژه بازسازی خانه شامل بهبود و بازسازی ساختمان خانه است. این پروژه
            ممکن است شامل تعمیر و تغییر سیستم های برقی، افزودن اتاق ها، تعویض کف
            و دیوارها، بازسازی حمام و آشپزخانه و همچنین افزودن امکانات جدید
            مانند استخر و فضای سبز باشد. بازسازی خانه می‌تواند بهبود کیفیت زندگی
            ساکنان و افزایش ارزش ملک را به همراه داشته باشد.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralProjectInfo;
