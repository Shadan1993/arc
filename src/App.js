import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./layout/Themes/Theme";
import { NotifiContainer } from "./Components/Notification/Notification";
//#region root loagin
import LoginBase from "./pages/Login/LoginBase";
import LoginInputPhone from "./pages/Login/LoginInputPhone";
import LoginVerifyPhone from "./pages/Login/LoginVerifyPhone";
//#endregion
//#region projects
import ProjectDetail from "./pages/Projects/Project/ProjectDetail";
import ProjectWalletReport from "./pages/Projects/Project/ProjectWalletReport/ProjectWalletReport";
import MainPrsReport from "./pages/Projects/Project/ProjectReports/ProjectReportAdd/MainPrsReport";
import ProjectReportAdd from "./pages/Projects/Project/ProjectReports/ProjectReportAdd/ProjectReportAdd";
import Team from "./pages/Projects/Project/ProjectReports/ProjectReportAdd/team/Team";
import FinalRegistrationReport from "./pages/Projects/Project/ProjectReports/FinalRegistrationReport/FinalRegistrationReport";
import GeneralProjectInfo from "./pages/Projects/Project/GeneralProjectInfo/GeneralProjectInfo";
//#endregion
//#region Tabs
import TabsMain from "./Components/Tabs/TabsMain";
//#endregion
//#region Not Found
import NotFound from "./pages/NotFound/NotFound";
//#endregion
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<TabsMain />} />
          <Route exact path="/">
            <Route path="prs-detail/:id" element={<ProjectDetail />} />
            <Route path="prs-wallet/:id" element={<ProjectWalletReport />} />

            <Route path="prs-info/:id" element={<GeneralProjectInfo />} />

            <Route path="prs-report" element={<MainPrsReport />}>
              <Route exact path="add/:id" element={<ProjectReportAdd />} />
              <Route path="team" element={<Team />} />
              <Route
                path="reportfinalreg/:id"
                element={<FinalRegistrationReport />}
              />
            </Route>
          </Route>
          <Route element={<LoginBase />}>
            <Route exact path="/login" element={<LoginInputPhone />} />
            <Route exact path="verify" element={<LoginVerifyPhone />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
      <NotifiContainer />
    </>
  );
}

export default App;
