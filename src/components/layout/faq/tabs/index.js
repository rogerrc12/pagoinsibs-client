import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';
import AccountQuestions from '../questions/Account';


const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const FaqTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper style={{ flexGrow: 1 }}>
      <Tabs
        value={value} onChange={handleChange}
        indicatorColor="primary" textColor="primary"
        orientation="horizontal" variant="scrollable" 
        scrollButtons="on"
      >
        <Tab label="Mi cuenta" {...allyProps(0)} />
        <Tab label="Transferencias" {...allyProps(1)} />
        <Tab label="Pagos" {...allyProps(2)} />
        <Tab label="Domiciliaciones" {...allyProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountQuestions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        yo  estoy bien y tu?
      </TabPanel>
    </Paper>
  )
}

export default FaqTabs;
