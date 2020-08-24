import * as Yup from "yup";
import axios from "./axios";

export const userSignupValidation = (ci_type) =>
  Yup.object().shape({
    first_name: Yup.string().required("Introduce tu primer nombre."),
    last_name: Yup.string().required("Introduce tu primer apellido."),
    ci_type: Yup.string().required("Selecciona un tipo de cédula."),
    ci_number: Yup.string()
      .required("Introduce tu cédula de identidad.")
      .matches(/^[0-9]{5,8}$/i, "Cédula incorrecta. Verifica el largo.")
      .test(
        "unique-cedula",
        "Ya existe una cuenta con esta cédula. Si ya estás registrado inicia sesión.",
        async (cedula) => {
          if (typeof cedula === "undefined") return null;
          const res = await axios.post(
            "/api/validation/cedula",
            { cedula },
            { headers: { "Content-Type": "application/json" } }
          );
          return !res.data;
        }
      ),
    email: Yup.string()
      .required("Introduce un correo electrónico.")
      .email("Formato de correo inválido.")
      .test(
        "unique-email",
        "Ya existe una cuenta con este correo. Si ya estás registrado inicia sesión.",
        async (email) => {
          if (typeof email === "undefined") return null;
          const res = await axios.post(
            "/api/validation/email",
            { email },
            { headers: { "Content-Type": "application/json" } }
          );
          return !res.data;
        }
      ),
    username: Yup.string()
      .required("Introduce un nombre de usuario.")
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d]{4,12}$/i,
        "Debe contener al menos 1 letra y 1 número. Máximo 12 caracteres."
      )
      .test("unique-payId", "Este nombre de usuario se ya existe, por favor utilice otro.", async (pay_id) => {
        if (typeof pay_id === "undefined") return null;
        const res = await axios.post(
          "/api/validation/username",
          { pay_id },
          { headers: { "Content-Type": "application/json" } }
        );
        return !res.data;
      }),
    password: Yup.string()
      .required("Introduce una contraseña.")
      .matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_\-+=]{6,}$/, "Debe contener al menos 1 letras y 1 número."),
    confirm_password: Yup.string()
      .required("Debes confirmar la contraseña.")
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
    terms: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones.").required(),
  });

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
