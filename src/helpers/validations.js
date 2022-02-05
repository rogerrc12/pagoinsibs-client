import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .required("Debes colocar un email.")
    .email("Coloca un email válido."),
  password: Yup.string().required("Debes colocar una contraseña."),
});

export const userSignupValidation = Yup.object().shape({
  first_name: Yup.string().required("Introduce tu primer nombre."),
  last_name: Yup.string().required("Introduce tu primer apellido."),
  ci_type: Yup.string().required("Selecciona un tipo de cédula."),
  ci_number: Yup.string()
    .required("Introduce tu cédula de identidad.")
    .matches(/^[0-9]{5,8}$/i, "Cédula incorrecta. Verifica el largo."),
  email: Yup.string()
    .required("Introduce un correo electrónico.")
    .email("Formato de correo inválido."),
  secondaryEmail: Yup.string()
    .notRequired()
    .email("Formato de correo inválido."),
  username: Yup.string()
    .required("Introduce un nombre de usuario.")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d]{4,12}$/i, "Debe contener al menos 1 letra y 1 número. Máximo 12 caracteres."),
  password: Yup.string()
    .required("Introduce una contraseña.")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_\-+=]{6,}$/, "Debe contener al menos 1 letras y 1 número."),
  confirm_password: Yup.string()
    .required("Debes confirmar la contraseña.")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
  terms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones.")
    .required(),
});

export const DebitValidation = Yup.object().shape({
  supplierType: Yup.number().required("Elige una opción."),
  supplierId: Yup.number().required("Elige un comercio."),
  productId: Yup.number().required("Elge un producto."),
  currencyId: Yup.number().required("Debes seleccionar la moneda de pago."),
  description: Yup.string().required("Debes agregar una descripción."),
  amount: Yup.number().required("Selecciona un producto correcto."),
  paymentType: Yup.string().required("Debes seleccionar una forma de pago."),
  debitType: Yup.string().required("Debes elegir un tipo de domiciliación."),
  paymentPeriod: Yup.string().when("debitType", {
    is: "fraccionado",
    then: Yup.string().required("Selecciona el periodo de pago."),
  }),
  paymentFrequency: Yup.number().when("debitType", {
    is: "fraccionado",
    then: Yup.number().required("Selecciona el tiempo de pago."),
  }),
  accountId: Yup.number().when("paymentType", {
    is: "account",
    then: Yup.number().required("Debes seleccionar una de tus cuentas."),
    otherwise: Yup.number().notRequired(),
  }),
  terms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones.")
    .required(),
});

export const PaymentValidation = (type) =>
  Yup.object().shape({
    supplierType: type === "company" ? Yup.number().notRequired() : Yup.number().required("Debes seleccionar una opción."),
    supplierId: Yup.number().required("Debes seleccionar un comercio."),
    productId: type === "company" ? Yup.number().notRequired() : Yup.number().required("Debes seleccionar un producto."),
    currencyId: Yup.number().required("Debes seleccionar la moneda de pago."),
    paymentType: Yup.string().required("Debes seleccionar una forma de pago."),
    description: Yup.string().required("Debes agregar una descripción."),
    amount: Yup.number()
      .typeError("Solo se aceptan números")
      .required("Debes colocar un monto correcto."),
    accountId: Yup.number().when("paymentType", {
      is: "account",
      then: Yup.number().required("Debes elegir una de tus cuentas."),
      otherwise: Yup.number().notRequired(),
    }),
    cardName: Yup.string().when("paymentType", {
      is: "card",
      then: Yup.string().required("Debes colocar un nombre."),
      otherwise: Yup.string().notRequired(),
    }),
    cardNumber: Yup.string().when("paymentType", {
      is: "card",
      then: Yup.string()
        .required("Debes colocar un número de tarjeta.")
        .matches(/^((4\d{3})|(5[1-5]\d{2})|(6011)|(34\d{1})|(37\d{1}))-?\s?\d{4}-?\s?\d{4}-?\s?\d{4}|3[4,7][\d\s-]{15}$/, "Debes colocar un número válido."),
      otherwise: Yup.string().notRequired(),
    }),
    cardCedula: Yup.string().when("paymentType", {
      is: "card",
      then: Yup.string()
        .required("Debes colocar la cédula del titular.")
        .matches(/^[0-9]{6,9}$/, "Debes colocar una cédula válida."),
      otherwise: Yup.string().notRequired(),
    }),
    cardMonth: Yup.string().when("paymentType", {
      is: "card",
      then: Yup.string().required("Seleccione una fecha."),
      otherwise: Yup.string().notRequired(),
    }),
    cardYear: Yup.string().when("paymentType", {
      is: "card",
      then: Yup.string().required("Seleccione una fecha."),
      otherwise: Yup.string().notRequired(),
    }),
    cardCvc: Yup.string().when("paymentType", {
      is: "card",
      then: Yup.string()
        .required("Debes colocar el CVC (parte trasera).")
        .matches(/^[0-9]{3}$/, "Coloque un CVC válido."),
      otherwise: Yup.string().notRequired(),
    }),
    terms: Yup.boolean()
      .oneOf([true], "Debes aceptar los términos y condiciones.")
      .required(),
  });
