import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import TransfersTable from '../tables/TransfersTable';
import PaymentsTable from '../tables/PaymentsTable';
import DebitsTable from '../tables/DebitsTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const TransactionTabs = ({ payments, debits }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  
  const paymentsList = () => (
    payments.length > 0 ? 
      <PaymentsTable payments={payments} /> 
      : <Link to="/payments" className="button">Hacer mi primer pago</Link>
  );
  
  const debitsList = () => (
    debits.length > 0 ? 
      <DebitsTable debits={debits} /> 
      : <Link to="/payments" className="button">Hacer mi primera domiciliación</Link>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="transacciones realizadas"
          orientation="horizontal"
        >
          <Tab label={<h4 className="payments-button"><i className="fas fa-dot-circle"/> Pagos</h4>} {...a11yProps(0)} />
          <Tab label={<h4 className="debits-button"><i className="fas fa-info-circle"/> Domiciliaciones</h4>} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>{paymentsList()}</TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>{debitsList()}</TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default TransactionTabs;