import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import Cleave from 'cleave.js/react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { setCcYears } from '../../../../../helpers/helpers';

const CardDetails = ({ setValue, errors, touched }) => {

  const [card, setCard] = useState({
    cvc: '', month: '', year: '', name: '', number: '', focus: ''
  });

  const onCardChange = e => {
    setValue(e.target.name, e.target.value);
    setCard({...card, [e.target.name]: e.target.value });
  }
  const onCardFocus = e => setCard({...card, focus: e.target.name })

  return (
    <>
      <Cards 
        cvc={card.cvc}
        expiry= {`${card.month}/${card.year}`}
        focus={card.focus}
        name={card.name}
        number={card.number}
        placeholders={{ name: 'NOMBRE EN TARJETA' }}
        locale={{ valid: 'válida hasta' }}
      />

      <div className="form-group">
        <label htmlFor="card-name">Nombre del tarjetahabiente:</label>
        <Field name="name" placeholder="Nombre en la tarjeta" onFocus={onCardFocus} onChange={onCardChange} className={`form-control ${touched.name && errors.name ? 'error' : ''}`} />
        <ErrorMessage name="name">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="card-num">Número en la tarjeta</label>
        <Cleave placeholder="**** **** **** ****" options={{ creditCard: true }} name="number"
          onChange={onCardChange} onFocus={onCardFocus} />
      </div>
      
      <div className="form-group">
        <label htmlFor="cedula">Cédula del tarjetahabiente</label>
        <Field 
          type="text" id="cedula" name="cedula" placeholder="Cédula del titular de la tarjeta"
          onChange={onCardChange} className={`form-control ${touched.cedula && errors.cedula ? 'error' : ''}`}
        />
        <ErrorMessage name="cedula">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>
      
      <div className="form-group credit-card-group">
        <div className="card-label">
          <label htmlFor="month">Fecha de expiración</label>
          <label htmlFor="cvc">CVC <span className="cvc-info">?</span></label>
        </div>

        <div className="row">

          <div className="col-6 card-date">
            <div className="form-group">
              <Field as="select" name="month" id="month" onChange={onCardChange}
              onFocus={onCardFocus} 
              >
                <option value="">mes</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Field>
              <Field as="select" name="year" aria-label="year"
                onFocus={onCardFocus} onChange={onCardChange}
              >
                <option value="">año</option>
                { setCcYears().map((year, i) => <option key={i} value={String(year).substring(2,4)}>{year}</option>) }
              </Field>
            </div>
            <ErrorMessage name="month">
              {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
            </ErrorMessage>
            <ErrorMessage name="year">
              {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
            </ErrorMessage>
          </div>

          <div className="col-6 card-cvc">
            <div className="form-group">      
              <Field type="text" id="cvc" name="cvc" maxLength="3" onFocus={onCardFocus}
                onChange={onCardChange} className={`form-control ${touched.cvc && errors.cvc ? 'error' : ''}`}
              />
            </div>
          </div>

          <div className="col-md-12">
            <ErrorMessage name="cvc">
              {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
            </ErrorMessage>
          </div>

        </div>

      </div>
    </>
  )
}

export default CardDetails;
