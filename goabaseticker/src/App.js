import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoaBase from "./Components/Goabase";
import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Köln</Nav.Link>
                            <Nav.Link href="/umkreis">Umkreis</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={<GoaBase cityName={"Köln"}></GoaBase>}
                    ></Route>
                    <Route path="/umkreis" element={<div>Umkreis</div>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
