import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field } from 'formik';
import Select from 'react-select';
// REDUX
import { connect } from 'react-redux';
import { getSuppliers, getSupplierProfile } from '../../../../../actions/suppliers';


const SupplierDetails = ({ getSuppliers, suppliers, getSupplierProfile }) => {
  
  // product type options
  const productTypes = [ {label: 'Un servicio', value: 1}, {label: 'Un producto', value: 2} ];
  const supplierOptions = suppliers.map(supplier => { return { label: supplier.name, value: supplier.id } });

  return (
    <>
      <div className="form-group">
        <label>¿Que pagarás?</label>
        <Field name="supplier_type" component={({ field, form }) => 
          <Select
            className="suppliers-select"
            placeholder="Selecciona una opción"
            isClearable={true}
            options={productTypes}
            value={productTypes.find(type => type.value === field.value) || ''}
            onChange={option => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '')
              getSuppliers(option ? option.value : null);
            }}
          />
        }/>
        <ErrorMessage name="supplier_type">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="supplier_id">Nombre de la empresa:</label>
        <Field name="supplier_id" component={({ field, form }) => 
          <Select
            className="suppliers-select"
            placeholder="Busca la empresa..."
            noOptionsMessage={() => "No hay empresas para mostrar"}
            isClearable={true}
            options={supplierOptions}
            value={supplierOptions.find(type => type.value === field.value) || ''}
            onChange={option => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '')
              getSupplierProfile(option ? option.value : null)
            }}
          />
        }/>
        <ErrorMessage name="supplier_id">
          {message => <span className="form-error"><i className="fas fa-warning"></i> {message}</span>}
        </ErrorMessage>
      </div>
    </>
  )
}

SupplierDetails.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  suppliers: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    suppliers: state.suppliers.suppliers
  }
}

export default connect(mapStateToProps, { getSupplierProfile, getSuppliers })(SupplierDetails);