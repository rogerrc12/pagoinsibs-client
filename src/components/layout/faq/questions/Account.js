import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 'bold',
  },
  content: {
    fontSize: theme.typography.pxToRem(14)
  }
}));

const AccountQuestions = () => {
  const classes = useStyles();

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>¿Qué es pago INSIBS?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.content}>
          Es una plataforma digital de pagos y cobranza, que te permite realizar múltiples operaciones desde diferentes instrumentos financieros y desde un gran numero de bancos aliados.
          <br />
          <br />
          Podrás realizar transfererencias a otros usarios, hacer pagos a tus comercios favoritos y domiciliar aquellos pagos mensuales desde un solo lugar.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Expansion Panel 2</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}

export default AccountQuestions;
