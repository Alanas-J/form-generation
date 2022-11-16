import { useState } from 'react';
import './App.css';
import BasicInput from './components/BasicInput';

class FormGen {
  components: Array<JSX.Element> = [];
  formElements: any = []; // TODO: Make a FormElement interface.

  generate(){
    const [state, setState] = useState({});

    function updateFormField(fieldname: string){
      
    }

    console.log(state);

    return () => (
    <div>
      { 
        this.formElements.map((field: any) => {
          const component = {...this.components.find(component => component.type.name == field.component)};
          component.props = { name: field.name };
          component.key = field.name;

          return component;
        })
      }
    </div>
    )
  }
}

const formGen = new FormGen()
formGen.components = [<BasicInput/>];
formGen.formElements = [
  { name: 'test_field', component: 'BasicInput' },
  { name: 'test_field2', component: 'BasicInput' }
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
