import React from "react";
import { BiReceipt } from "react-icons/bi";
import { RiStore3Fill } from "react-icons/ri";

import CardContainer from "../../components/UI/CardContainer";
import CustomButton from "../../components/UI/CustomButton";

const PaymentOptions = () => {
  return (
    <section className='main-pago__section'>
      <img src='../img/main-logo.png' className='main-user__dash__logo' alt='logo Pago Insibs' />
      <h1 className='main-pago__section__title'>¿Como pagarás?</h1>
      <p>Selecciona tu médoto de pago</p>

      <CardContainer>
        <div className='d-flex flex-column'>
          <CustomButton icon={BiReceipt} link='/payments/product'>
            Pagar un producto
          </CustomButton>
          <CustomButton icon={RiStore3Fill} link='/payments/company'>
            Pagar a una empresa
          </CustomButton>
        </div>
      </CardContainer>
    </section>
  );
};

export default PaymentOptions;
