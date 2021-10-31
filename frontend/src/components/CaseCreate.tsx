import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { UsersInterface } from "../models/IUser";
import { PatientsInterface } from "../models/IPatient";
import { LevelsInterface } from "../models/ILevel";
import { CharacteristicsInterface } from "../models/ICharacteristic";
import { CasesInterface } from "../models/ICase";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { checkServerIdentity } from "tls";
import Users from "./Informers";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function CaseCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [users, setUser] = useState<UsersInterface>();
  const [patients, setPatients] = useState<PatientsInterface[]>([]);
  const [level, setLevels] = useState<LevelsInterface[]>([]);
  const [characteristic, setCharacteristics] = useState<CharacteristicsInterface[]>([]);
  const [cases, setCases] = useState<Partial<CasesInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof cases;
    setCases({
      ...cases,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof CaseCreate;
    const { value } = event.target;
    setCases({ ...cases, [id]: value });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getUser = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        cases.InformerID = res.data.ID
        if (res.data) {
          setUser(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPatients = async () => {
    //let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        //cases.PatientID = res.data.ID
        if (res.data) {
          setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getCharacteristics = async () => {
    fetch(`${apiUrl}/characteristics`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCharacteristics(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getLevels = async () => {

    fetch(`${apiUrl}/levels`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setLevels(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUser();
    getPatients();
    getCharacteristics();
    getLevels();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
        InformerID: convertType(users?.ID),
        //PatientID: convertType(patients?.ID),
        PatientID: convertType(cases.PatientID),
        LevelID: convertType(cases.LevelID),
        CharacteristicID: convertType(cases.CharacteristicID),
        CaseTime: selectedDate,
        Address: cases.Address ?? "",
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/cases`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการเข้าชมวีดีโอ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้ป่วย</p>
            <Select
                native
                
                value = {cases.PatientID}
                onChange={handleChange}
                inputProps={{
                    name: "PatientID",
                }}
            >
              <option aria-label="None" value="">
                  ชื่อผู้ป่วย
                </option>
              {patients.map((item: PatientsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}  
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ลักษณะของผู้ป่วย</p>
              <Select
                native
                value={cases.CharacteristicID}
                onChange={handleChange}
                inputProps={{
                  name: "CharacteristicID",
                }}
              >
                <option aria-label="None" value="">
                  ลักษณะของผู้ป่วย
                </option>
                {characteristic.map((item: CharacteristicsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Category}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>ที่เกิดเหตุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Address"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="สถานที่เกิดเหตุ"
                value={cases.Address || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ระดับความรุนแรงของผู้ป่วย</p>
              <Select
                native
                value={cases.LevelID}
                onChange={handleChange}
                inputProps={{
                  name: "LevelID",
                }}
              >
                <option aria-label="None" value="">
                    กรุณาเลือกระดับความรุนแรงของผู้ป่วย
                </option>
                {level.map((item: LevelsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Rating}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="CaseTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่และเวลา"
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้เเจ้งเหตุ</p>
            <Select
                native
                disabled
                value = {cases.InformerID}
                onChange={handleChange}
                inputProps={{
                    name: "InformerID",
                }}
            >
              <option value={users?.ID} key={users?.ID}>
                  {users?.Name}
                </option>  
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/cases"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default CaseCreate;
