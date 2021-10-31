import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CasesInterface } from "../models/ICase";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Cases() {
  const classes = useStyles();
  const [cases, setCases] = useState<CasesInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getCases = async () => {
    fetch(`${apiUrl}/cases`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCases(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการเเจ้งเหตุ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/case/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="2%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="3%">
                    ชื่อผู้ป่วย
                </TableCell>
                <TableCell align="center" width="2%">
                  อายุ
                </TableCell>
                <TableCell align="center" width="2%">
                    เพศ
                </TableCell>
                <TableCell align="center" width="5%">
                ลักษณะของผู้ป่วย
                </TableCell>
                <TableCell align="center" width="10%">
                ระดับความรุนแรงของผู้ป่วย
                </TableCell>
                <TableCell align="center" width="15%">
                  ที่เกิดเหตุ
                </TableCell>
                <TableCell align="center" width="10%">
                  วันที่และเวลา
                </TableCell>
                <TableCell align="center" width="10%">
                  ผู้เเจ้งเหตุ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cases.map((item: CasesInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Patient.Name}</TableCell>
                  <TableCell align="center">{item.Patient.Age}</TableCell>
                  <TableCell align="center">{item.Patient.Gender}</TableCell>
                  <TableCell align="center">{item.Characteristic.Category}</TableCell>
                  <TableCell align="center">{item.Level.Rating}</TableCell>
                  <TableCell align="center">{item.Address}</TableCell>
                  <TableCell align="center">{format((new Date(item.CaseTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{item.Informer.Name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </div>
  );
}

export default Cases;
