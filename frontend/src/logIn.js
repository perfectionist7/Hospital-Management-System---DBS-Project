import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Grommet,
  FormField,
  Form,
  CheckBox,
} from 'grommet';

import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#36454f',
      focus: "#ffffff",
      active: "#000000",
    },
    font: {
      family: 'Roboto',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='#36454f'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1' }}
    {...props} />
);

class LogIn extends Component {
  state = { isDoctor: false }

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = '/Home';
    this.props.history.push(path);
  }

  render() {
    const { isDoctor } = this.state; // If doctor, will query from doctor table

    return (
      <Grommet theme={theme} full>
        <AppBar>
        <a style={{ color: "#ffffff", textDecoration: "#ffffff"}} href="/"><Heading level='3' margin='none'>MediCarePro - <i> Your Health, Our Priority</i></Heading></a>
        </AppBar>

        <Box
          fill
          align="center"
          justify="top"
          pad="medium"
          style={{ background: 'white', color: '#6e7f80' }}>
          <Box
            width="medium"
            pad="medium">
            <Form

              onReset={event => console.log(event)}
              onSubmit={({ value }) => {
                console.log("Submit", value);
                if (value.isDoc === true) {
                  fetch("http://localhost:3001/checkDoclogin?email=" + value.email +
                    "&password=" + value.password)
                    .then(res => res.json())
                    .then(res => {
                      if (res.data.length === 0) {
                        window.alert("Invalid Log In");
                      } else {
                        window.location = "DocHome";
                        console.log(res.data);
                      }
                    });
                } else {
                  fetch("http://localhost:3001/checklogin?email=" + value.email +
                    "&password=" + value.password)
                    .then(res => res.json())
                    .then(res => {
                      if (res.data.length === 0) {
                        window.alert("Invalid Log In");
                      } else {
                        window.location = "/Home";
                        console.log(res.data);
                      }
                    });
                }
              }
              }>
                <Box align="center" >
              <FormField
                component={CheckBox}
                checked={isDoctor}
                margin='20px'
                label="Are you a doctor?"
                name="isDoc"
                onChange={(event) => {
                  this.setState({ isDoctor: event.target.checked })
                }}
                className="custom-checkbox"
              />
              <div style={{ margin: '10px' }}></div>
              </Box>
              <FormField
                className="password-input"
                color="#000000"
                label="Username"
                name="email"
                type="email"
                placeholder = "Enter your username"
                required />
                <div style={{ margin: '20px' }}></div>
              <FormField
                className="password-input"
                color="#000000"
                type='password'
                label="Password"
                name="password"
                placeholder = "Enter your password"
                required />
              <div style={{ margin: '20px' }}></div>
              <Box direction="column" align="center" >
                <Button style={{ textAlign: 'center' , margin:'1rem', borderRadius: '10px' }}
                 type="submit" label="Log In" fill="horizontal" />
                <Button label="Register Yourself"
                  style={{ textAlign: 'center' , margin:'0.5rem', borderRadius: '10px'}}
                  fill="horizontal" primary
                  href="/createAcc" />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
  }
}
export default withRouter(LogIn);