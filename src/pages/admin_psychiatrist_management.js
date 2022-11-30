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
import { TagsInput } from "react-tag-input-component";
function Admin_psychiatrist_management() {
  const navigate = useNavigate();
  const [resultList, setResultList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAdd, setmodalAdd] = useState(false);
  const [modaledit, setmodaledit] = useState(false);
  //crud
  const [psyId, setpsyId] = useState("");
  const [psyName, setpsyName] = useState("");
  const [psyEmail, setpsyEmail] = useState("");
  const [password, setpassword] = useState("");
  const [psyLang, setpsyLang] = useState([]);

  const [deleteId, setDeleteId] = useState("");

  //error
  const [errormsg, seterrormsg] = useState("");
  const toggle = (action, id, val1, val2, val3) => {
    setModal(!modal);
    if (action == "edit") {
      setpsyId(id);
      setpsyName(val1);
      setpsyEmail(val2);
      setpsyLang(val3.split(","));
    } else {
      setDeleteId(id);
    }
  };

  const toggleAdd = () => {
    setmodalAdd(!modalAdd);
  };
  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/admin/psy_list")
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
      .post(URL + "/rabfang_api/admin/psy_add_account", {
        psy_name: psyName,
        psy_email: psyEmail,
        password: password,
        psy_lang: psyLang.toString(),
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
      .post(URL + "/rabfang_api/admin/psy_update_account", {
        psy_id: psyId,
        psy_name: psyName,
        psy_email: psyEmail,
        password: password,
        psy_lang: psyLang.toString(),
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
      .post(URL + "/rabfang_api/admin/psy_delete", {
        psy_id: deleteId,
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
    setpsyId("");
    setpsyName("");
    setpsyEmail("");
    setpassword("");
    setpsyLang([]);

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
              <Label>Name :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setpsyName(event.target.value);
                }}
                defaultValue={psyName}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Email :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setpsyEmail(event.target.value);
                }}
                defaultValue={psyEmail}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Language :</Label>

              <TagsInput
                value={psyLang}
                onChange={setpsyLang}
                placeHolder="enter language"
              />
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
                <Label>Name :</Label>
                <Input
                  type="text"
                  onChange={(event) => {
                    setpsyName(event.target.value);
                  }}
                  defaultValue={psyName}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Email :</Label>
                <Input
                  type="text"
                  onChange={(event) => {
                    setpsyEmail(event.target.value);
                  }}
                  defaultValue={psyEmail}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>New Password :</Label>
                <Input
                  type="text"
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Language :</Label>

                <TagsInput
                  value={psyLang}
                  onChange={setpsyLang}
                  placeHolder="enter language"
                />
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
              <h2>Psychiatrist management</h2>
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
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col">Emaill</th>
                  <th scope="col">Language</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resultList.map((item, index) => (
                  <tr>
                    <td scope="row">{item["psy_id"]}</td>
                    <td>
                      <img
                        src={item["psy_image"]}
                        width="45"
                        height="45"
                        className="rounded-circle"
                      />
                    </td>
                    <td>{item["psy_name"]}</td>
                    <td>{item["psy_email"]}</td>
                    <td>{item["psy_lang"]}</td>
                    <td>
                      <Button
                        color="warning"
                        onClick={() => {
                          toggle(
                            "edit",
                            item["psy_id"],
                            item["psy_name"],
                            item["psy_email"],
                            item["psy_lang"]
                          );
                          setmodaledit(true);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => {
                          toggle("delete", item["psy_id"], null, null, null);
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
          </Col>
        </Row>
      </Container>

      <Footer />
    </Container>
  );
}

export default Admin_psychiatrist_management;
