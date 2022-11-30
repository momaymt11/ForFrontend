import { Container } from "reactstrap";
import "../../App.css";
function Footer() {
  return (
    <div>
      {/*test */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="footer fixed-bottom">
        <Container
          fluid
          style={{
            background: "#3390FF",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            bottom: "0",
            height: "80px",
            position: "-webkit-sticky",
          }}
        >
          <h5>Copyright © 2022 , Prince of songkla university Phuket Campus</h5>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
