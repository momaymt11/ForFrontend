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
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

function Admin_Custom_Navbar() {
  const navigate = useNavigate();
  const [modallogin, setmodallogin] = useState(false);
  const [formlogin, setformlogin] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {}, []);
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
        <NavbarBrand>PSU RABFANG</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="me-auto" navbar>
            {/* <NavItem> */}
            <NavLink href="/admin_user_management">User management</NavLink>
            <NavLink href="/admin_psychiatrist_management">
              Psychiatrist management
            </NavLink>
            <NavLink href="/admin_mental_health_management">
              Mental health management
            </NavLink>
            <NavLink href="/admin_satisfaction_management">
              Satisfaction management
            </NavLink>
            <NavLink href="/admin_satisfaction_result">
              Satisfaction Result
            </NavLink>

            {/* </NavItem> */}
          </Nav>
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
  );
}

export default Admin_Custom_Navbar;
