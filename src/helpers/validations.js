import * as Yup from "yup";

export const domiciliacionValidation = (min) =>
  Yup.object().shape({
    supplier_type: Yup.number().required("Elige una opción."),
    supplier_id: Yup.number().required("Elige un comercio."),
    product_id: Yup.number().required("Elge un producto."),
    description: Yup.string().required("Debes agregar una descripción."),
    total_amount: Yup.number()
      .typeError("Solo se aceptan números")
      .min(
        min,
        `El monto mínimo aceptado es ${min} Bs. para domiciliar este producto. Por favor verifica el monto colocado.`
      )
      .required("Coloca un monto correcto."),
    debit_type: Yup.string().required("Debes elegir una forma de pago."),
    payment_period: Yup.string().when("debit_type", {
      is: "fraccionado",
      then: Yup.string().required("Selecciona el periodo de pago."),
    }),
    payment_frequency: Yup.number().when("debit_type", {
      is: "fraccionado",
      then: Yup.number().required("Selecciona el tiempo de pago."),
    }),
    account_id: Yup.number().required(
      "Selecciona una de tus cuentas para enviar. Debitaremos de esta cuenta tus pagos automáticos."
    ),
    terms: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones.").required(),
  });
