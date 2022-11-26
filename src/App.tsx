import {FormComponent, formAction} from './form_config';

function App() {

  return (
    <div className="App">
      <FormComponent/>
      <button onClick={() => formAction('previous')}>Back</button>
      <button onClick={() => formAction('next')}>Next</button>
    </div>
  )
}

export default App;
