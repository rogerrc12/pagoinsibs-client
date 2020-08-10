import React from 'react';
import { Link } from 'react-router-dom';
import Map from './map';

const Contact = () => {
  
  return (
    <main className="main-section">
      <article className="main-contact main-content">
        <div className="container">
          <h1>Estamos para ayudarte</h1>
          <p>Contatamos con un servicio de asistencia y asesoría las 24 horas del dia solo para ti.</p>
          <div className="row">
            <div className="col-md-4 my-mb-0 my-2">
              <div className="card card-body card-number">
                <h4>Llámanos</h4>
                <span className="phone">+58 0500 467 4270</span>
              </div>
            </div>
            <div className="col-md-4 my-mb-0 my-2">
              <div className="card card-body card-number">
                <h4>Ayuda</h4>
                <p>Puedes visitar nuestra sección de <Link to="/ayuda">preguntas frecuentes</Link> para mejor ayuda</p>
              </div>
            </div>
            <div className="col-md-4 my-mb-0 my-2">
              <div className="card card-body card-number">
                <h4>Chat online</h4>
                <p>Utiliza nuestro servicio de chat online disponible <b>24/7</b></p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="contact-map">
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="map-container">
              <Map 
                googleMapURL={'https://maps.googleapis.com/maps/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBwc9FaDyZwSjBw3-RBwZNM8ogz6B5CR6A'}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div className="map-inner" />}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-info">
              <h2>Puedes visitarnos</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa fuga quia laborum, quos quod non debitis.</p>
              <address>
              <i className="fas fa-map-marked-alt mr-2"></i><b>Torre Clement, Sótano 1, Nivel Jardin, Av. Venezuela, Urb. el Rosal.</b>
                <br/>
                <b>Caracas, Venezuela.</b>
                <br/>
                <br/>
              </address>
              <address>
                <i className="fas fa-map-marked-alt mr-2"></i><b>CE. Europa, Nivel 1, Oficina 105, Urb. La Floresta, Av. Las Delicias.</b>
                <br/>
                <b>Maracay, Aragua, Venezuela.</b>
                <br/>
                <br/>
              </address>
              <div className="contact-info__container">
                <span className="phone"><i className="fas fa-phone mr-2"></i> +58 0500 467 4270</span>
                <span className="chat"><i className="fas fa-headset mr-2"></i> Asistencia virtual</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </article>
    </main>
  )
}

export default Contact;
