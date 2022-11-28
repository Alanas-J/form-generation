import { useState } from 'react';
import {formConfig} from './form_config';
const {FormComponent, formAction} = formConfig.generate();

formConfig.events.onSubmit = (formValues) => {
  console.log('Form Submitted', formValues);
  formAction('test');
}

function App() {
  const [currentPage, setCurrentPage] = useState('user_info');

  return (
    <div className="App">
      <FormComponent/>
      <button onClick={() => handleNavButtons('previous', setCurrentPage)} disabled={!formConfig.pages[currentPage].previous} >Back</button>
      <button onClick={() => handleNavButtons(formConfig.pages[currentPage].submit ? 'submit' : 'next', setCurrentPage)} disabled={!formConfig.pages[currentPage].next && !formConfig.pages[currentPage].submit} >{formConfig.pages[currentPage].submit ? 'Submit' : 'Next'}</button>
    </div>
  )
}
export default App;

function handleNavButtons(action: string, setCurrentPage:  React.Dispatch<React.SetStateAction<string>>) {
  const formState = formAction(action);
  if(formState) setCurrentPage(formState.currentPage);
}

