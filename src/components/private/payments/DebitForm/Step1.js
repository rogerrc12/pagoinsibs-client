import React from "react";
import PropTypes from "prop-types";
import CustomSelect from "../../../UI/FormItems/CustomSelect";
// REDUX
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

const SupplierDetails = (props) => {
  const { getSuppliers, getProducts, getProductInfo, productInfo, suppliers, products, getSupplierProfile, nextPage, currencies, values } = props;

  // product type options
  const productTypes = [
    { label: "Un servicio", value: 1 },
    { label: "Un producto", value: 2 },
  ];
  const supplierOptions = suppliers.map((supplier) => ({ label: supplier.name, value: supplier.id }));
  const productOptions = products.map((product) => ({ label: product.name, value: product.id }));
  const currencyOptions = currencies.map((currency) => ({ label: currency.name, value: currency.id }));

  const { supplierId, supplierType, productId, currencyId } = values;

  const buttonValidation = !supplierId || !supplierType || !productId || !currencyId || (currencyId && productInfo.currencyId !== currencyId && !productInfo.currencyConversion);

  return (
    <div className='row'>
      <div className='col-12'>
        <CustomSelect
          label='¿Que pagarás?'
          name='supplierType'
          selectClassName='suppliers-select'
          placeholder='Selecciona una opción'
          options={productTypes}
          onChange={(option, field, form) => {
            option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
            getSuppliers(option ? option.value : null);
          }}
        />
      </div>

      <div className='col-12'>
        <CustomSelect
          label={"¿A que empresa enviarás el pago?"}
          name='supplierId'
          selectClassName='suppliers-select'
          placeholder='Busca la empresa...'
          options={supplierOptions}
          onChange={(option, field, form) => {
            option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
            getSupplierProfile(option ? option.value : null);
            getProducts(option ? option.value : null);
          }}
        />
      </div>

      <div className='col-12'>
        <CustomSelect
          label='Producto a pagar'
          name='productId'
          selectClassName='suppliers-select'
          placeholder='Busca el producto...'
          options={productOptions}
          onChange={(option, field, form) => {
            option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
            getProductInfo(option ? option.value : null);
          }}
        />
      </div>

      <div className='col-12'>
        <CustomSelect
          label='Moneda de pago'
          name='currencyId'
          selectClassName='suppliers-select'
          placeholder='Selecciona la moneda...'
          options={currencyOptions}
          onChange={(option, field, form) => {
            option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
            props.values.paymentType && form.setFieldValue("paymentType", "");
          }}
        />
      </div>

      <div className='col-12'>
        <span className='form-error'>
          {productInfo.currency
            ? currencyId &&
              productInfo.currencyId !== currencyId &&
              !productInfo.currencyConversion &&
              `Lo sentimos, este producto solo puede ser pagado en ${productInfo.currency.name}.`
            : null}
        </span>
      </div>
      <div className='col-md-6 mx-auto mt-4'>
        <button type='button' className='continue-btn button' onClick={nextPage} disabled={buttonValidation}>
          continuar
        </button>
      </div>
    </div>
  );
};

SupplierDetails.propTypes = {
  suppliers: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  productInfo: state.Suppliers.productInfo,
  suppliers: state.Suppliers.suppliers,
  products: state.Suppliers.debitProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getSuppliers: (typeId) => dispatch(actions.getSuppliersInit(typeId)),
  getSupplierProfile: (supplierId) => dispatch(actions.getSupplierInfoInit(supplierId)),
  getProducts: (supplierId) => dispatch(actions.getProductsInit(supplierId)),
  getProductInfo: (productId) => dispatch(actions.getProductInfoInit(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SupplierDetails));
