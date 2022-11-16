import { useState } from "react"

function BasicInput({ name, state, updateField }: any) {
    return (
      <input type="text" name={name} placeholder={name} value={state[name]} onChange={e => updateField(name, e.target.value)} />
    )
  }
  
export default BasicInput