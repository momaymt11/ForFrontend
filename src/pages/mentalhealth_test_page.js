import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Input,
  InputGroup,
  Label,
  Row,
  InputGroupText,
  Button,
  Col,
} from "reactstrap";
import Custom_Navbar from "../components/Custom_Navbar";
import axios from "axios";
import { URL } from "../Api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Custom_Navbar/Footer";
function Mentalhealth_test_page() {
  const navigate = useNavigate();
  // return <div>doctor_page</div>;
  const [question, setQuestion] = useState([]);

  const [nameInsert, setNameInsert] = useState("");
  const [emailInsert, setEmailInsert] = useState("");
  const [questionInsert, setQuestionInsert] = useState([]);

  const [checklength, setchecklength] = useState(0);
  const [lastrdio, setlastrdio] = useState(1);
  useEffect(() => {
    axios
      .post(URL + "/rabfang_api/mentalhealth/question")
      .then(function (response) {
        if (response.data.status) {
          setQuestion(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const updateArray = (index) => (e) => {
    setlastrdio(index);
    if (lastrdio != index) {
      setchecklength(checklength + 1);
    }

    console.log(checklength);
    const updatequestionInsert = [...questionInsert];
    updatequestionInsert[index] = {
      id: e.target.name,
      value: e.target.value,
    };
    setQuestionInsert(updatequestionInsert);
    console.log(updatequestionInsert);
  };


  const containArr = () => {
    var i = 0; 
    questionInsert.forEach((element) => {
      if(element !== undefined){
        i++;
      }
    });
    return i;
  }

  const send_form = async () => {
    if (containArr() === question.length) {
      //check ratio all array has value
      axios
        .post(URL + "/rabfang_api/mentalhealth/add_form", {
          name: nameInsert,
          email: emailInsert,
          answer: JSON.stringify(questionInsert),
        })
        .then(function (response) {
          if (response.data.status) {
            navigate("/mentalhealth_result", {
              state: {
                result: response.data.resulttest,
              },
            });
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Custom_Navbar />
      <Container style={{ paddingTop: "100px" }}>
        <h1>Mental health test</h1>
        <ui>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <CardTitle>
              <div>{"Hi, there! What's your name?"}</div>
            </CardTitle>
            <CardBody>
              <Input
                type="text"
                onChange={(event) => {
                  setNameInsert(event.target.value);
                }}
              />
            </CardBody>
          </Card>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <CardTitle>
              <div>
                {
                  "Please type down your email for receiving newsletters and benefits from us."
                }
              </div>
            </CardTitle>
            <CardBody>
              <Input
                type="email"
                onChange={(event) => {
                  setEmailInsert(event.target.value);
                }}
              />
            </CardBody>
          </Card>
          {question.map((item, index) => (
            <Card key={item["id"]} style={{ padding: "10px", margin: "10px" }}>
              <CardTitle>
                <div>
                  {" "}
                  {item["id"]}.) {item["title"]}
                </div>
              </CardTitle>
              <Container style={{ padding: "10px" }}>
                {item["choice"].map((i) => (
                  <Container
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                         <div class="container">
                      <div class="row">
                        <div class="col-md-6">
                    {i["choicevalue"].map((j) => (
                      <Container
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                     
                        <input
                          type="radio"
                          name={i["qname"]}
                          value={j["value"]}
                          onChange={updateArray(index)}
                        ></input>
                   
                        <span style={{ paddingLeft: "10px" }}>{j["name"]}</span>
                      </Container>
                    ))}
                    </div>
                      </div>
                      </div>
                  </Container>
                ))}
              </Container>
            </Card>
          ))}
        </ui>
      </Container>
      <Button
        color="primary"
        style={{ margin: "10px" }}
        onClick={async () => {
          send_form();
        }}
      >
        Submit
      </Button>
      <Footer />
    </Container>
  );
}

export default Mentalhealth_test_page;
