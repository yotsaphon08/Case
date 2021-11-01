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
import { InformersInterface } from "../models/IInformer";

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

function Informers() {
  const classes = useStyles();
  const [informers, setInformer] = useState<InformersInterface[]>([]);

  const getInformer = async () => {
    const apiUrl = "http://localhost:8080/informers";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setInformer(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getInformer();
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
              ข้อมูลผู้ใช้งาน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/informer/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลผู้ใช้งาน
            </Button>
          </Box>
        </Box>
        
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="30%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="30%">
                  อีเมล
                </TableCell>
                <TableCell align="center" width="30%">
                  เบอร์โทรศัพท์
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {informers.map((informer: InformersInterface) => (
                <TableRow key={informer.ID}>
                  <TableCell align="center">{informer.ID}</TableCell>
                  <TableCell align="center">{informer.Name}</TableCell>
                  <TableCell align="center">{informer.Email}</TableCell>
                  <TableCell align="center">{informer.Tel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Informers;
