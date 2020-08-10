import React, { useLayoutEffect } from 'react';
import Fade from 'react-reveal/Fade';
// REDUX
import { connect } from 'react-redux';
import { getBanks } from '../../../../actions/banks';

const Banks = ({ banks, getBanks }) => {
  useLayoutEffect(() => {
    getBanks()
  }, [getBanks])
  
  const banksList = () => banks.filter(bank => bank.isInsibs).map((bank, i) => (
    <div className="col-md-3 col-6 bank-info" key={bank.id}>
      <Fade big delay={100 * i}>
        <img src={`${process.env.PUBLIC_URL}/img/bancos/${bank.bankImg}`} alt={bank.bankName}/>
        <h5>{bank.bankName}</h5>
      </Fade>
    </div>
  ));

  return (
    <section className="working-banks main-content">
      <div className="container">
        <h2>Ellos nos respaldan</h2>
        <p>Tenemos la seguridad y el respaldo de los mejores bancos de pais</p>
        <div className="row mt-4">
          {banksList()}
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    banks: state.banks.banks
  }
}

export default connect(mapStateToProps, { getBanks })(Banks);
