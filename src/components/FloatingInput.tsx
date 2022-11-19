function FloatingInput({ name, value, setValue }: any) {
    return (
      <div className="form-floating mb-3">
        <input type="text" className="form-control" name={name} placeholder={name} value={value} onChange={e => setValue(e.target.value)} />
        <label>{name}</label>
      </div>
    )
  }
  
export default FloatingInput
