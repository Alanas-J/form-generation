import React from 'react';
import { FormElementProps } from '../../library/form-generation/types';

function BasicInput({ componentProps, value, setValue, validation, validate }: FormElementProps) {
  value = value === undefined ? '' : value;
  validation = validation === undefined ? {error: false} : validation;

  const inputClasses = `form-control ${validation?.error && 'is-invalid'}`;

  return (
    <div className="mb-3 mx-3">
      <label className="form-label">{componentProps?.label}</label>
      <input type="text" className={inputClasses} name={componentProps?.name} placeholder={componentProps?.placeholder} value={`${value}`} onChange={e => setValue(e.target.value)} onBlur={() => validate()}/>
      <div className="invalid-feedback">
        {validation?.message || 'undefined'}
      </div>
    </div>
  );}
  
export default BasicInput;
