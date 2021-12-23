import React, { useState } from "react";
import { Avatar, Box, Tab, Tabs, Grid, Paper } from "@mui/material";
import FormLogin from "./FormLogin";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

const TabPanel=(props)=> {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <h1>{children}</h1>}
    </div>
  );
}

const Login = () => {
  const [value, setValue] = useState(0);

  const paperStyle = {padding: 20, height: "500px", width: 280, margin: "20px auto"};
  const avatarStyle = { backgroundColor: "#075c2c" };
  const styleBox={backgroundColor: "#075c2c", color:'white', borderRadius:'10px'}
  const styleTabs={style:{background:'#8fed4d', height:'7px'}}
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Grid>
      <Paper elevation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOpenOutlinedIcon/>
          </Avatar>
          <h2>Checa y Cuadra</h2>
        </Grid>
        <Box>
          <Tabs
          
            style={styleBox}
            value={value}
            onChange={handleChange}
            TabIndicatorProps={styleTabs}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Usuario" icon={<PersonOutlineOutlinedIcon/>}/>
            <Tab label="Contador" icon={<AssignmentIndOutlinedIcon/>}/>
          </Tabs>
          <TabPanel value={value} index={0}>
            <FormLogin rol='Usuario'></FormLogin>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <FormLogin rol='Contador'></FormLogin>
          </TabPanel>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
