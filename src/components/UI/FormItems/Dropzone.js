import React, { useCallback } from "react";
import { ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";

const Dropzone = (props) => {
  const { value, setValue, name } = props;

  const onDrop = useCallback(
    (acceptedFile) => {
      setValue(name, acceptedFile[0]);
    },
    [name, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: "image/jpeg, image/png" });

  return (
    <div className='form-group'>
      {props.label ? <label>{props.label}</label> : null}
      <div {...getRootProps()} className='dropzone-container'>
        <input {...getInputProps()} />
        {isDragActive ? <p>Suelta el archivo aqui...</p> : <p>{value ? value.name : "Arrastra y suelta el archivo o haz click y seleccionalo. Solo JPG/PNG"}</p>}
      </div>
      <ErrorMessage name={name}>
        {(message) => (
          <span className='form-error'>
            <i className='fas fa-warning' /> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default React.memo(Dropzone);
