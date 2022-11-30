import { useEffect, useState, useRef } from "react";
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
  Input,
} from "reactstrap";
import Users_Cutom_Navbar from "../components/Custom_Navbar/Users_Cutom_Navbar";
import Footer from "../components/Custom_Navbar/Footer";
import axios from "axios";
import { URL } from "../Api";
import moment from "moment";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";

function User_make_an_appointment() {
  const navigate = useNavigate();

  const u_id = localStorage.getItem("u_id");
  const dateNow = moment().format("Y-MM-D");

  const inputRef = useRef(null);

  const [doctorList, setDoctorList] = useState([]);

  const [selectPsyId, setselectPsyId] = useState("");
  const [showPsyname, setshowPsyname] = useState("");
  const [showTime, setshowTime] = useState("");
  const [showTimeList, setshowTimeList] = useState([]);
  const [selectDate, setselectDate] = useState("");
  const [selectTime, setselectTime] = useState("");
  const [selectTopic, setselectTopic] = useState(["General"]);
  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/user/user_make_an_appointment")
      .then(function (response) {
        if (response.data.status) {
          setDoctorList(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onButtonClick = () => {
    inputRef.current.value = "";
    setshowTime(false);
  };

  const get_time_appoinntment = async (date) => {
    axios
      .post(URL + "/rabfang_api/user/time_appoinntment", {
        psy_id: selectPsyId,
        date: date,
      })
      .then(function (response) {
        if (response.data.status) {
          setshowTimeList(response.data.data);
          setshowTime(true);
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const user_make_an_appointment_action = async () => {
    axios
      .post(URL + "/rabfang_api/user/user_make_an_appointment_action", {
        a_u_id: u_id,
        a_psy_id: selectPsyId,
        a_topic: selectTopic.toString(),
        a_date: selectDate + " " + selectTime,
      })
      .then(function (response) {
        if (response.data.status) {
          navigate("/user_my_appointment_book");
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
            <h2>Make an Appointment</h2>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <div class="overflow-auto">
              <Card
                className="my-2"
                style={{
                  width: "100%",
                }}
              >
                <CardHeader className="bg-transparent">
                  Please select a provider or date & time for your appointment
                </CardHeader>
                <CardBody>
                  {doctorList.map((item, index) => (
                    <Container>
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            className="rounded-circle"
                            src={item["psy_image"]}
                            width="150"
                            height="150"
                          />
                        </div>
                        <div className="col-md-7">
                          <CardText tag="h5">{item["psy_name"]}</CardText>
                          <CardText tag="h6">psychiatrist</CardText>
                          <CardText>
                            <div className="mt-1">
                              <div className="row">
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
                              setselectPsyId(item["psy_id"]);
                              setshowPsyname(item["psy_name"]);
                              onButtonClick();
                              setselectDate("");
                              setselectTime("");
                            }}
                          >
                            {selectPsyId === item["psy_id"]
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      </div>
                      <hr className="text-secondary"></hr>
                    </Container>
                  ))}
                </CardBody>
              </Card>
            </div>
          </Col>
          {selectPsyId !== "" ? (
            <Col md={4}>
              <Card className="my-2 sticky-top">
                <CardHeader className="bg-transparent">
                  Confirm visit
                </CardHeader>
                <CardBody>
                  <CardText tag="h4">Provider</CardText>
                  <CardText>{showPsyname}</CardText>
                  <CardText tag="h5">Topic</CardText>
                  <TagsInput
                    value={selectTopic}
                    onChange={setselectTopic}
                    name="fruits"
                    placeHolder="enter your topic"
                  />
                  <CardText tag="h5">Date</CardText>
                  <CardText>
                    <input
                      class="form-control"
                      type="date"
                      ref={inputRef}
                      min={dateNow}
                      onChange={(event) => {
                        setselectDate(event.target.value);
                        get_time_appoinntment(event.target.value);
                      }}
                    />
                  </CardText>
                  <CardText tag="h5">Time</CardText>
                  {showTime ? (
                    <CardText>
                      <div class="row row-cols-3 mb-3">
                        {showTimeList.map((item, index) => (
                          <>
                            <div className="col mb-3">
                              <Button
                                color={
                                  item["isValue"]
                                    ? "outline-secondary"
                                    : selectTime === item["time"]
                                    ? "primary"
                                    : "outline-primary"
                                }
                                className="w-100"
                                disabled={item["isValue"] ? true : false}
                                onClick={() => {
                                  setselectTime(item["time"]);
                                }}
                              >
                                {item["time"]}
                              </Button>
                            </div>
                          </>
                        ))}
                      </div>
                    </CardText>
                  ) : (
                    ""
                  )}
                  <Button
                    color="primary w-100"
                    disabled={
                      selectPsyId && selectDate && selectTime && selectTopic
                        ? false
                        : true
                    }
                    onClick={() => {
                      user_make_an_appointment_action();
                    }}
                  >
                    Confirm
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <Col md={4}>
              {" "}
              <h4 className="text-center">Please Select Psychiatrist</h4>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default User_make_an_appointment;
