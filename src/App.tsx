import { useState } from 'react';
import {FormComponent, formAction, formConfig} from './form_config';

function App() {
  const [currentPage, setCurrentPage] = useState('user_info');

  return (
    <div className="App">
      <FormComponent/>
      <button onClick={() => handleNavButtons('previous', setCurrentPage)} disabled={!formConfig.pages[currentPage].previous} >Back</button>
      <button onClick={() => handleNavButtons('next', setCurrentPage)} disabled={!formConfig.pages[currentPage].next} >Next</button>
    </div>
  )
}

function handleNavButtons(action: string, setCurrentPage: any) {
  const formState = formAction(action);
  setCurrentPage(formState.currentPage);
}

export default App;
