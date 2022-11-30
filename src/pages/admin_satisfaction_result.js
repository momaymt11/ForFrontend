import { useEffect, useState, useRef } from "react";
import { Container, Input } from "reactstrap";
import Custom_Navbar from "../components/Custom_Navbar";

import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Label,
  FormGroup,
  Alert,
} from "reactstrap";

import Footer from "../components/Custom_Navbar/Footer";
import axios from "axios";
import { URL } from "../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Provider_Custom_Navbar from "../components/Custom_Navbar/Provider_Custom_Navbar";

import { TagsInput } from "react-tag-input-component";
import Admin_Custom_Navbar from "../components/Custom_Navbar/Admin_Custom_Navbar";
function Admin_satisfaction_result() {
  const [resultList, setResultList] = useState([]);
  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/admin/satisfaction_result")
      .then(function (response) {
        if (response.data.status) {
          setResultList(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container
      fluid
      style={{
        // background: "whitesmoke",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0px",
        margin: "0px",
      }}
    >
      <Admin_Custom_Navbar />

      <Container style={{ paddingTop: "100px" }}>
        <Row>
          <Col md={12}>
            <h2>Satisfaction results</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Datetime</th>
                    <th scope="col">Result total</th>
                  </tr>
                </thead>
                <tbody>
                  {resultList.map((item, index) => (
                    <tr>
                      <td scope="row">{item["s_id"]}</td>
                      <td>{item["s_name"]}</td>
                      <td>{item["s_email"]}</td>
                      <td>{item["s_datetime_as"]}</td>
                      <td>{item["total"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </Container>
  );
}

export default Admin_satisfaction_result;
