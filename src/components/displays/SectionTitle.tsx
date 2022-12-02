import React from 'react';
import { FormElementProps } from '../../library/form-generation/types';

function SectionTitle({ componentProps }: FormElementProps) {
  const text = componentProps?.text;

  return (
    <h1>
      {text}
    </h1>
  );}
    
export default SectionTitle;
  