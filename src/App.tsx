import { useState } from 'react';
import './App.css';
import BasicInput from './components/BasicInput';

class FormGen {
  formElements: any = []; // TODO: Make a FormElement interface.

  generate() {
    return () => {
      const [state, setState] = useState<any>({});

      function updateField(field: string, value: any){
        state[field] = value;
        console.log(state);
        setState(state);
      }
      console.log(state);

      return (
        <>
          { 
            this.formElements.map((field: any) => {
              const Component = field.component
              const props = {
                name: field.name,
                state,
                updateField
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
