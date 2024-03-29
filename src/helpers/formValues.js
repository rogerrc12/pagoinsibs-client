export const RegisterValues = (googleValues) => ({
  first_name: googleValues.given_name || "",
  last_name: googleValues.family_name || "",
  ci_type: "V",
  ci_number: "",
  email: googleValues.email || "",
  secondaryEmail: "",
  username: "",
  password: "",
  confirm_password: "",
  terms: googleValues.email_verified ? true : false,
});

export const DebitValues = {
  supplierType: "",
  supplierId: "",
  productId: "",
  currencyId: "",
  paymentType: "",
  description: "",
  amount: "",
  debitType: "",
  paymentPeriod: "",
  paymentFrequency: 0,
  feeAmount: 0,
  startPaymentDate: null,
  accountId: "",
  WithCurrencyConversion: false,
  terms: "",
};

export const PaymentValues = {
  supplierType: "",
  supplierId: "",
  productId: "",
  currencyId: "",
  paymentType: "",
  paypalEmail: "",
  zelleEmail: "",
  cardName: "",
  cardNumber: "",
  cardCedula: "",
  cardMonth: "",
  cardYear: "",
  cardCvc: "",
  description: "",
  amount: "",
  accountId: "",
  withCurrencyConversion: false,
  terms: "",
};
