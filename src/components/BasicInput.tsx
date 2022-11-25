function BasicInput({ field, componentProps, value, setValue, validation, validate }: any) {
  value = value === undefined ? '' : value;
  validation = validation === undefined ? {} : validation;

  const inputClasses = `form-control ${validation.error && 'is-invalid'}`;

  return (
    <div className="mb-3 mx-3">
      <label className="form-label">{componentProps.label}</label>
      <input type="text" className={inputClasses} name={componentProps.name} placeholder={componentProps.placeholder} value={value} onChange={e => setValue(e.target.value)} onBlur={() => validate()}/>
      <div className="invalid-feedback">
        {validation?.message || 'undefined'}
      </div>
    </div>
  )}
  
export default BasicInput
