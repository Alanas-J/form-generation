import React from 'react';
import { FormElementProps } from '../../library/form-generation/types';

function Radio({field, value, setValue, componentProps}: FormElementProps) {  
  return (
    <div className="my-3">
      <label className="form-label">{componentProps?.label}</label>

      {componentProps?.options.map((option: string, index: number) => {
        return (
          <div key={index} className="form-check">
            <input className="form-check-input" type="radio" name={field} value={option} checked={value === option} onChange={e => setValue(e.target.value)}/>
            <label className="form-check-label">
              {option}
            </label>
          </div>
        );
      })}
            
    </div>
  );
}    
    
export default Radio;
