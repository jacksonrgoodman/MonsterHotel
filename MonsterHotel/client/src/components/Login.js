import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import { Card, CardBody } from "reactstrap";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <Card>
      <CardBody>
        <h1>Login</h1>
        <Form onSubmit={loginSubmit}>
          <fieldset>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <br />
              <Button className="open">Login</Button>
            </FormGroup>
            <em>
              <br />
              Not registered? <Link to="register">Register</Link>
            </em>
          </fieldset>
        </Form>
      </CardBody>
      <img className="miniLogoGhost" src="../../img/ghostie.png" />
    </Card>
  );
}