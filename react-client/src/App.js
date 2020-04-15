import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//

import VitalSigns from "./components/VitalSigns";
import RegisterUser from "./components/RegisterUser";
import Login from "./components/Login";
import Home from "./components/Home";

//
function App() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registerUser">Register</Nav.Link>
              <Nav.Link href="/vitalSigns">Add Vital Signs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <Route render={() => <Home />} path="/home" />
          <Route render={() => <Login />} path="/login" />
          <Route render={() => <RegisterUser />} path="/registerUser" />
          <Route render={() => <VitalSigns />} path="/vitalSigns" />
        </div>
      </Router>
    );
}
//<Route render ={()=> < App />} path="/" />
export default App;
