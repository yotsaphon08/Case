import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบแจ้งเหตุ</h1>
        <h4>Requirements</h4>
        <p>
        ระบบแจ้งเหตุ เป็นระบบที่ให้ผู้ใช้ระบบ User (ผู้ใช้งาน) สามารถ login 
        เข้าระบบเพื่อทำการแจ้งเหตุโดยต้องกรอกและบันทึกข้อมูลเหตุการณ์ที่เกิดขึ้นในระบบ 
        โดยผู้ใช้งานจะต้องกรอกสถานที่เกิดเหตุอย่างชัดเจน ให้ข้อมูลว่าเกิดเหตุอะไรมีผู้ป่วยและผู้บาดเจ็บในลักษณะใด 
        บอกเพศ ช่วงอายุ บอกระดับความรุนแรงของผู้ป่วย บอกชื่อผู้แจ้งเหตุ และเบอร์โทรศัพท์มือถือให้กับพนักงานเจ้าหน้าที่ 
        ที่สามารถติดต่อกลับมาหาผู้แจ้งเหตุได้ ช่วยเหลือเบื้องต้น จากนั้นบันทึกข้อมูลไว้ในใบแจ้งเหตุ 
        </p>
      </Container>
    </div>
  );
}
export default Home;
