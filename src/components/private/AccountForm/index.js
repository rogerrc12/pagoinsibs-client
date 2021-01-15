import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// REDUX
import { connect } from "react-redux";
import { addAccountInit } from "../../../store/actions";

import CustomSelect from "../../UI/FormItems/CustomSelect";
import Input from "../../UI/FormItems/Input";

// Validation schema with yup
const formSchema = Yup.object().shape({
  acc_number: Yup.string()
    .required("Debes colocar un número de cuenta")
    .matches(/^[0-9]{20}$/, "El número de cuenta debe ser de 20 caracteres"),
  bank_id: Yup.string().required("Debes seleccionar un banco"),
  acc_type: Yup.string().required("Debes seleccionar el tipo de cuenta"),
});

const AccountForm = ({ banks, addAccountInit, accData }) => {
  // intial values for Formik (values if edit state, if not empty)
  const initialValues = {
    acc_number: accData ? accData.accNumber : "",
    bank_id: accData ? accData.bank.id : "",
    acc_type: accData ? accData.accType : "",
    to_receive: false,
    acc_id: accData ? accData.id : null,
  };

  // Set select parameters for bank id (react select)
  const insibsBanks = banks.filter((bank) => bank.isInsibs);
  const bankName = insibsBanks.map((bank) => {
    return { label: bank.bankName, value: bank.id };
  });

  const bankLabels = ({ value, label }) => {
    const bank = insibsBanks.find((bank) => bank.id === value);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={`${process.env.PUBLIC_URL}/img/bancos/${bank.bankImg}`} alt={label} width='30px' />
        <span style={{ marginLeft: "10px", fontSize: ".95rem", color: "#888" }}>{label}</span>
      </div>
    );
  };

  // set select parameters for acc type (react select)
  const accountType = [
    { label: "Corriente", value: "corriente" },
    { label: "Ahorros", value: "ahorros" },
  ];

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={addAccountInit}>
      {({ errors, touched }) => (
        <Form className='account-form'>
          <legend>Agregar cuenta para pagar</legend>

          <CustomSelect
            label='Banco'
            name='bank_id'
            placeholder='Selecciona un banco...'
            options={bankName}
            formatLabel={bankLabels}
            onChange={(option, field, form) => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
              option ? form.setFieldValue("acc_number", option.value) : form.setFieldValue("acc_number", "");
            }}
          />

          <CustomSelect
            label='Tipo de cuenta'
            name='acc_type'
            placeholder='selecciona un tipo...'
            options={accountType}
            onChange={(option, field, form) => (option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, ""))}
          />

          <Input label='Número de cuenta' type='text' name='acc_number' maxLength='20' touched={touched.acc_number} error={errors.acc_number} />

          <button type='submit' className='button'>
            Agregar
          </button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    banks: state.Banks.banks,
  };
};

export default connect(mapStateToProps, { addAccountInit })(AccountForm);
