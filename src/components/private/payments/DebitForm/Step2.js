import React, { useEffect, useState } from "react";
import { setPaymentFrequency, setCurrency } from "../../../../helpers/helpers";
import { formatAmount } from "../../../../helpers/helpers";
import { ErrorMessage } from "formik";
// REDUX
import { connect } from "react-redux";
import { showModal, getAccountInfoInit } from "../../../../store/actions";

import AccountForm from "../../AccountForm";
import Modal from "../../../layout/Modal";
import Input from "../../../UI/FormItems/Input";
import CustomSelect from "../../../UI/FormItems/CustomSelect";
import Radio from "../../../UI/FormItems/Radio";
import NumberInput from "../../../UI/FormItems/NumberInput";
import DatePicker from "../../../UI/FormItems/DatePicker";
import Account from "../Options/Account";
import WrapperButtons from "../../../UI/FormItems/WrapperButtons";

const PaymentDetails = (props) => {
  const { setFieldValue, values, currencies, productInfo, errors, touched, prevPage, nextPage, accounts } = props;
  const { interestRate, amount, maxDebitMonths } = productInfo;
  const totalProductAmount = Number(amount) * (Number(interestRate) + 1);
  const [feeAmountInput, setFeeAmountInput] = useState(0);
  const [productAmount, setProductAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(false);

  const { currencyId } = values;

  // set minimum amount based on product amount (check SupplierDetails select for product)
  useEffect(() => {
    setFieldValue("totalAmount", totalProductAmount);
    if (currencyId === 1) setFieldValue("paymentType", "account");
  }, [totalProductAmount, setFieldValue, currencyId]);

  console.log(totalProductAmount);

  const paymentFrequencyOptions = setPaymentFrequency(values.paymentPeriod, maxDebitMonths);
  const currencyDetails = currencies.find((currency) => currency.id === values.currencyId);
  const dollarsCurrency = currencies.find((currency) => currency.id === 2);

  useEffect(() => {
    if (productInfo && productInfo.amount > 0) {
      const productCurrency = productInfo.currency.id;
      let newAmount = totalProductAmount;

      if (values.currencyId !== productCurrency) {
        newAmount = productCurrency === 1 ? totalProductAmount / +dollarsCurrency.sellPrice : totalProductAmount * +dollarsCurrency.buyPrice;
        setConversionRate(true);
      }
      setProductAmount(newAmount);
      setFieldValue("totalAmount", productAmount);
    } else {
      setFieldValue("totalAmount", totalProductAmount);
    }
    // eslint-disable-next-line
  }, [currencies, productAmount, productInfo, setFieldValue]);

  const onFrequencyChange = (option, field) => {
    if (option) {
      setFieldValue(field.name, option.value);
      const feeAmount = productAmount ? (productAmount * 100) / (option.value * 100) : (totalProductAmount * 100) / (option.value * 100);

      setFieldValue("feeAmount", feeAmount);
      setFeeAmountInput(setCurrency(feeAmount));
    } else {
      setFieldValue(field.name, "");
      setFieldValue("feeAmount", 0);
      setFeeAmountInput(0);
    }
  };

  const accountOptions = accounts.map((account) => ({
    label: `${account.bank.bankName.substring(0, 18)} - termina en ${account.accNumber.substring(15, 20)}`,
    value: Number(account.id),
  }));

  const consecutiveDebitHandler = () => {
    setFieldValue("paymentPeriod", "mensual");
    setFieldValue("feeAmount", 0);
  };

  let buttonValidation = !values.description || !values.paymentPeriod || !values.debitType || !values.paymentType || !values.startPaymentDate;

  if (values.paymentType === "account")
    buttonValidation = !values.description || !values.debitType || !values.paymentPeriod || !values.paymentType || !values.startPaymentDate || !values.accountId;

  const date = new Date();

  return (
    <div className='row'>
      <div className='col-12'>
        <Input label='Concepto de pago' name='description' type='text' touched={touched.description} error={errors.description} />
      </div>

      <div className='col-sm-6 col-10'>
        <NumberInput
          label='Monto a pagar'
          name='totalAmount'
          value={values.totalAmount}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
            delimiter: ".",
            numeralPositiveOnly: true,
            stripLeadingZeroes: true,
          }}
          disabled
          currency={currencyDetails.symbol}
        />
        {conversionRate && (
          <p style={{ textAlign: "left", fontSize: ".8rem" }}>
            Tasa de conversión actual: Bs. {productInfo.currency.id === 1 ? formatAmount(dollarsCurrency.sellPrice) : formatAmount(dollarsCurrency.buyPrice)}
          </p>
        )}
      </div>
      {conversionRate && <span className='form-error'>El monto de tus cuotas pendientes se actualizará según cambio de tasa en el banco central.</span>}

      <div className='col-12'>
        <div className='form-group mt-2'>
          <label>¿Comó serán tus pagos?</label>
        </div>

        <div className='form-group mt-1 form-check-group'>
          <Radio
            label='Debitos consecutivos'
            id='debitType1'
            name='debitType'
            touched={touched.debitType}
            error={errors.debitType}
            value='recurrente'
            onClick={consecutiveDebitHandler}
          />

          <Radio label='Fraccionado en cuotas' id='debitType2' name='debitType' touched={touched.debitType} error={errors.debitType} value='fraccionado' />
        </div>
        <ErrorMessage name='debitType'>
          {(message) => (
            <span className='form-error'>
              <i className='fas fa-warning' /> {message}
            </span>
          )}
        </ErrorMessage>
      </div>

      <div className='col-md-6'>
        <Input
          type='select'
          name='paymentPeriod'
          touched={touched.paymentPeriod}
          error={errors.paymentPeriod}
          label='Períodos de pago'
          disabled={values.debitType === "recurrente"}
        >
          <option value=''>selecciona un período</option>
          <option value='semanal'>Semanales</option>
          <option value='quincenal'>Quincenales</option>
          <option value='mensual'>Mensuales</option>
        </Input>
      </div>

      {values.debitType === "fraccionado" && (
        <>
          <div className='col-md-6'>
            <CustomSelect
              name='paymentFrequency'
              options={paymentFrequencyOptions}
              onChange={(option, field, form) => onFrequencyChange(option, field, form)}
              placeholder='selecciona un tiempo'
              selectClassName='suppliers-select'
              touched={touched.paymentFrequency}
              error={errors.paymentFrequency}
              label='Tiempo de pago'
            />
          </div>

          <div className='col-md-6'>
            <Input label='Monto por cuota' name='feeAmount' value={feeAmountInput} disabled />
          </div>
        </>
      )}

      <div className='col-md-6'>
        <DatePicker
          disableToolbar
          variant='inline'
          name='startPaymentDate'
          label='Fecha de inicio de cobro'
          format='dddd, D [de] MMMM'
          value={values.startPaymentDate}
          minDate={new Date()}
          maxDate={new Date(date.setMonth(date.getMonth() + 1))}
        />
      </div>

      {values.debitType === "recurrente" && (
        <p className='form-msg'>
          <span className='fas fa-info-circle' /> Los pagos consecutivos son debitos constantes usados en servicios que serán debitados de su cuenta de forma indefinida
          mensualmente. Solo pueden ser cancelados previa autorización del cliente.
        </p>
      )}

      {values.currencyId === 2 && (
        <div className='col-12'>
          <Input
            onChange={(e) => {
              setFieldValue("accountId", "");
              setFieldValue("paymentType", e.target.value);
            }}
            label='Forma de pago'
            type='select'
            name='paymentType'
          >
            <option value=''>Selecciona una opción</option>
            <option value='zelle'>Zelle</option>
            <option value='paypal'>Paypal</option>
          </Input>
        </div>
      )}

      {values.currencyId === 1 && (
        <div className='col-12'>
          <Account
            accounts={accounts}
            touched={props.touched.acconutId}
            error={props.errors.acconutId}
            accountId={values.accountId}
            addAccount={props.showModal}
            options={accountOptions}
            onChange={(option, field, form) => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
              props.getAccountInfoInit(option ? option.value : null);
            }}
          />
        </div>
      )}

      <WrapperButtons type='button' disabled={buttonValidation} prevPage={prevPage} nextPage={nextPage} />

      <Modal>
        <AccountForm />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.Accounts.accounts,
    productInfo: state.Suppliers.productInfo,
  };
};

export default connect(mapStateToProps, { showModal, getAccountInfoInit })(React.memo(PaymentDetails));
