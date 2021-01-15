import React, { useEffect, useState } from "react";
import { formatAmount } from "../../../../helpers/helpers";

import AccountForm from "../../AccountForm";
import Modal from "../../../layout/Modal";
import Input from "../../../UI/FormItems/Input";
import NumberInput from "../../../UI/FormItems/NumberInput";
import Account from "../Options/Account";
import CreditCard from "../Options/CreditCard";
import Paypal from "../Options/Paypal";
import Zelle from "../Options/Zelle";

import WrapperButtons from "../../../UI/FormItems/WrapperButtons";
// REDUX
import { connect } from "react-redux";
import { showModal } from "../../../../store/actions/modal";
import { getAccountInfoInit } from "../../../../store/actions";

const UserDetails = (props) => {
  const { getAccountInfoInit, productInfo, accounts, showModal, prevPage, nextPage, setFieldValue, currencies, values } = props;
  const { accountId, description, amount, paymentType, productId } = values;
  const [productAmount, setProductAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);

  const currencyDetails = currencies.find((currency) => currency.id === values.currencyId);

  useEffect(() => {
    if (productInfo && productInfo.amount > 0) {
      const productCurrency = productInfo.currency.id;
      let newAmount = +productInfo.amount;

      if (values.currencyId !== productCurrency) {
        newAmount = productCurrency === 1 ? +productInfo.amount / +currencyDetails.sellPrice : +productInfo.amount * +currencyDetails.buyPrice;
        setConversionRate(`Tasa de conversión: ${productCurrency === 1 ? formatAmount(currencyDetails.sellPrice) : formatAmount(currencyDetails.buyPrice)}`);
      }
      setProductAmount(newAmount);
      setFieldValue("amount", productAmount);
    } else {
      setFieldValue("amount", 0);
    }
    // eslint-disable-next-line
  }, [currencies, productAmount, productInfo, setFieldValue]);

  const accountsList = accounts.filter((account) => account.toSend);

  const accountOptions = accountsList.map((account) => ({
    label: `${account.bank.bankName.substring(0, 18)} - termina en ${account.accNumber.substring(15, 20)}`,
    value: Number(account.id),
  }));

  const onAmountChange = (value, field, form) => form.setFieldValue(field.name, +value);

  let buttonValidation = true;

  if (paymentType === "account") buttonValidation = !accountId;
  else if (paymentType === "card") buttonValidation = !values.cardName || !values.cardCedula || !values.cardNumber || !values.cardMonth || !values.cardYear || !values.cardCvc;
  else if (paymentType === "zelle") buttonValidation = !values.zelleEmail;
  else if (paymentType === "paypal") buttonValidation = !values.paypalEmail;

  const resetDollarValues = () => {
    setFieldValue("zelleEmail", "");
    setFieldValue("paypalEmail", "");
  };

  const resetBsValues = () => {
    setFieldValue("accountId", "");
    setFieldValue("cardName", "");
    setFieldValue("cardCedula", "");
    setFieldValue("cardNumber", "");
    setFieldValue("cardMonth", "");
    setFieldValue("cardYear", "");
    setFieldValue("cardCvc", "");
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <Input label='Concepto de pago' name='description' type='text' touched={props.touched.description} error={props.errors.description} />
      </div>
      <div className='col-sm-6'>
        <NumberInput
          label='Monto a pagar'
          name='amount'
          value={props.paymentForm === "product" && productAmount ? productAmount : 0}
          options={{
            numeral: true,
            numeralPositiveOnly: true,
            stripLeadingZeroes: true,
          }}
          disabled={productId}
          onChange={onAmountChange}
          currency={currencyDetails.symbol}
        />
        {conversionRate && <p style={{ textAlign: "left", fontSize: ".8rem" }}>{conversionRate}</p>}
      </div>

      <div className='col-12'>
        <Input
          onChange={(e) => {
            values.currencyId === 2 ? resetDollarValues() : resetBsValues();
            setFieldValue("paymentType", e.target.value);
          }}
          label='Forma de pago'
          type='select'
          name='paymentType'
        >
          <option value=''>Selecciona una opción</option>
          {values.currencyId === 1 ? (
            <>
              <option value='account'>Débito en cuenta</option>
              <option value='card'>Tarjeta de crédito</option>
            </>
          ) : (
            <>
              <option value='zelle'>Zelle</option>
              <option value='paypal'>Paypal</option>
            </>
          )}
        </Input>
      </div>

      {!paymentType ? null : paymentType === "account" ? (
        <div className='col-12'>
          <Account
            accounts={accounts}
            touched={props.touched.accountId}
            error={props.errors.accountId}
            accountId={accountId}
            addAccount={showModal}
            options={accountOptions}
            onChange={(option, field, form) => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
              getAccountInfoInit(option ? option.value : null);
            }}
          />
        </div>
      ) : (
        <PaymentOption type={paymentType} values={values} setFieldValue={setFieldValue} errors={props.errors} touched={props.touched} />
      )}

      <WrapperButtons type='button' disabled={!description || !amount || buttonValidation} prevPage={prevPage} nextPage={nextPage} />

      <Modal>
        <AccountForm />
      </Modal>
    </div>
  );
};

const PaymentOption = (props) => {
  let option = null;

  if (props.type === "card") {
    option = <CreditCard setValue={props.setFieldValue} values={props.values} errors={props.errors} touched={props.touched} />;
  } else if (props.type === "paypal") {
    option = <Paypal />;
  } else if (props.type === "zelle") {
    option = <Zelle />;
  }

  return option;
};

const mapStateToProps = (state) => {
  return {
    accounts: state.Accounts.accounts,
    productInfo: state.Suppliers.productInfo,
  };
};

export default connect(mapStateToProps, { getAccountInfoInit, showModal })(React.memo(UserDetails));
