import { useState } from "react"

function BasicInput({ name, state, setState }: any) {

  function updateField(field: string, value: any) {
    state[field] = value;
    console.log(state);
    setState(state);
  }

    return (
      <input type="text" name={name} placeholder={name} value={state[name]} onChange={e => updateField(name, e.target.value)} />
    )
  }
  
export default BasicInput
