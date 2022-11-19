function BasicInput({ name, additionalProps, value, setValue }: any) {
    return (
      <div className="mb-3">
        <label className="form-label">{additionalProps.label}</label>
        <input type="text" className="form-control" name={name} placeholder={additionalProps.placeholder} value={value} onChange={e => setValue(e.target.value)} />
      </div>
    )
  }
  
export default BasicInput
