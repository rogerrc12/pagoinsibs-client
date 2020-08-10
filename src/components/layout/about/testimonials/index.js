import React from 'react';

const Testimonials = () => {
  return (
    <article className="testimonials content">
      <div className="container text-center">
        <h2>Confianza en nuestros usuarios</h2>
        <p>Nos encanta brindarles el mejor servicio a nuestros usuario, y ellos lo agradecen.</p>
        <div className="row">
          <div className="col-md-4 testimonial">
            <img src="img/testimonials/testimonial-1.jpg" alt="" />
            <blockquote>
              <p>&ldquo; Me encanta la facilidad para ahcer los pagos que ofrecen. Además que la plataforma es súper intuitiva &rdquo;</p>
              <footer><b>Lorena Gutierrez</b></footer>
            </blockquote>
          </div>
          <div className="col-md-4 testimonial">
            <img src="img/testimonials/testimonial-2.jpg" alt="" />
            <blockquote>
              <p>&ldquo; Que puedas hacer tus pagos desde tu celular sin necesidad de ir al banco o esperar por los puntos de venta no tiene precio. &rdquo;</p>
              <footer><b>Carlos Jiménez</b></footer>
            </blockquote>
          </div>
          <div className="col-md-4 testimonial">
            <img src="img/testimonials/testimonial-3.jpg" alt="" />
            <blockquote>
              <p>&ldquo; Los tiempos de respuesta son super rápidos, no he tenido problemas desde que la uso &rdquo;</p>
              <footer><b>Alejandra Vieira</b></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Testimonials;
