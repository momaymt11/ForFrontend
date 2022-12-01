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
function Satisfaction_form() {
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
      .post(URL + "/rabfang_api/satisfaction/question")
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
    console.log(containArr() === question.length);
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
        .post(URL + "/rabfang_api/satisfaction/add_form", {
          name: nameInsert,
          email: emailInsert,
          answer: JSON.stringify(questionInsert),
        })
        .then(function (response) {
          if (response.data.status) {
            navigate("/satisfaction_result");
            //window.location.reload();
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
        <h1>Satisfaction Form</h1>
        <ui>
<Card style={{ padding: "10px", margin: "10px" }}>
            <CardTitle>
              <div>{"Please complete the satisfaction survey on this link after your consultation. "}</div>
              <div>Link: https://docs.google.com/forms/d/e/1FAIpQLSfuNZD_RII4PnDOKnISqWrHiFzA7nmgWjB1fMkDs3QaXHgIvQ/viewform</div>
            </CardTitle>
          
          </Card>
</ui>
      </Container>
      
      <Footer />
    </Container>
  );
}

export default Satisfaction_form;
