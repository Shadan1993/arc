import { useState, useEffect, useContext, Fragment } from "react";
import Project from "../../../../../../servies/Projects/Project";
import { ActivityContext } from "../../../../../../Components/Context/ActivityContext";
import { Btn } from "../../../../../../Components/btn/Btn";
import { Notification } from "../../../../../../Components/Notification/Notification";
import {
  CheckSmall,
  Close,
  CloseSmall,
  DoneAll,
  Down,
  Edit,
  Plus,
  Write,
} from "@icon-park/react";
import {
  Drawer,
  FormControl,
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

const TaskReportAdd = ({ projectId }) => {
  const [activityContext, setActivityContext] = useContext(ActivityContext);
  const [darwerOpenTask, setDarwerOpenTask] = useState(false);
  const [duplicateValue, setDuplicateValue] = useState(false);
  const [listTask, setListTask] = useState([]);
  const [taskSelect, setTaskSelect] = useState({
    task_id: 0,
    detail: "",
  });
  //#region get list task
  function getListTask(Project_id) {
    try {
      Project.TaskList(Project_id).then((res) => {
        if (res.Success) {
          setListTask(res.Data);
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
  useEffect(() => {
    if (darwerOpenTask === false) {
      setTaskSelect({
        task_id: 0,
        detail: "",
      });
    }
  }, [darwerOpenTask]);
  //#endregion
  //#region  handle change task
  function handleChangeTask(e) {
    if (e.target.name === "select_task") {
      setTaskSelect({ ...taskSelect, task_id: e.target.value });
    }
    if (e.target.name === "task_description") {
      setTaskSelect({ ...taskSelect, detail: e.target.value });
    }
  }
  //#endregion
  //#region add task
  function handleClickOpenDarwer() {
    setDarwerOpenTask(!darwerOpenTask);
    getListTask(projectId);
  }
  //#endregion
  //#region handle save task
  function handleSaveTask() {
    if (taskSelect.task_id === 0) {
      Notification("error", "لطفا تسک را انتخاب کنید");
      return;
    }
    if (taskSelect.detail.length < 20) {
      Notification("error", "توضیحات باید بیشتر از 20 کلمه باشد");
      return;
    }

    if (activityContext.task.length === 0) {
      setActivityContext({
        ...activityContext,
        task: [...activityContext.task, taskSelect],
      });
    } else {
      const filter = activityContext.task.filter((it) =>
        Object.values(it).some((val) =>
          String(val).includes(String(taskSelect.task_id))
        )
      );
      if (filter.length === 0) {
        setActivityContext({
          ...activityContext,
          task: [...activityContext.task, taskSelect],
        });
      } else {
        const newTask = activityContext.task.map((it) => {
          if (it.task_id === taskSelect.task_id) {
            if (duplicateValue) {
              setDuplicateValue(false);
              return {
                ...it,
                detail: taskSelect.detail,
              };
            } else {
              Notification("error", " گزارشی با این اسم قبلا ثبت شده است ");
              Notification("info", "برای تغییر آن را ویرایش کنید");
              return it;
            }
          } else {
            return it;
          }
        });
        setActivityContext({
          ...activityContext,
          task: newTask,
        });
      }
    }

    setDarwerOpenTask(!darwerOpenTask);
    setTaskSelect({
      task_id: 0,
      detail: "",
    });
  }
  //#endregion
  //#region handle edit task
  function handleEditTask(val) {
    let temp = activityContext.task;
    let t = temp.filter((a) => a.task_id === val.task_id);
    setTaskSelect(t[0]);
    setDarwerOpenTask(!darwerOpenTask);
    setDuplicateValue(true);
  }
  //#endregion
  //#region  handle delete task
  function handleDeleteTask(val) {
    let temp = activityContext.task;
    setActivityContext({
      ...activityContext,
      task: temp.filter((a) => a.task_id !== val.task_id),
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
            <DoneAll
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
              شرح وظایف
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
                <Plus theme="outline" style={{ height: "24px" }} size="24" />
              }
              onClick={handleClickOpenDarwer}
            >
              افزودن
            </Btn>
          </Grid>
        </Grid>
        {/* task empty */}
        {activityContext.task.length === 0 && (
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

        {/* task select task */}
        {activityContext.task.length > 0 &&
          activityContext.task.map((item) => {
            return (
              <Fragment key={item.task_id}>
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
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingX: "8px",
                    }}
                  >
                    <Typography variant="body2" color={Basecolor[100]}>
                      {listTask.map((a) => item.task_id === a.id && a.title)}
                      {"  "}
                      <Typography variant="caption" color={Natural[200]}>
                        {item.detail}
                      </Typography>
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
                    <IconButton onClick={() => handleEditTask(item)}>
                      <Edit
                        theme="outline"
                        size="24"
                        fill="#0771ED"
                        style={{ height: "24px" }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTask(item)}>
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

        {/* drawer task */}
        <Drawer
          anchor="bottom"
          integer="1"
          open={darwerOpenTask}
          onClose={() => {
            setDarwerOpenTask(false);
          }}
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
                <Typography variant="button"> شرح وظایف انجام شده </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setDarwerOpenTask(!darwerOpenTask)}>
                  <Close theme="outline" size="24" style={{ height: "24px" }} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginX: "16px" }}>
              <Grid item xs={12}>
                <TextField
                  id="select"
                  select
                  focused
                  name="select_task"
                  onChange={(e) => handleChangeTask(e)}
                  value={taskSelect.task_id}
                  sx={{
                    ".MuiSvgIcon-root": {
                      display: "none",
                    },
                    ".MuiOutlinedInput-root": {
                      height: "56px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: Basecolor[100] }}
                        position="start"
                      >
                        <DoneAll
                          theme="outline"
                          style={{ height: "24px" }}
                          size="24"
                        />
                        {taskSelect.task_id === 0 && (
                          <Typography
                            sx={{ paddingLeft: "8px" }}
                            variant="caption"
                          >
                            تسک شما
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
                          style={{ height: "24px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                >
                  {listTask?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Typography sx={{ paddingLeft: "8px" }} variant="caption">
                        {item.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
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
                <FormControl fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    name="task_description"
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
                      "&.Mui-focused > .MuiOutlinedInput-notchedOutline": {
                        borderColor: Dark_Green[500],
                      },
                      "&.Mui-hover > .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CBCBCB",
                      },
                    }}
                    onChange={(e) => handleChangeTask(e)}
                    value={taskSelect.detail}
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
                          sx={{ paddingLeft: "4px", marginBottom: "-8px" }}
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
                  onClick={handleSaveTask}
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

export default TaskReportAdd;
