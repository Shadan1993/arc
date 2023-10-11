import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardProjectwalletReport from "../../../../Components/Cards/CardProject/CardProjectWalletReport";
import { Grid, IconButton, Typography } from "@mui/material";
import { ArrowRight } from "@icon-park/react";
import { Natural } from "../../../../layout/Themes/Color";

const ProjectWalletReport = () => {
  const navigate = useNavigate();
  const ProjectId = useParams();
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
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
            marginBottom: "25px",
          }}
        >
          <IconButton onClick={handleClickBack}>
            <ArrowRight
              theme="outline"
              size="24"
              strokeWidth={3}
              style={{ height: "24px" }}
            />
          </IconButton>
          <Typography variant="h7">گزارشات تنخواه پروژه</Typography>
        </Grid>
        <Grid item xs={12}>
          <CardProjectwalletReport
            titlewalletReport={"امور مالی گزارش 14 اردیبهشت 1402"}
            datewalletReport={"12:32 23/03/1402"}
            walletCurrent={-800000}
          />{" "}
          <CardProjectwalletReport
            titlewalletReport={"امور مالی گزارش 15 اردیبهشت 1402"}
            datewalletReport={"12:32 23/03/1402"}
            walletCurrent={-122000}
          />{" "}
          <CardProjectwalletReport
            titlewalletReport={"امور مالی گزارش 15 اردیبهشت 1402"}
            datewalletReport={"12:32 23/03/1402"}
            walletCurrent={500000}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectWalletReport;
