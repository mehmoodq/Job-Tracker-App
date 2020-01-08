import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ApplicationsList from "./components/applications-list.component";
import EditApplication from "./components/edit-application.component";
import CreateApplication from "./components/create-application.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ApplicationsList} />
        <Route path="/edit/:id" component={EditApplication} />
        <Route path="/create" component={CreateApplication} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
