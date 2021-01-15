import React from "react";
import { Route } from "react-router-dom";

import PaymentOptions from "./PaymentOptions";
import PaymentForms from "./PaymentForms";

const Payments = (props) => {
  return (
    <main className='main-pago main-user__dash'>
      <Route exact path={props.match.url} component={PaymentOptions} />

      <Route path={props.match.url + "/:paymentForm"} component={PaymentForms} />
    </main>
  );
};

export default Payments;
