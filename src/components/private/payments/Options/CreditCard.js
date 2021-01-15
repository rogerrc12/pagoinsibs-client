import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { setCcYears } from "../../../../helpers/helpers";

import Input from "../../../UI/FormItems/Input";
import CardInput from "../../../UI/FormItems/CardInput";
import classes from "./Options.module.scss";

const CardDetails = ({ setValue, errors, touched, values }) => {
  const [card, setCard] = useState({
    cardCvc: "",
    cardMonth: "",
    cardYear: "",
    cardName: "",
    cardNumber: "",
    focus: "",
  });

  const onCardChange = (e) => {
    setValue(e.target.name, e.target.value);
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  const onCardFocus = (e) => setCard({ ...card, focus: e.target.name });

  return (
    <>
      <Cards
        cvc={card.cardCvc}
        expiry={`${card.cardMonth}/${card.cardYear}`}
        focus={card.focus}
        name={card.cardName}
        number={card.cardNumber}
        placeholders={{ name: "NOMBRE DEL TITULAR" }}
        locale={{ valid: "válida hasta" }}
      />

      <div className='col-md-6'>
        <Input
          type='text'
          label='Titular de la tarjeta'
          placeholder='John Doe'
          name='cardName'
          onFocus={onCardFocus}
          onChange={onCardChange}
          touched={touched.cardName}
          error={errors.cardName}
        />
      </div>
      <div className='col-md-6'>
        <Input
          type='text'
          label='Cédula'
          name='cardCedula'
          placeholder='Cédula del titular'
          onChange={onCardChange}
          touched={touched.cardCedula}
          error={errors.cardCedula}
        />
      </div>
      <div className='col-12'>
        <CardInput value={values.cardNumber} touched={touched.cardNumber} error={errors.cardNumber} onChange={onCardChange} onFocus={onCardFocus} />
      </div>
      <div className='col-sm-6'>
        <label style={{ marginTop: "5px" }}>Expiración</label>

        <div className={`row ${classes.ExpirationContainer}`}>
          <div className='col-6'>
            <Input type='select' groupClass={classes.InputGroup} name='cardMonth' onChange={onCardChange} onFocus={onCardFocus}>
              <option value=''>mes</option>
              <option value='01'>01</option>
              <option value='02'>02</option>
              <option value='03'>03</option>
              <option value='04'>04</option>
              <option value='05'>05</option>
              <option value='06'>06</option>
              <option value='07'>07</option>
              <option value='08'>08</option>
              <option value='09'>09</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </Input>
          </div>
          <div className='col-6'>
            <Input type='select' groupClass={classes.InputGroup} name='cardYear' onFocus={onCardFocus} onChange={onCardChange}>
              <option value=''>año</option>
              {setCcYears().map((year, i) => (
                <option key={i} value={String(year).substring(2, 4)}>
                  {year}
                </option>
              ))}
            </Input>
          </div>
        </div>
      </div>
      <div className='col-sm-6'>
        <div className='row'>
          <div className='col-12'>
            <Input
              label='CVC'
              name='cardCvc'
              className='col-6'
              maxLength='3'
              onFocus={onCardFocus}
              onChange={onCardChange}
              touched={touched.cardCvc}
              error={errors.cardCvc}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
