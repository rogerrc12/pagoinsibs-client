import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts(props) {
  const { error } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    error ? setOpen(true) : setOpen(false);
  }, [error]);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert severity='error' variant='outlined' className='my-2'>
          {error}
        </Alert>
      </Collapse>
    </div>
  );
}
