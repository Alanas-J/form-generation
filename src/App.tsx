import { useState } from 'react';
import './App.css';
import BasicInput from './components/BasicInput';

class FormGen {
  formElements: any = []; // TODO: Make a FormElement interface.
  // onSubmit, onStep event listeners in the future.

  generate() {
    return () => {
      const [state, setState] = useState<any>({});
      console.log(state);

      return (
        <>
          { 
            this.formElements.map((field: any) => {
              const Component = field.component
              const props = {
                name: field.name,
                state,
                setState
              }
              return (<Component key={field.name} {...props}/>);
            })
          }
        </>
      );
    }
  }
}

const formGen = new FormGen()
formGen.formElements = [
  { name: 'test_field', component: BasicInput },
  { name: 'test_field2', component: BasicInput }
];

function App() {


  const FormComponent = formGen.generate();

  return (
    <div className="App">
      <h1>Header</h1>
        <FormComponent/>
      <h1>Footer</h1>
    </div>
  )
}

export default App
