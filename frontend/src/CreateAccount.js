import React, { Component } from 'react';
import {
  Box,
  Button,
  Heading,
  Grommet,
  FormField,
  Form,
  Text,
  RadioButtonGroup,
} from 'grommet';

import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#36454f',
      focus: '#ffffff'
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

export class CreateAccount extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grommet theme={theme} full>
        <AppBar>
          <a style={{ color: "#ffffff", textDecoration: 'inherit' }} href="/"><Heading level='3' margin='none'>MediCarePro - <i> Your Health, Our Priority </i></Heading></a>
        </AppBar>
        <Box justify="top" style={{ background: 'white', color: '#6e7f80' }}>
          <Box width="high">
            <div style={{ margin: '20px' }}></div>
            <Text color="#36454f" style={{ fontSize: '36px', margin: '20px 0', marginLeft: '20px' }}><b> Register Yourself, Today! </b></Text>
            <div style={{ margin: '20px' }}></div>
            <Form
              onReset={event => console.log(event)}
              method="post"
              onSubmit={({ value }) => {
                console.log("Submit", value);
                console.log("Submit", value);

                fetch("http://localhost:3001/checkIfPatientExists?email=" + value.email)
                  .then(res => res.json())
                  .then(res => {
                    console.log(res.data[0]);

                    if ((res.data[0])) {
                      window.alert("An account is already associated with that email.");
                      console.log("no user found");
                    } else {
                      fetch("http://localhost:3001/makeAccount?name=" + value.firstName + "&lastname=" + value.lastName + "&email=" + value.email
                        + "&password=" + value.password + "&address=" + value.address + "&gender=" + value.gender
                        + "&conditions=" + value.conditions + "&medications=" + value.medications + "&surgeries=" + value.surgeries);
                      window.location = "/Home";
                    }
                  });
              }}>
              <div style={{ marginLeft: '20px' }}>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <FormField  
      label="First Name"
      name="firstName"
      placeholder="Enter your first name"
      required
      validate={{ regexp: /^[a-z]/i }}
    />
                  <div style={{ marginLeft: '40px' }}></div>
    <FormField
      label="Last Name"
      name="lastName"
      required
      placeholder="Enter your last name"
      validate={{ regexp: /^[a-z]/i }}
    />
                  <Text color="#36454f" style={{ fontSize: '30px', margin: '20px 0', marginLeft: '280px' }}><b> Previous Medical History </b></Text>
  </div>
  <div style={{ margin: '20px' }}></div>
</div>
<div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginLeft: '30px' }}>
                <label style={{ fontSize: '18px' }}>Choose your gender</label>
                <div style={{ margin: '20px' }}></div>
                <RadioButtonGroup
                  name="gender"
                  options={['Male', 'Female', 'Others']}
                  required
                />
              </div>
              <div style={{ marginLeft: '650px' }}>
              <FormField
                  label="Past Medications (if any)"
                  name="medications"
                  placeholder="Enter your medications"
                />
                </div>
                <div style={{ marginLeft: '70px' }}>
                <FormField
                  label="Conditions (if any)"
                  name="conditions"
                  placeholder="Enter your conditions"
                />
                </div>
              </div>
              <div style={{ marginLeft: '20px' }}>
              <div style={{ margin: '20px' }}></div>
              <div style={{ marginRight: '' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
              <FormField
                  label="Address"
                  name="address"
                  placeholder="Enter your address"
                  required />
                                  <div style={{ marginLeft: '560px' }}>
                                            <FormField
                  label="Surgeries (if any)"
                  name="surgeries"
                  placeholder="Enter your surgeries"
                />
                </div>
                </div>
              </div>
              <div style={{ margin: '40px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required />
                <div style={{ marginLeft: '50px' }}></div>
                <FormField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  validate={{ regexp: /^(?=.{8,})(?=.*[0-9]{2})/, message: "At least 8 characters containing 2 digits" }}
                />                            
                <div style={{ marginLeft: '280px' }}>
                <div style={{ margin: '20 px' }}></div>
                <Text>Are you a doctor?&nbsp;&nbsp;&nbsp;</Text>
                <Button
                  primary
                  label="I'm a doctor"  
                  href="/MakeDoc" />
              </div>
                </div>
                </div>
                <div style={{ marginLeft: '20px' }}>
              <div style={{ margin: '40px' }}></div>
                <div style={{ margin: '20px' }}></div>
                <div style={{ marginRight: '1000px' }}>

                </div>

                <div style={{ margin: '70px' }}></div>
              </div>
              <Box direction="row" >
              <div style={{ marginLeft: '500px' }}></div>
                <Button
                  style={{ textAlign: 'center', width: '200px',borderRadius: '10px' }}
                  label="Cancel"
                  fill="horizontal"
                  href="/" />
                                <div style={{ marginLeft: '100px' }}></div>
                <Button
                style={{ width: '200px',borderRadius: '10px' }} 
                  label="Sign Up"
                  fill="horizontal"
                  type="submit"
                  primary />
              
              </Box>
              <div style={{ marginBottom: '100px' }}></div>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default CreateAccount;
