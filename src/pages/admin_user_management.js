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
  Modal,
  Form,
} from "reactstrap";
import Footer from "../components/Custom_Navbar/Footer";
import axios from "axios";
import { URL } from "../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Admin_Custom_Navbar from "../components/Custom_Navbar/Admin_Custom_Navbar";
function Admin_user_management() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalAdd, setmodalAdd] = useState(false);
  const [modaledit, setmodaledit] = useState(false);
  //user
  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [faculty, setfaculty] = useState("");
  const [major, setmajor] = useState("");
  const [year, setyear] = useState("");
  const [phone, setphone] = useState("");
  const [birthday, setbirthday] = useState("");
  const [address, setaddress] = useState("");

  const [deleteId, setDeleteId] = useState("");

  //error
  const [errormsg, seterrormsg] = useState("");
  const toggle = (
    action,
    id,
    val1,
    val2,
    val3,
    val4,
    val5,
    val6,
    val7,
    val8
  ) => {
    setModal(!modal);
    if (action == "edit") {
      setuserId(id);
      setname(val1);
      setemail(val2);
      setfaculty(val3);
      setmajor(val4);
      setyear(val5);
      setphone(val6);
      setbirthday(val7);
      setaddress(val8);
    } else {
      setDeleteId(id);
    }
  };

  const toggleAdd = () => {
    setmodalAdd(!modalAdd);
  };
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/admin/user_list")
      .then(function (response) {
        if (response.data.status) {
          setResultList(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const add_row = async () => {
    axios
      .post(URL + "/rabfang_api/admin/user_add", {
        u_name: name,
        u_email: email,
        u_password: password,
        u_faculty: faculty,
        u_major: major,
        u_year: year,
        u_phone: phone,
        u_birthday: birthday,
        u_address: address,
      })
      .then(function (response) {
        if (response.data.status) {
          setmodalAdd(!modalAdd);
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const update_row = async () => {
    axios
      .post(URL + "/rabfang_api/admin/user_update", {
        u_id: userId,
        u_name: name,
        u_email: email,
        password: password,
        u_faculty: faculty,
        u_major: major,
        u_year: year,
        u_phone: phone,
        u_birthday: birthday,
        u_address: address,
      })
      .then(function (response) {
        if (response.data.status) {
          setModal(!modal);
          clearinput();
        } else {
          seterrormsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const delete_row = async () => {
    axios
      .post(URL + "/rabfang_api/admin/user_delete", {
        u_id: deleteId,
      })
      .then(function (response) {
        if (response.data.status) {
          setModal(!modal);
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
    setuserId("");
    setname("");
    setemail("");
    setfaculty("");
    setmajor("");
    setyear("");
    setphone("");
    setbirthday("");
    setaddress("");

    setDeleteId("");
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
      <Admin_Custom_Navbar />
      <Modal isOpen={modalAdd} toggle={toggleAdd} onClosed={clear}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 20,
            justifyContent: "center",
          }}
        >
          {errormsg ? (
            <Alert color="danger" fade={true}>
              <div dangerouslySetInnerHTML={{ __html: errormsg }} />
            </Alert>
          ) : (
            " "
          )}
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Add </h2>
            <FormGroup>
              <Label> Name :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setname(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label> Email :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setemail(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password :</Label>
              <Input
                type="password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label> Faculty :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setfaculty(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label> Major :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setmajor(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label> Year :</Label>
              <Input
                type="number"
                onChange={(event) => {
                  setyear(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label> Phone :</Label>
              <Input
                type="tel"
                onChange={(event) => {
                  setphone(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label> Birthday :</Label>
              <Input
                type="date"
                onChange={(event) => {
                  setbirthday(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label> Address :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setaddress(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <Button
              onClick={async () => {
                add_row();
              }}
              style={{ margin: 10 }}
              color="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => {
         
                setmodalAdd(!modalAdd);
              }}
              style={{ margin: 10 }}
              color="secondary"
            >
              Cancel
            </Button>
          </Form>
        </Container>
      </Modal>

      <Modal isOpen={modal} toggle={toggle} onClosed={clear}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 20,
            justifyContent: "center",
          }}
        >
          {errormsg ? (
            <Alert color="danger" fade={true}>
              <div dangerouslySetInnerHTML={{ __html: errormsg }} />
            </Alert>
          ) : (
            " "
          )}
          {modaledit === true ? (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>Edit </h2>
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
              <FormGroup>
                <Label> Email :</Label>
                <Input
                  type="text"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                  defaultValue={email}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label>New Password :</Label>
                <Input
                  type="password"
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                ></Input>
              </FormGroup>

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
                onClick={async () => {
                  update_row();
                }}
                style={{ margin: 10 }}
                color="primary"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setModal(!modal);
                }}
                style={{ margin: 10 }}
                color="secondary"
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 20,
                justifyContent: "center",
              }}
            >
              <h4>Confirm Delete ?</h4>
              <Button
                onClick={async () => {
                  delete_row();
                }}
                style={{ margin: 10 }}
                color="primary"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setModal(!modal);
                }}
                style={{ margin: 10 }}
                color="secondary"
              >
                Cancel
              </Button>
            </Container>
          )}
        </Container>
      </Modal>
      <Container style={{ paddingTop: "100px" }}>
        <Row>
          <Col md={12}>
            <div class="d-flex justify-content-between">
              {" "}
              <h2>User Management</h2>
              <Button
                color="success"
                onClick={() => {
                  setmodalAdd(true);
                }}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {" "}
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Profile</th>
                    <th scope="col">Name</th>
                    <th scope="col">Emaill</th>
                    <th scope="col">Faculty</th>
                    <th scope="col">Major</th>
                    <th scope="col">Year</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resultList.map((item, index) => (
                    <tr>
                      <td scope="row">{item["u_id"]}</td>
                      <td>
                        <img
                          src={item["u_image"]}
                          width="45"
                          height="45"
                          className="rounded-circle"
                        />
                      </td>
                      <td>{item["u_name"]}</td>
                      <td>{item["u_email"]}</td>
                      <td>{item["u_faculty"]}</td>
                      <td>{item["u_major"]}</td>
                      <td>{item["u_year"]}</td>
                      <td>{item["u_phone"]}</td>
                      <td>{item["u_birthday"]}</td>
                      <td>{item["u_address"]}</td>
                      <td>
                        <Button
                          color="warning"
                          onClick={() => {
                            toggle(
                              "edit",
                              item["u_id"],
                              item["u_name"],
                              item["u_email"],
                              item["u_faculty"],
                              item["u_major"],
                              item["u_year"],
                              item["u_phone"],
                              item["u_birthday"],
                              item["u_address"]
                            );
                            setmodaledit(true);
                          }}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          color="danger"
                          onClick={() => {
                            toggle(
                              "delete",
                              item["u_id"],
                              null,
                              null,
                              null,
                              null,
                              null,
                              null,
                              null,
                              null
                            );
                            setmodaledit(false);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
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

export default Admin_user_management;
