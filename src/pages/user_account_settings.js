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
function User_account_settings() {
  const u_id = localStorage.getItem("u_id");
  const inputRef = useRef(null);
  const [showimage, setshowimage] = useState("");
  //update
  const [newimage, setnewImage] = useState("");
  const [oldimage, setoldimage] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [faculty, setfaculty] = useState("");
  const [major, setmajor] = useState("");
  const [year, setyear] = useState("");
  const [phone, setphone] = useState("");
  const [birthday, setbirthday] = useState("");
  const [address, setaddress] = useState("");

  //etc
  const [errormsg, seterrormsg] = useState("");
  const [alertcolor, setalertcolor] = useState("");

  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/user/account_settings", {
        u_id: u_id,
      })
      .then(function (response) {
        if (response.data.status) {
          setoldimage(response.data.data.u_image);
          setname(response.data.data.u_name);
          setemail(response.data.data.u_email);

          setfaculty(response.data.data.u_faculty);
          setmajor(response.data.data.u_major);
          setyear(response.data.data.u_year);
          setphone(response.data.data.u_phone);
          setbirthday(response.data.data.u_birthday);
          setaddress(response.data.data.u_address);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const fileObj = e.target.files && e.target.files[0];

    if (fileObj) {
      const base64 = await convertToBase64(e.target.files[0]);
      setshowimage(base64);
      setnewImage(e.target.files[0]);
    }
  };

  const updateuser = async () => {
    const formData = new FormData();
    formData.append("u_id", u_id);
    formData.append("file", newimage);
    formData.append("u_name", name);
    formData.append("u_email", email);
    formData.append("u_password", password);
    formData.append("u_faculty", faculty);
    formData.append("u_major", major);
    formData.append("u_year", year);
    formData.append("u_phone", phone);
    formData.append("u_birthday", birthday);
    formData.append("u_address", address);

    axios
      .post(URL + "/rabfang_api/user/update_account", formData)
      .then(function (response) {
        if (response.data.status) {
          seterrormsg(response.data.msg);
          setalertcolor("success");
        } else {
          seterrormsg(response.data.msg);
          setalertcolor("danger");
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
            <h2>Account Settings</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="text-center">
              <Card
                className="my-2"
                style={{
                  width: "100%",
                }}
              >
                <CardHeader className="bg-transparent">
                  Profile Picture
                </CardHeader>
                <CardBody>
                  {oldimage ? (
                    <img
                      src={showimage != "" ? showimage : oldimage}
                      width="150"
                      height="150"
                      className="rounded-circle"
                    />
                  ) : (
                    ""
                  )}

                  <br />
                  <small>JPG or PNG no larger than 2 MB</small>
                  <br />
                  <div className="mb-3"></div>

                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Button
                    color="outline-primary"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Edit Profile
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Col>

          <Col md={8}>
            <Card
              className="my-2"
              style={{
                width: "100%",
              }}
            >
              <CardHeader className="bg-transparent">
                Account Details
              </CardHeader>
              <CardBody>
                {errormsg ? (
                  <Alert color={alertcolor} fade={true}>
                    <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                  </Alert>
                ) : (
                  " "
                )}
                <Container>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label> Name :</Label>
                        <Input
                          type="text"
                          onChange={(event) => {
                            setname(event.target.value);
                          }}
                          defaultValue={name}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label> Email :</Label>
                        <Input
                          type="email"
                          onChange={(event) => {
                            setemail(event.target.value);
                          }}
                          defaultValue={email}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>New Password :</Label>
                        <Input
                          type="password"
                          onChange={(event) => {
                            setpassword(event.target.value);
                          }}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label> Faculty :</Label>
                        <Input
                          type="text"
                          onChange={(event) => {
                            setfaculty(event.target.value);
                          }}
                          defaultValue={faculty}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label> Major :</Label>
                        <Input
                          type="text"
                          onChange={(event) => {
                            setmajor(event.target.value);
                          }}
                          defaultValue={major}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label> Year :</Label>
                        <Input
                          type="number"
                          onChange={(event) => {
                            setyear(event.target.value);
                          }}
                          defaultValue={year}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label> Phone :</Label>
                    <Input
                      type="tel"
                      onChange={(event) => {
                        setphone(event.target.value);
                      }}
                      defaultValue={phone}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label> Birthday :</Label>
                    <Input
                      type="date"
                      onChange={(event) => {
                        setbirthday(event.target.value);
                      }}
                      defaultValue={birthday}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label> Address :</Label>
                    <Input
                      type="text"
                      onChange={(event) => {
                        setaddress(event.target.value);
                      }}
                      defaultValue={address}
                    ></Input>
                  </FormGroup>
                  <Button
                    color="primary"
                    onClick={() => {
                      updateuser();
                    }}
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} /> Update
                  </Button>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </Container>
  );
}

export default User_account_settings;
