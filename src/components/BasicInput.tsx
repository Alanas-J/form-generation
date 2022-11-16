import { useState } from "react"

function BasicInput({ name }: any) {
    const [value, setValue] = useState('');

    console.log(name, value);
    return (
      <input type="text" name={name} placeholder={name} value={value} onChange={e => setValue(e.target.value)} />
    )
  }
  
export default BasicInput