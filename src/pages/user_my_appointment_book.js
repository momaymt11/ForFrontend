import { useEffect, useState } from "react";
import { Container } from "reactstrap";
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
} from "reactstrap";
import Users_Cutom_Navbar from "../components/Custom_Navbar/Users_Cutom_Navbar";
import Footer from "../components/Custom_Navbar/Footer";
import axios from "axios";
import { URL } from "../Api";
import { useNavigate } from "react-router-dom";
function User_my_appointment_book() {
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();
  const u_id = localStorage.getItem("u_id");
  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/user/user_my_appointment_book", { u_id: u_id })
      .then(function (response) {
        if (response.data.status) {
          setDoctorList(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const go_talk_page = (a_id) => {
    navigate("/user_talk_page/" + a_id);
  };

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
      <Users_Cutom_Navbar />
      <Container style={{ paddingTop: "100px" }}>
        <Row>
          <Col md={12}>
            <h2>My appointment book</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card
              className="my-2"
              style={{
                width: "100%",
              }}
            >
              <CardHeader className="bg-transparent">Schedule</CardHeader>
              <CardBody>
                {doctorList.map((item, index) => (
                  <Container>
                    <div className="row">
                      <div className="col">
                        <h5 className="mb-3">{item["a_date_as"]}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          src={item["psy_image"]}
                          className="rounded-circle"
                          width="150"
                          height="150"
                        />
                      </div>
                      <div className="col-md-7">
                        <CardText tag="h5">{item["psy_name"]}</CardText>
                        <CardText tag="h6">Psychiatrist</CardText>
                        <CardText tag="b">Topic:</CardText>
                        <CardText>
                          <div className="mt-1">
                            <div className="row col-8">
                              {item["a_topic"].map((lang, index) => (
                                <div className="col-2">
                                  <span class="badge rounded-pill bg-primary">
                                    {lang}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardText>
                        <CardText tag="b">Language:</CardText>
                        <CardText>
                          <div className="mt-1">
                            <div className="row col-8">
                              {item["psy_lang"].map((lang, index) => (
                                <div className="col-2">
                                  <span class="badge rounded-pill bg-primary">
                                    {lang}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardText>
                      </div>
                      <div className="col-md-2 text-end">
                        <Button
                          color="primary"
                          onClick={() => {
                            go_talk_page(item["a_id"]);
                          }}
                        >
                          Start to talk
                        </Button>
                      </div>
                    </div>
                    <hr className="text-secondary"></hr>
                  </Container>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default User_my_appointment_book;
