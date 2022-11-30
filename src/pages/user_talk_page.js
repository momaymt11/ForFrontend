import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardFooter, Container } from "reactstrap";

import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavbarText,
  NavLink,
  Modal,
  Form,
  Input,
  Label,
  FormGroup,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../components/Custom_Navbar/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../Api";
import ScrollableFeed from "react-scrollable-feed";

function User_talk_page() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const { id } = useParams();
  const [chatList, setChatList] = useState([]);
  const [textchat, setTextChat] = useState("");
  const toggleNavbar = () => setCollapsed(!collapsed);

  const u_id = localStorage.getItem("u_id");

  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/chat/chat_list", { a_id: id })
      .then(function (response) {
        if (response.data.status) {
          console.log(response.data);
          setChatList(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const add_chat_user = () => {
    axios
      .post(URL + "/rabfang_api/chat/add_chat_user", {
        c_a_id: id,
        c_u_id: u_id,
        c_text: textchat,
      })
      .then(function (response) {
        clearinput("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clearinput = async () => {
    setTextChat("");
    console.log("clear");
  };

  const logout = async () => {
    localStorage.clear();
    navigate("/");
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
      <div>
        <Navbar
          style={{ background: "#3390FF" }}
          dark
          expand="md"
          fixed="top"
          full
          light
        >
          <NavbarBrand>PSU RABFANG</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="me-auto" navbar></Nav>
            <NavbarText>
              <Button
                color="secondary"
                onClick={() => {
                  logout();
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> LOGOUT
              </Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
      <Container style={{ paddingTop: "100px" }}>
        <Row>
          <Col md={12}>
            <div class="d-flex justify-content-between">
              {" "}
              <h2>Talk Page</h2>
              <Button
                color="outline-primary"
                onClick={() => {
                  navigate("/user_my_appointment_book");
                }}
              >
                Back
              </Button>
            </div>
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
              <CardHeader className="bg-transparent">Talk</CardHeader>
              <CardBody>
                <Container
                  style={{
                    width: "100%",
                    height: "400px",
                    // overflowX: "scroll",
                    // overflowY: "scroll",
                  }}
                >
                  <ScrollableFeed>
                    {chatList.map((item, index) => (
                      <div>
                        {item["psy_chat_act"] == "YES" ? (
                          <div class="d-flex align-items-center text-left justify-content-start mb-2">
                            <div class="pr-1">
                              <img
                                src={item["psy_image"]}
                                width="80"
                                height="80"
                                className="rounded-circle"
                              />
                            </div>
                            <div class="pr-2 pl-1">
                              {" "}
                              <span class="name">{item["psy_name"]}</span>
                              <p class="msg">{item["c_text"]}</p>
                            </div>
                          </div>
                        ) : (
                          <div class="d-flex align-items-center text-right justify-content-end mb-2">
                            <div class="pr-2">
                              {" "}
                              <span class="name">{item["u_name"]}</span>
                              <p class="msg">{item["c_text"]}</p>
                              <small class="msg">{item["c_datetime_as"]}</small>
                            </div>
                            <div>
                              <img
                                src={item["u_image"]}
                                width="80"
                                height="80"
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </ScrollableFeed>
                </Container>
              </CardBody>
              <CardFooter className="bg-transparent">
              <div className="row g-2">
                  <div className="col-md-10">
                    <Input
                      type="text"
                      value={textchat}
                      onChange={(event) => {
                        setTextChat(event.target.value);
                      }}
                    ></Input>
                  </div>
                  <div className="col-md-2">
                    <Button
                      color="primary w-100"
                      onClick={() => {
                        add_chat_user();
                      }}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} /> Send
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default User_talk_page;
