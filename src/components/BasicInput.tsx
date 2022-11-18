function BasicInput({ name, value, setValue }: any) {
    return (
      <input type="text" name={name} placeholder={name} value={value} onChange={e => setValue(e.target.value)} />
    )
  }
  
export default BasicInput
