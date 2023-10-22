import React, { Component, useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
    Grid,
    Text,
} from 'grommet';

import './App.css';

const theme = {
    global: {
        colors: {
            brand: '#36454f',
            focus: '#000000'
        },
        font: {
            family: 'Lato',
        },
    },
};

const SidebarButton = ({ label, ...rest }) => (
    <Button plain {...rest}>
        {({ hover }) => (
            <Box
                background={hover ? "#ffffff" : undefined}
                pad={{ horizontal: "large", vertical: "medium" }}
            >
                <Text size="large">{label}</Text>
            </Box>
        )}
    </Button>
);

const SidebarButtons = () => {
    const [active, setActive] = useState();
    return (
        <Grommet full theme={theme}>
            <Box fill direction="row">
                <Box background="brand">
                    {["Appointments Scheduled", "View Patients", "Settings", "Sign Out"].map(label => (
                        <SidebarButton
                            key={label}
                            label={label}
                            active={label === active}
                            onClick={() => {
                                // if (label === "Appointments Scheduled") {
                                //     window.location = "/ApptList"
                                // }
                                if (label === "Sign Out") {
                                    fetch("http://localhost:3001/endSession");
                                    window.location = "/"
                                }
                                // else if (label === "Settings") {
                                //     window.location = "/DocSettings"
                                // }
                                // else if (label === "View Patients") {
                                //     window.location = "/MedHistView"
                                // }
                                setActive(label);
                            }}
                        />
                    ))}

                </Box>
            </Box>
        </Grommet>
    );
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

export class DocHome extends Component {
    componentDidMount() {
    }

    render() {
        const Header = () => (
            <Box
                tag='header'
                background='brand'
                pad='small'
                elevation='small'
                justify='between'
                direction='row'
                align='center'
                flex={false}
                style={{borderBottom:"1px solid grey"}}
            >
      <AppBar>
          <a style={{ color: "#ffffff", textDecoration: 'inherit' }} href="/"><Heading level='3' margin='none'>MediCarePro - <i> Your Health, Our Priority </i></Heading></a>
        </AppBar>

            </Box>
        );

        return (
            <Grommet full={true}
                theme={theme}>
                <Box align="left">
                    <Header/>
                    <Grid
                        fill
                        rows={['auto', 'flex']}
                        columns={['auto', 'flex']}
                        areas={[
                            { name: 'sidebar', start: [0, 1], end: [0, 1] },
                            { name: 'main', start: [1, 1], end: [1, 1] },
                        ]}>
                        <Box
                        gridArea="sidebar"
                        width="small"
                        animation={[
                        { type: 'fadeIn', duration: 300 },
                        { type: 'slideRight', size: 'xlarge', duration: 150 },
                        ]}
                        >
                            <SidebarButtons />
                        </Box>
                        <Box
                            gridArea="main"
                            justify="top"
                            align="center">
                                          <Box align="center" pad="large">
              <Text color="#36454f" style={{ fontSize: '46px', margin: '20px 0', marginLeft: '120px' }}><b> Doctor's Dashboard </b></Text>
              </Box>
              {/* <Text color="#36454f" style={{ fontSize: '36px', margin: '20px 0', marginLeft: '120px' }}><b> Welcome to the Patient's Dashboard </b></Text> */}
              <Text color="#36454f" style={{ fontSize: '24px', margin: '20px 0', marginLeft: '120px' }}><b> Select one of the options on the sidebar to continue. </b></Text>
                        </Box>
                    </Grid>
                </Box>
            </Grommet>
        );
    }
}

export default DocHome;