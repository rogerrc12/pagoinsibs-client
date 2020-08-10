import React, { useEffect, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { setPaymentFrequency, setCurrency } from "../../../../../helpers/helpers";
// REDUX
import { connect } from "react-redux";

const PaymentDetails = ({ setValue, values, productInfo, errors, touched }) => {
  
  const { interestRate, amount: productAmount, maxDebitMonths } = productInfo;
  const totalProductAmount = Number(productAmount) * (Number(interestRate) + 1); 
  
  // set minimum amount based on product amount (check SupplierDetails select for product)
  useEffect(() => {
    setValue('total_amount', totalProductAmount);
  }, [totalProductAmount, setValue]);

  const paymentFrequencyOptions = setPaymentFrequency( values.payment_period, maxDebitMonths );

  // declare feeAmount based on selections
  const feeInput = useRef();
  
  const onFrequencyChange = (option, field, form) => {
    if (option) {
      form.setFieldValue(field.name, option.value);
      const feeAmount = Math.ceil(totalProductAmount / option.value);
      
      form.setFieldValue('fee_amount', feeAmount);
      feeInput.current.value = setCurrency(feeAmount);
    } else {
      form.setFieldValue(field.name, "");
      form.setFieldValue('fee_amount', 0);
      feeInput.current.value = 0;
    }
  }

  return (
    <>
      <div className='form-group'>
        <label htmlFor='description'>Concepto de pago:</label>
        <Field id='description' name='description' type='text' className={`form-control ${touched.description && errors.description ? 'error' : ''}`} />
        <ErrorMessage name='description'>
          {message => (
            <span className='form-error'>
              <i className='fas fa-warning'/> {message}
            </span>
          )}
        </ErrorMessage>
      </div>

      <div className='form-group amount-group'>
        <label htmlFor='total_amount'>
          Monto del {values.supplier_type === 1 ? "servicio" : "producto"}:
        </label>
        <div className='input-group'>
          <input type="text" readOnly={true} name="total_amount" value={setCurrency(values.total_amount)} />
          <div className='input-group-append'>
            <span className='input-group-text'>Bs.</span>
          </div>
        </div>
      </div>

      <div className='form-group mt-4'>
        <label>¿Comó serán tus pagos?</label>
      </div>

      <div className='form-group mt-1 form-check-group'>
        <div className='form-check'>
          <Field
            type='radio'
            id='debit_type1'
            name='debit_type'
            className={`form-check-input ${touched.debit_type && errors.debit_type ? 'error' : ''}`}
            value='recurrente'
            onClick={() => setValue('fee_amount', 0)}
          />
          <label className='form-check-label' htmlFor='debit_type1'>
            Debitos consecutivos
          </label>
        </div>

        <div className='form-check'>
          <Field
            type='radio'
            id='debit_type2'
            name='debit_type'
            className={`form-check-input ${touched.debit_type && errors.debit_type ? 'error' : ''}`}
            value='fraccionado'
          />
          <label className='form-check-label' htmlFor='debit_type2'>
            Fraccionado en cuotas
          </label>
        </div>
      </div>
      <ErrorMessage name='debit_type'>
        {message => (
          <span className='form-error'>
            <i className='fas fa-warning'/> {message}
          </span>
        )}
      </ErrorMessage>

      {values.debit_type === "fraccionado" && (
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='payment_period'>Períodos de pago:</label>
              <Field as='select' name='payment_period' id='payment_period' className={`form-control ${touched.payment_period && errors.payment_period ? 'error' : ''}`}>
                <option value=''>selecciona un período</option>
                <option value='semanal'>Semanales</option>
                <option value='quincenal'>Quincenales</option>
                <option value='mensual'>Mensuales</option>
              </Field>

              <ErrorMessage name='payment_period'>
                {message => (
                  <span className='form-error'>
                    <i className='fas fa-warning'/> {message}
                  </span>
                )}
              </ErrorMessage>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='payment_frequency'>Tiempo de pago:</label>
              <Field
                name='payment_frequency'
                id='payment_frequency'
                component={({ field, form }) => (
                  <Select
                    className='suppliers-select'
                    placeholder='selecciona'
                    isClearable={true}
                    options={paymentFrequencyOptions}
                    value={
                      paymentFrequencyOptions.find(frequency => frequency.value === field.value) || ""
                    }
                    onChange={option => onFrequencyChange(option, field, form)}
                  />
                )}
              />
              <ErrorMessage name='payment_frequency'>
                {message => (
                  <span className='form-error'>
                    <i className='fas fa-warning'/> {message}
                  </span>
                )}
              </ErrorMessage>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='fee_amount'>Monto por cuota</label>
              <div className='input-group'>
                <input
                  type='text'
                  name='fee_amount'
                  id='fee_amount'
                  ref={feeInput}
                  style={{ width: "79%" }}
                  disabled
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>Bs.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {values.debit_type === "recurrente" && (
        <p className='form-msg'>
          <span className='fas fa-info-circle'/> Los pagos consecutivos
          son debitos constantes usados en servicios que serán
          debitados de su cuenta de forma indefinida. Solo pueden ser cancelados
          previa autorización del cliente.
        </p>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    productInfo: state.suppliers.productInfo
  };
};

export default connect(mapStateToProps)(React.memo(PaymentDetails));
