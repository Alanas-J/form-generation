import React from 'react';
import { useEffect, useRef } from 'react';
import { FormElementProps } from '../../library/form-generation/types';

function FileInput({ componentProps, value, setValue, validation }: FormElementProps){
  validation = validation === undefined ? {error: false} : validation;
  const inputClasses = `form-control ${validation?.error && 'is-invalid'}`;

  // TODO: swap from any.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>({});
  useEffect(() => {
    if(fileInput) fileInput.current.files = value;
  });

  return (
    <div className="mb-3 mx-3">
      <label className="form-label">{componentProps?.label}</label>
      <input ref={fileInput} className={inputClasses} type="file" onChange={ e => {setValue(e.target.files); console.log(e.target);}}/>
      <div className="invalid-feedback">
        {validation?.message || 'undefined'}
      </div>
    </div>
  );
}
export default FileInput;
