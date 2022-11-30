import { Container } from "reactstrap";
import Custom_Navbar from "../components/Custom_Navbar";
function admin_page() {
  return (
    <Container>
      <Custom_Navbar />
      <Container style={{ paddingTop: "100px" }}>ADMIN</Container>
    </Container>
  );
}

export default admin_page;
