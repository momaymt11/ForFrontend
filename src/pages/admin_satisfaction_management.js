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
function Admin_satisfaction_management() {
  const navigate = useNavigate();
  const [resultList, setResultList] = useState([]);

  const [modaledit, setmodaledit] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalAdd, setmodalAdd] = useState(false);

  const [addValue, setaddValue] = useState("");
  const [editId, seteditId] = useState("");
  const [editValue, seteditValue] = useState("");
  const [deleteId, setDeleteId] = useState("");

  //error
  const [errormsg, seterrormsg] = useState("");
  const toggle = (action, id, value) => {
    setModal(!modal);
    if (action == "edit") {
      seteditId(id);
      seteditValue(value);
    } else {
      setDeleteId(id);
    }
  };
  const toggleAdd = () => {
    setmodalAdd(!modalAdd);
  };

  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/admin/satisfaction_list")
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
      .post(URL + "/rabfang_api/admin/satisfaction_add", {
        s_f_question: addValue,
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
      .post(URL + "/rabfang_api/admin/satisfaction_edit", {
        s_f_id: editId,
        s_f_question: editValue,
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
      .post(URL + "/rabfang_api/admin/satisfaction_delete", {
        s_f_id: deleteId,
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
    setaddValue("");
    seteditId("");
    seteditValue("");
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
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Add </h2>
            <FormGroup>
              {errormsg ? (
                <Alert color="danger" fade={true}>
                  <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                </Alert>
              ) : (
                " "
              )}
              <Label>Question Name :</Label>
              <Input
                type="text"
                onChange={(event) => {
                  setaddValue(event.target.value);
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
          {modaledit === true ? (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>Edit </h2>

              <FormGroup>
                {errormsg ? (
                  <Alert color="danger" fade={true}>
                    <div dangerouslySetInnerHTML={{ __html: errormsg }} />
                  </Alert>
                ) : (
                  " "
                )}
                <Label>Question Name :</Label>
                <Input
                  type="text"
                  onChange={(event) => {
                    seteditValue(event.target.value);
                  }}
                  defaultValue={editValue}
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
              {" "}
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
              <h2>Satisfaction Management</h2>
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
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Question</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {resultList.map((item, index) => (
                  <tr>
                    <td scope="row">{item["s_f_id"]}</td>

                    <td>{item["s_f_question"]}</td>

                    <td>
                      <Button
                        color="warning"
                        onClick={() => {
                          toggle("edit", item["s_f_id"], item["s_f_question"]);
                          setmodaledit(true);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => {
                          toggle("delete", item["s_f_id"], null);
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

export default Admin_satisfaction_management;
