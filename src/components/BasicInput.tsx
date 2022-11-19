function BasicInput({ name, additionalProps, value, setValue, validation, validate }: any) {
  const inputClasses = `form-control ${validation.error && 'is-invalid'}`;

  return (
    <div className="mb-3">
      <label className="form-label">{additionalProps.label}</label>
      <input type="text" className={inputClasses} name={name} placeholder={additionalProps.placeholder} value={value} onChange={e => setValue(e.target.value)} />
      <div className="invalid-feedback">
        {validation.message || 'undefined'}
      </div>
    </div>
  )}
  
export default BasicInput
