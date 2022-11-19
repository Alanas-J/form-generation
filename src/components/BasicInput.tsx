function BasicInput({ name, label, placeholder, value, setValue }: any) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input type="text" className="form-control" name={name} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
      </div>
    )
  }
  
export default BasicInput
