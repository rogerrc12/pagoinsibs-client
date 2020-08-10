import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field } from 'formik';
import Select from 'react-select';
// REDUX
import { connect } from 'react-redux';
import { getSuppliers, getProducts, getSupplierProfile, getProductInfo } from '../../../../../actions/suppliers';

const SupplierDetails = ({ suppliers, products, getSupplierProfile, getSuppliers, getProducts, getProductInfo }) => {

  // product type options
  const productTypes = [ {label: 'Un servicio', value: 1}, {label: 'Un producto', value: 2} ];
  // supplier options base on interest rate
  const supplierOptions = suppliers.map(supplier => { return { label: supplier.name, value: supplier.id } });
  // supplier options
  const productOptions = products.map(product => { return { label: product.name, value: product.id } })

  return (
    <>
      <div className="form-group">
        <label htmlFor="supplier_type">¿Que pagarás?</label>
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
            isClearable={true}
            options={supplierOptions}
            noOptionsMessage={() => "No hay empresas para mostrar"}
            value={supplierOptions.find(type => type.value === field.value) || ''}
            onChange={option => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '');
              getSupplierProfile(option ? option.value : null);
              getProducts(option ? option.value : null);
            }}
          />
        }/>
        <ErrorMessage name="supplier_id">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>
        
      <div className="form-group">
        <label htmlFor="product_id">¿Que producto pagarás?</label>
        <Field name="product_id" component={({ field, form }) => 
          <Select 
            className="suppliers-select"
            placeholder="Selecciona un producto"
            isClearable={true}
            options={productOptions}
            noOptionsMessage={() => "No hay productos para mostrar"}
            value={productOptions.find(product => product.value === field.value)}
            onChange={option => {
              option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '');
              getProductInfo(option ? option.value : null)
            }}
          />
        }/>
        <ErrorMessage name="product_id">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>
    </>
  )
}

SupplierDetails.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getSupplierProfile: PropTypes.func.isRequired,
  suppliers: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    suppliers: state.suppliers.suppliers,
    products: state.suppliers.products    
  }
}

export default connect(mapStateToProps, { getSuppliers, getProducts, getSupplierProfile, getProductInfo })(React.memo(SupplierDetails));
