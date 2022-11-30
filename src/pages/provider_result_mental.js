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
import Users_Cutom_Navbar from "../components/Custom_Navbar/Users_Cutom_Navbar";
import Footer from "../components/Custom_Navbar/Footer";
import axios from "axios";
import { URL } from "../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Provider_Custom_Navbar from "../components/Custom_Navbar/Provider_Custom_Navbar";

import { TagsInput } from "react-tag-input-component";
function Provider_result_mental() {
  const [resultList, setResultList] = useState([]);
  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/psy/psy_result_mental")
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
      <Provider_Custom_Navbar />

      <Container style={{ paddingTop: "100px" }}>
        <Row>
          <Col md={12}>
            <h2>Results of preliminary mental health tests</h2>
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
                      <td scope="row">{item["m_id"]}</td>
                      <td>{item["m_name"]}</td>
                      <td>{item["m_email"]}</td>
                      <td>{item["m_datetime_as"]}</td>
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

export default Provider_result_mental;
