import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Flip from 'react-reveal/Flip'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <article className="features content">

      <div className="container">
        <div className="row">

          <div className="col-md-4 text-md-left text-center">
            <h2>Seguro, rápido y simple</h2>
            <Flip bottom delay={300}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Caracteristicas"
              >
                <Tab icon={<AccountCircleIcon />} label="Completa tu perfil" {...a11yProps(0)} />
                <Tab icon={<AccountBalanceWalletIcon />} label="Agrega tus cuentas" {...a11yProps(1)} />
                <Tab icon={<PaymentIcon />} label="Realiza tus pagos" {...a11yProps(2)} />
              </Tabs>
            </Flip>
          </div>

          <div className="col-md-8">
            <TabPanel value={value} index={0}>
              <div className="features-content">
                <img src="img/phones/phone-perfil.png" alt="Completa tu perfil"/>
                <div className="features-info">
                  <h4>Mi perfil</h4>
                  <p>Identificate y disfruta de nuestros beneficios.</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="features-content">
                <img src="img/phones/phone-cuenta.png" alt="Agrega tus cuentas"/>
                <div className="features-info">
                  <h4>Mis cuentas</h4>
                  <p>Coloca tus datos bancarios y registralos.</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="features-content">
                <img src="img/phones/phone-pagos.png" alt="Realiza tus pagos"/>
                <div className="features-info">
                  <h4>Hacer pagos</h4>
                  <p>Sigue los pasos, realiza tu confirmación y listo!</p>
                </div>
              </div>
            </TabPanel>
          </div>

        </div>
      </div>
      
    </article>
  );
}