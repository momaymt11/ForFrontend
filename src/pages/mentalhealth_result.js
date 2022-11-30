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
function Mentalhealth_result() {
  // return <div>doctor_page</div>;
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Custom_Navbar />
      <Container style={{ paddingTop: "100px" }}>
        <h1>Mental health Result</h1>
        <ui>{state.result}</ui>
      </Container>
      <Button
        outline
        color="primary"
        style={{ margin: "10px" }}
        onClick={async () => {
          navigate("/mentalhealth_test");
        }}
      >
        Back
      </Button>
    </Container>
  );
}

export default Mentalhealth_result;
