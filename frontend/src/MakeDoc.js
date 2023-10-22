import React, { Component} from 'react';

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
            focus: "#ffffff",
            active: "#000000",
        },
        font: {
            family: 'Lato',
        },
    },
};

const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        style={{ zIndex: '1' }}
        {...props} />
);

export class MakeDoc extends Component {
    constuctor() {
    }
    render() {
        return (
            <Grommet theme={theme} full>
                <AppBar>
                <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>MediCarePro - <i> Your Health, Our Priority </i></Heading></a>
                </AppBar>
                <Box justify="top" style={{ background: 'white', color: '#6e7f80' }}>
                <Box width="high">
                <div style={{ margin: '20px' }}></div>
                    <Text color="#36454f" style={{ fontSize: '36px', margin: '20px 0', marginLeft: '20px' }}><b> Register Yourself! - Doctor </b></Text>
                    <div style={{ margin: '20px' }}></div>
                        <Form
                            onReset={event => console.log(event)}
                            method="post"
                            onSubmit={({ value }) => {
                                console.log("Submit", value);
                                console.log(value.email)
                                fetch("http://localhost:3001/checkIfDocExists?email=" + value.email)
                                    .then(res => res.json())
                                    .then(res => {
                                        console.log(res.data[0]);
                                        if ((res.data[0])) {
                                            window.alert("A doctor is already associated with that email.");
                                            console.log("no user found");
                                        } else {
                                            fetch("http://localhost:3001/makeDocAccount?name=" + value.firstName + "&lastname=" + value.lastName + "&email=" + value.email
                                                + "&password=" + value.password + "&gender=" + value.gender + "&schedule=" + value.schedule);
                                            window.location = "/DocHome";
                                        }
                                    });
                            }} >
                                        <div style={{ marginLeft: '20px' }}>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormField
                                label="First Name"
                                name="firstName"
                                required
                                placeholder="Please enter your first name."
                                validate={{ regexp: /^[a-z]/i }} />
                                                  <div style={{ marginLeft: '40px' }}></div>
                            <FormField
                                label="Last Name"
                                name="lastName"
                                required
                                placeholder="Please enter your last name."
                                validate={{ regexp: /^[a-z]/i }} />
                                  </div>
                                  </div>
                                  <div style={{ margin: '40px' }}></div>
                                  <div style={{ marginLeft: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Please enter your email."
                                required />
                                                <div style={{ marginLeft: '40px' }}></div>
                                                            <FormField
                                label="Password"
                                name="password"
                                required
                                placeholder="Please enter your password."
                                validate={{ regexp: /^(?=.{8,})(?=.*[0-9]{2})/, message: "@ least 8 characters containing 2 digits" }} />
                                              </div>
                                              </div>
                                              <div style={{ marginLeft: '20px', marginRight: '1300px' }}>
                                              <div style={{ margin: '30px' }}></div>
                            <FormField
                                label="Schedule No"
                                name="schedule"
                                placeholder="Please enter schedule number"
                                required />
                                </div>
                                <div style={{ margin: '40px' }}>  </div>
                                <div style={{ marginLeft: '30px' }}>
                <label style={{ fontSize: '18px' }}>Choose your gender</label>
                <div style={{ margin: '20px' }}>                </div>
                                <RadioButtonGroup
                  name="gender"
                  options={['Male', 'Female', 'Others']}
                  required
                />
                </div>
                <div style={{ margin: '70px' }}></div>

                            <Box direction="row">
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

export default MakeDoc;