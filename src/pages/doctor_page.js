import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Modal,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import Custom_Navbar from "../components/Custom_Navbar";
import { CgProfile, CgSmileSad } from "react-icons/cg";

function Satisfaction_form() {
  const [ismodal, setIsmodal] = useState(false);
  // return <div>doctor_page</div>;
  return (
    <Container>
      <Custom_Navbar />
      <Container
        fluid
        style={{
          paddingTop: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            minWidth: "30vh",
            minHeight: "25vh",
            marginBottom: "15px",
            marginTop: "30px",
          }}
        >
          <CardBody
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CgProfile style={{ fontSize: "100px", margin: "10px" }} />
            <span style={{ margin: "5px" }}>Psychiatrist Name: xxxx xxxx</span>
            <span style={{ margin: "5px" }}>Date now : dd/mm/yyy</span>
          </CardBody>
          <CardFooter
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <span> today queue : x</span>
            <span>Done :x</span>
          </CardFooter>
        </Card>
      </Container>
      <h5> work schedule @ dd/mm/yy</h5>
      <Table bordered responsive striped style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>dd/mm/yy</td>
            <td>@mdo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsmodal(!ismodal)}> click </Button>{" "}
            </td>
          </tr>
        </tbody>
      </Table>
      <Container fluid style={{ display: "flex", justifyContent: "center" }}>
        <Pagination>
          <PaginationItem>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" previous />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" next />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" last />
          </PaginationItem>
        </Pagination>
      </Container>
      <Modal isOpen={ismodal} toggle={() => setIsmodal(!ismodal)}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "40vh",
          }}
        >
          <div
            style={{
              minWidth: "40vh",
              minHeight: "5vh",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Name : XXXX XXXX
          </div>
          <Card
            style={{
              minWidth: "40vh",
              minHeight: "10vh",
              margin: "10px",
              marginTop: "0px",
            }}
          >
            <CardHeader>Detail</CardHeader>
            <Container
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Name : XXXXX XXXXX</span>
              <span>Age : XXX</span>
              <span>major : XXX</span>
              <span>faculty : XXX</span>
              <span>year : XXX</span>
              <span>address : XX/XX X.XXXXX X.XXXX X.XXX XXXXXX</span>
            </Container>
          </Card>
          <Card style={{ minWidth: "40vh", minHeight: "10vh", margin: "10px" }}>
            <CardHeader>Mental Health Result</CardHeader>
            <Container
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h4>Title</h4>
                <span> some detail </span>
              </div>
              <h1 style={{ color: "gray", marginRight: "20px" }}>|</h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <CgSmileSad style={{ color: "red", fontSize: "100px" }} />
                <h3>2 Point</h3>
              </div>
            </Container>
          </Card>
        </Container>
      </Modal>
    </Container>
  );
}

export default Satisfaction_form;
