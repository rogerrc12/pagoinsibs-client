import React, { useEffect, useRef } from "react";

const PaypalButton = (props) => {
  const { amount, description, onApprove, onError, onCancel } = props;

  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, { order }) =>
          order.create({
            purchase_units: [
              {
                description,
                amount: {
                  value: amount.toFixed(2),
                },
              },
            ],
          }),
        onApprove,
        onCancel,
        onError,
      })
      .render(paypal.current);
    // eslint-disable-next-line
  }, []);

  return <div id='paypal-button' ref={paypal}></div>;
};

export default PaypalButton;
