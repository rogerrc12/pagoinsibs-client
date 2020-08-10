import React from 'react';
import Slider from 'react-slick';

const settings = {
  infinite: false,
  arrows: false,
  dots: true,
  autoplay: false,
  speed: 1100,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const Timeline = () => {
  return (
    <Slider {...settings}>
      <div className="timeline-item">
        <div className="timeline-image">
          <img src="img/timeline/timeline-1.jpg" alt="Fundacion insibs"/>
        </div>
        <div className="timeline-inner">
          <span className="year">1995</span>
          <span className="subtitle">Inicio de INSIBS</span>
          <p>Obversando y experimentado el deficit de atención de muchas empresas en el area de cobranza, llevamos a cabo la idea de crear un sistema financiero con el proposito de simplificar la adquisición de productos y servicios.</p>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-image">
          <img src="img/timeline/timeline-2.jpg" alt="Convenio con bancos"/>
        </div>
        <div className="timeline-inner">
          <span className="year">2000</span>
          <span className="subtitle">Convenio con bancos</span>
          <p>Nuestra seriedad, responsabilidad y compromiso nos permitieron establecer estrechas relaciones con los mejores bancos del pais, quienes hoy respaldan nuestros servicios.</p>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-image">
          <img src="img/timeline/timeline-3.jpg" alt="Era digital"/>
        </div>
        <div className="timeline-inner">
          <span className="year">2018</span>
          <span className="subtitle">Era digital</span>
          <p>Gracias a la confianza de nuestros clientes decidimos integrar la experiencia con la tecnologia, para llevar a mas personas el mejor sistema de cobranza del pais.</p>
        </div>
      </div>
    </Slider>
  )
}

export default Timeline;
