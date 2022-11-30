import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavbarText,
  NavLink,
  Modal,
  Button,
  Container,
  Form,
  Input,
  Label,
  Row,
  FormGroup,
  Alert,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faUser,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

import { URL } from "../../Api";
import axios from "axios";
function Custom_Navbar() {
  const navigate = useNavigate();
  const [modaluser, setmodaluser] = useState(false);
  const [formuser, setformuser] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [faculty, setfaculty] = useState("");
  const [major, setmajor] = useState("");
  const [year, setyear] = useState("");
  const [phone, setphone] = useState("");
  const [birthday, setbirthday] = useState("");
  const [address, setaddress] = useState("");

  //provider
  const [modalprovider, setmodalprovider] = useState(false);
  const [formprovider, setformprovider] = useState(true);
  const [nameprovider, setnameprovider] = useState("");
  const [emailprovider, setemailprovider] = useState("");
  const [passwordprovider, setpasswordprovider] = useState("");
  const [cpasswordprovider, setcpasswordprovider] = useState("");
  //admin
  const [ausername, setausername] = useState("");
  const [apassword, setapassword] = useState("");

  const [modaladmin, setmodaladmin] = useState(false);
  //error
  const [errormsg, seterrormsg] = useState("");

  const loginuser = async () => {
    axios
      .post(URL + "/rabfang_api/userlogin/auth", {
        u_email: email,
        u_password: password,
      })
      .then(function (response) {
        if (response.data.status) {
          localStorage.setItem("u_id", response.data.data.u_id);
          localStorage.setItem("u_role", response.data.data.u_role);
          //const saved = localStorage.getItem("u_id");
          navigate("/user_make_an_appointment");
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const registeruser = async () => {
    axios
      .post(URL + "/rabfang_api/userregister/register", {
        u_name: name,
        u_email: email,
        u_password: password,
        cpassword: cpassword,
        u_faculty: faculty,
        u_major: major,
        u_year: year,
        u_phone: phone,
        u_birthday: birthday,
        u_address: address,
      })
      .then(function (response) {
        if (response.data.status) {
          setmodaluser(false);
          navigate("/");
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loginprovider = async () => {
    axios
      .post(URL + "/rabfang_api/psylogin/auth", {
        psy_email: emailprovider,
        psy_password: passwordprovider,
      })
      .then(function (response) {
        if (response.data.status) {
          localStorage.setItem("psy_id", response.data.data.psy_id);
          localStorage.setItem("psy_role", response.data.data.psy_role);
          //const saved = localStorage.getItem("u_id");
          navigate("/provider_visits_appointments");
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const registerprovider = async () => {
    axios
      .post(URL + "/rabfang_api/psyregister/register", {
        psy_name: nameprovider,
        psy_email: emailprovider,
        psy_password: passwordprovider,
        cpassword: cpasswordprovider,
      })
      .then(function (response) {
        if (response.data.status) {
          setmodalprovider(false);
          navigate("/");
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loginadmin = async () => {
    axios
      .post(URL + "/rabfang_api/adminlogin/auth", {
        admin_username: ausername,
        admin_password: apassword,
      })
      .then(function (response) {
        if (response.data.status) {
          localStorage.setItem("admin_id", response.data.data.admin_id);
          localStorage.setItem("admin_role", response.data.data.admin_role);
          navigate("/admin_user_management");
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clear = () => {
    seterrormsg("");
    clearinput();
  };
  const clearinput = async () => {
    setname("");
    setemail("");
    setpassword("");
    setcpassword("");
    setfaculty("");
    setmajor("");
    setyear("");
    setphone("");
    setbirthday("");
    setaddress("");
    //proveider
    setnameprovider("");
    setemailprovider("");
    setpasswordprovider("");
    setcpasswordprovider("");
    //admin
    setausername("");
    setapassword("");
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
      <Navbar
        style={{ background: "#3390FF" }}
        dark
        expand="md"
        fixed="top"
        full
        light
      >
        <NavbarBrand href="/">PSU RABFANG</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="me-auto" navbar>
            {/* <NavItem> */}
            <NavLink href="/mentalhealth_test">Mental Health Test</NavLink>
            <NavLink href="/satisfaction_form">Satisfaction Form</NavLink>
            {/* </NavItem> */}
          </Nav>
          <NavbarText>
            <Button
              color="primary"
              onClick={() => {
                setmodaluser(true);
              }}
            >
              <FontAwesomeIcon icon={faHospitalUser} /> USER
            </Button>{" "}
            <Button
              color="success"
              onClick={() => {
                setmodalprovider(true);
              }}
            >
              <FontAwesomeIcon icon={faStethoscope} /> PROVIDER
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                setmodaladmin(true);
              }}
            >
              <FontAwesomeIcon icon={faUser} /> ADMIN
            </Button>
          </NavbarText>
        </Collapse>

        {/* Modal USER */}
        <Modal
          isOpen={modaluser}
          toggle={() => {
            console.log(!modaluser);
            setmodaluser(!modaluser);
          }}
          onClosed={clear}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30vh",
              padding: 20,
              justifyContent: "center",
            }}
          >
            {formuser == true ? (
              <Form>
                <h2>Login as User</h2>
                {errormsg ? (
                  <Alert color="danger" fade={true}>
                    <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                  </Alert>
                ) : (
                  " "
                )}
                <Row>
                  <Label> Email :</Label>
                  <Input
                    type="text"
                    style={{ margin: 10, width: "30vh" }}
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  ></Input>
                </Row>
                <Row>
                  <Label> Password :</Label>
                  <Input
                    type="password"
                    style={{ margin: 10, width: "30vh" }}
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  ></Input>
                </Row>
                <Button
                  onClick={async () => {
                    loginuser();
                  }}
                  style={{ margin: 10 }}
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setformuser(false);
                  }}
                  style={{ margin: 10 }}
                  color="info"
                >
                  Register
                </Button>
              </Form>
            ) : (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2>Register as User</h2>
                {errormsg ? (
                  <Alert color="danger" fade={true}>
                    <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                  </Alert>
                ) : (
                  ""
                )}
                <FormGroup>
                  <Label> Name :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setname(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Email :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label> Password :</Label>
                  <Input
                    type="password"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Confirm Password :</Label>
                  <Input
                    type="password"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setcpassword(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Faculty :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setfaculty(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Major :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setmajor(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Year :</Label>
                  <Input
                    type="number"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setyear(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Phone :</Label>
                  <Input
                    type="tel"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setphone(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Birthday :</Label>
                  <Input
                    type="date"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setbirthday(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Address :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setaddress(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <Button
                  style={{ margin: 10 }}
                  onClick={() => {
                    registeruser();
                  }}
                  color="primary"
                >
                  Sign up
                </Button>
                <Button
                  onClick={() => {
                    setformuser(!formuser);
                  }}
                  style={{ margin: 10 }}
                >
                  {" "}
                  Cancel
                </Button>
              </Form>
            )}
          </Container>
        </Modal>

        {/* Modal Provider */}
        <Modal
          isOpen={modalprovider}
          toggle={() => {
            console.log(!modalprovider);
            setmodalprovider(!modalprovider);
          }}
          onClosed={clear}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30vh",
              padding: 20,
              justifyContent: "center",
            }}
          >
            {formprovider == true ? (
              <Form>
                <h2>Login as Provider</h2>
                {errormsg ? (
                  <Alert color="danger" fade={true}>
                    <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                  </Alert>
                ) : (
                  " "
                )}
                <Row>
                  <Label> Email :</Label>
                  <Input
                    type="text"
                    style={{ margin: 10, width: "30vh" }}
                    onChange={(event) => {
                      setemailprovider(event.target.value);
                    }}
                  ></Input>
                </Row>
                <Row>
                  <Label> Password :</Label>
                  <Input
                    type="password"
                    style={{ margin: 10, width: "30vh" }}
                    onChange={(event) => {
                      setpasswordprovider(event.target.value);
                    }}
                  ></Input>
                </Row>
                <Button
                  onClick={async () => {
                    loginprovider();
                  }}
                  style={{ margin: 10 }}
                  color="primary"
                >
                  Login
                </Button>

                <Button
                  onClick={() => {
                    setformprovider(false);
                  }}
                  style={{ margin: 10 }}
                  color="info"
                >
                  Register
                </Button>
              </Form>
            ) : (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2>Register as Provider</h2>
                {errormsg ? (
                  <Alert color="danger" fade={true}>
                    <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                  </Alert>
                ) : (
                  ""
                )}
                <FormGroup>
                  <Label> Name :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setnameprovider(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Email :</Label>
                  <Input
                    type="text"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setemailprovider(event.target.value);
                    }}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label> Password :</Label>
                  <Input
                    type="password"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setpasswordprovider(event.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label> Confirm Password :</Label>
                  <Input
                    type="password"
                    style={{ width: "30vh" }}
                    onChange={(event) => {
                      setcpasswordprovider(event.target.value);
                    }}
                  ></Input>
                </FormGroup>

                <Button
                  style={{ margin: 10 }}
                  onClick={() => {
                    registerprovider();
                  }}
                  color="primary"
                >
                  Sign up
                </Button>
                <Button
                  onClick={() => {
                    setformprovider(!formprovider);
                  }}
                  style={{ margin: 10 }}
                >
                  {" "}
                  Cancel
                </Button>
              </Form>
            )}
          </Container>
        </Modal>
        {/* admin */}

        <Modal
          isOpen={modaladmin}
          toggle={() => {
            console.log(!modaladmin);
            setmodaladmin(!modaladmin);
          }}
          onClosed={clear}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30vh",
              padding: 20,
              justifyContent: "center",
            }}
          >
            <Form>
              <h2>Login as Admin</h2>
              {errormsg ? (
                <Alert color="danger" fade={true}>
                  <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                </Alert>
              ) : (
                " "
              )}
              <Row>
                <Label> Username :</Label>
                <Input
                  type="text"
                  style={{ margin: 10, width: "30vh" }}
                  onChange={(event) => {
                    setausername(event.target.value);
                  }}
                ></Input>
              </Row>
              <Row>
                <Label> Password :</Label>
                <Input
                  type="password"
                  style={{ margin: 10, width: "30vh" }}
                  onChange={(event) => {
                    setapassword(event.target.value);
                  }}
                ></Input>
              </Row>
              <Button
                onClick={async () => {
                  loginadmin();
                }}
                style={{ margin: 10 }}
                color="primary"
              >
                Login
              </Button>
            </Form>
          </Container>
        </Modal>
      </Navbar>
    </div>
  );
}

export default Custom_Navbar;
