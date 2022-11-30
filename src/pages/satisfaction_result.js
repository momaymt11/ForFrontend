import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Input,
  InputGroup,
  Label,
  Row,
  InputGroupText,
  Button,
  Col,
} from "reactstrap";
import Custom_Navbar from "../components/Custom_Navbar";
import { useLocation, useNavigate } from "react-router-dom";
function Satisfaction_result() {
  // return <div>doctor_page</div>;
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Custom_Navbar />
      <Container style={{ paddingTop: "100px" }}>
        <div className="text-center">
          {" "}
          <h1>Thank You!</h1>
          <ui>We have received your satisfaction form.</ui>
        </div>
      </Container>
      <Button
        outline
        color="primary"
        style={{ margin: "10px" }}
        onClick={async () => {
          navigate("/satisfaction_form");
        }}
      >
        Back
      </Button>
    </Container>
  );
}

export default Satisfaction_result;
