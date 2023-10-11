import { Fragment, useEffect, useState } from "react";
import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import {
  Basecolor,
  Light_Green,
  Light_Tusi,
  Natural,
} from "../../../../../../layout/Themes/Color";
import {
  ArrowRight,
  Check,
  CheckSmall,
  Close,
  Minus,
  Plus,
  User,
} from "@icon-park/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Btn } from "../../../../../../Components/btn/Btn";
import Project from "../../../../../../servies/Projects/Project";
import { Notification } from "../../../../../../Components/Notification/Notification";
import { ReactComponent as Logo } from "../../../../../../assets/logo/project_empty.svg";
const Team = () => {
  const location = useLocation();
  const [dataListRole, setDataListRole] = useState([]);
  const [listMemberShip, setListMemberShip] = useState([]);
  const [memberSelect, setMemberSelect] = useState();
  const [dataTeam, setDataTeam] = useState([]);
  const [memberid, setMemberId] = useState([]);
  const [count, setCount] = useState(0);
  const [darwerOpenTeam, setDarwerOpenTeam] = useState(false);
  const navigate = useNavigate();
  const locationteam = useLocation();
  //#region get list role project
  function GetListRole() {
    let project_id = location?.state.id;
    if (project_id === undefined || project_id === null) {
      return;
    } else {
      try {
        Project.ContractorRoleList(project_id).then((res) => {
          if (res.Success) {
            setDataListRole(res.Data);
          }
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }
  useEffect(() => {
    GetListRole();
    if (locationteam.state.teamData.length > 0) {
      let temp = locationteam.state.teamData;
      setDataTeam(temp);
    }
  }, []); // eslint-disable-line
  //#endregion
  //#region  get list membership role
  function getAndSetStateListMemberShip(role_id) {
    try {
      Project.ContractorRoleListMemberShip(role_id).then((res) => {
        if (res.Success) {
          let temp = dataTeam.find((it) => it.role_id === role_id);
          if (temp !== undefined && temp?.members.length > 0) {
            res.Data.forEach((el) => {
              el["selected"] = false;
              if (temp.members.find((a) => a.id === el.id)) {
                el["selected"] = true;
              }
            });
          }
          setListMemberShip(res.Data);
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
  //#endregion
  //#region back and save to project list
  function handleClickBack() {
    if (location.state.id) {
      navigate(`/prs-report/add/${location.state.id}`, {
        state: location.state.teamData,
      });
    } else {
      navigate(``);
    }
  }
  function handleSvaeTeam() {
    if (location.state.id) {
      navigate(`/prs-report/add/${location.state.id}`, { state: dataTeam });
    } else {
      navigate(``);
    }
  }
  //#endregions
  function handleOpenDarwer(role) {
    setMemberSelect(role);
    getAndSetStateListMemberShip(role.id);
    if (darwerOpenTeam === false) {
      let temp = dataTeam.find((it) => it.role_id === role.id);
      if (temp !== undefined) {
        setMemberId(temp.members);
      } else {
        setMemberId([]);
      }
    }
    setDarwerOpenTeam(!darwerOpenTeam);
  }
  //#region  select data team
  function SelectDataTeam(datarole, role) {
    datarole["selected"] = true;
    if (memberid.length === 0) {
      memberid.push(datarole);
    } else {
      const filterMem = memberid.filter((a) =>
        String(a.id).includes(String(datarole.id))
      );
      if (filterMem.length === 0) {
        memberid.push(datarole);
      }
    }
    let body = {
      role_id: role.id,
      role_name: role.name_fa,
      members: memberid,
      count: memberid.length,
    };
    const filter = dataTeam.filter((id) =>
      Object.values(id).some((val) => String(val).includes(String(role.id)))
    );
    if (filter.length === 0) {
      dataTeam.push(body);
      // setDataTeam([...dataTeam, body]);
    } else if (filter[0].role_id === role.id) {
      const newDataTeam = dataTeam.map((item) => {
        if (item.role_id === role.id) {
          return { ...item, members: body.members, count: body.count };
        }
        return item;
      });
      setDataTeam(newDataTeam);
    }
    setCount(count + 1);
  }
  //#endregion
  //#region handle Click plus
  function handleClickPlus(role) {
    const filter = dataTeam.filter((id) =>
      Object.values(id).some((val) => String(val).includes(String(role.id)))
    );
    if (filter.length === 0) {
      let body = {
        role_id: role.id,
        role_name: role.name_fa,
        members: [],
        count: 0,
      };
      dataTeam.push(body);
    }
    const newDataTeam = dataTeam.map((item) => {
      if (item.role_id === role.id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setDataTeam(newDataTeam);
  }
  //#endregion
  //#region handle Click Minus
  function handleClickMinus(role) {
    const newDataTeam = dataTeam.map((item) => {
      if (item.role_id === role.id) {
        if (item.count > item.members.length) {
          return { ...item, count: item.count - 1 };
        } else {
          Notification("warning", "مقدار نمی تواند از تعداد انتخابی باشد");
        }
      }
      return item;
    });
    setDataTeam(newDataTeam);
  }
  //#endregion
  //#region  filter data team for count
  function filterCount(roleid) {
    const filter = dataTeam.filter((id) =>
      Object.values(id).some((val) => String(val).includes(String(roleid)))
    );
    if (filter.length === 0) {
      return <Typography variant="h7">0</Typography>;
    } else {
      return <Typography variant="h7">{filter[0].count}</Typography>;
    }
  }
  //#endregion
  //#region handle delete  membership
  function handleDeleteMemberShip({ role, a }) {
    const clearDataTeam = dataTeam.map((b) => {
      if (b.role_id === role.id) {
        let mmm = b.members.filter((m) => m.id !== a.id);
        return {
          ...b,
          members: mmm,
          count: mmm.length,
        };
      } else {
        return b;
      }
    });
    setDataTeam(clearDataTeam);
  }
  //#endregion
  return (
    <>
      <Grid container display={"flex"} className="ss02">
        {/* title */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            borderBottom: `1px solid var(${Natural[500]})`,
            background: "var(--ffffff, #FFF)",
            boxShadow: "1px 0px 18px 0px rgba(0, 0, 0, 0.10)",
            marginBottom: "10px",
          }}
        >
          <Grid item>
            <IconButton onClick={handleClickBack}>
              <ArrowRight
                theme="outline"
                size="24"
                style={{ height: "24px" }}
                strokeWidth={3}
              />
            </IconButton>
            <Typography variant="h7">ثبت و جزئیات منابع انسانی </Typography>
          </Grid>
        </Grid>
        {/* Team empty */}
        {dataListRole.length === 0 && (
          <>
            <Grid
              item
              xs={12}
              sx={{
                padding: "16px",
              }}
            >
              <Box
                sx={{
                  paddingTop: "90px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                gap={5}
              >
                <Logo
                  height={"112"}
                  width={"112"}
                  style={{ flexShrink: "0" }}
                />
                <Typography
                  sx={{ textAlign: "center" }}
                  color={"secondary"}
                  variant="h7"
                >
                  منابع انسانی برای این پروژه تعریف نشده است با پشتیبانی تماس
                  بگیرید.
                </Typography>
              </Box>
            </Grid>
          </>
        )}
        {/* detail team */}
        {dataListRole?.length > 0
          ? dataListRole.map((role, index) => (
              <Fragment key={index}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    margin: "12px 16px",
                    padding: "12px",
                    borderRadius: "4px",
                    border: `1.5px solid ${Natural[400]}`,
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
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
                      <Typography variant="h7">{role.name_fa}</Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "1px 0px 18px 0px rgba(0,0,0,0.10) ",
                        padding: "6px 4px",
                        maxHeight: "36px",
                      }}
                    >
                      <IconButton onClick={() => handleClickPlus(role)}>
                        <Plus
                          theme="outline"
                          size="20"
                          style={{ height: "20px" }}
                        />
                      </IconButton>
                      {filterCount(role.id)}
                      <IconButton onClick={() => handleClickMinus(role)}>
                        <Minus
                          theme="outline"
                          size="20"
                          style={{ height: "20px" }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {/* viiew member ship */}
                  {dataTeam.map((t) =>
                    t.role_id === role.id
                      ? t.members.map((a, index9) => (
                          <Fragment key={index9}>
                            <Grid
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: `1px solid ${Natural[500]}`,
                                borderRadius: "4px",
                                padding: "8px 12px",
                                marginTop: "6px",
                              }}
                            >
                              <Grid item>
                                <Typography variant="body2">
                                  {a.user.full_name}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                }}
                              >
                                <IconButton
                                  sx={{ padding: "0px" }}
                                  onClick={() =>
                                    handleDeleteMemberShip({ role, a })
                                  }
                                >
                                  <Close
                                    theme="outline"
                                    size="24"
                                    style={{ height: "24px" }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Fragment>
                        ))
                      : ""
                  )}

                  {/* btn */}
                  <Grid item xs={12} sx={{ marginTop: "12px" }}>
                    <Btn
                      sx={{
                        height: "40px",
                        fontSize: "14px",
                        margin: "0px",
                        ".MuiButton-startIcon": {
                          marginX: "0px",
                        },
                      }}
                      colorbase={Basecolor[100]}
                      bgcolor={Basecolor[200]}
                      hoverbgcolor={Basecolor[200]}
                      borderstyle={`1.5px solid ${Basecolor[100]}`}
                      startIcon={
                        <Plus
                          theme="outline"
                          style={{ height: "24px" }}
                          size="24"
                        />
                      }
                      onClick={() => {
                        handleOpenDarwer(role);
                      }}
                    >
                      افزودن افراد
                    </Btn>
                  </Grid>
                </Grid>
                {/* drawer list membership */}
                <Drawer
                  anchor="bottom"
                  integer="1"
                  open={darwerOpenTeam}
                  onClose={() => setDarwerOpenTeam(false)}
                >
                  <Grid container sx={{ display: "flex" }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        display: "flex",
                        padding: "16px",
                        borderBottom: `1px solid var(--natural-ededed,${Natural[500]} )`,
                      }}
                    >
                      <Grid item>
                        <Typography variant="button">
                          افراد
                          {memberSelect?.name_fa}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          sx={{ padding: "0px" }}
                          onClick={() => setDarwerOpenTeam(!darwerOpenTeam)}
                        >
                          <Close
                            theme="outline"
                            size="24"
                            style={{ height: "24px" }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginY: "16px" }}>
                      {listMemberShip.map((member, index2) => (
                        <Fragment key={index2}>
                          <IconButton
                            disabled={Boolean(member?.selected)}
                            onClick={() => SelectDataTeam(member, memberSelect)}
                            sx={{ padding: "0px", width: "100%" }}
                          >
                            <Grid
                              item
                              xs={12}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginX: "12px",
                                marginY: "4px",
                                padding: "16px 12px",
                                borderRadius: "4px",
                                border: `1.5px solid ${Natural[500]}`,
                              }}
                            >
                              {Boolean(member?.selected) ? (
                                <Check
                                  theme="outline"
                                  size="24"
                                  style={{ height: "24px" }}
                                />
                              ) : (
                                <User
                                  theme="outline"
                                  size="24"
                                  style={{ height: "24px" }}
                                />
                              )}

                              <Typography
                                disabled={Boolean(member?.selected)}
                                sx={{ marginLeft: "10px" }}
                                variant="body2"
                                color={
                                  Boolean(member?.selected)
                                    ? Natural[400]
                                    : Basecolor[100]
                                }
                              >
                                {member.user.full_name}
                              </Typography>
                            </Grid>
                          </IconButton>
                        </Fragment>
                      ))}
                    </Grid>
                  </Grid>
                </Drawer>
              </Fragment>
            ))
          : ""}
        {/* btn */}
        {dataListRole.length > 0 && (
          <Fragment>
            <Grid item xs={12} sx={{ margin: "16px" }}>
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
                onClick={handleSvaeTeam}
              >
                ثبت
              </Btn>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </>
  );
};

export default Team;
