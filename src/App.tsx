import './App.css';
import BasicInput from './components/BasicInput';
import { isMandatory } from './components/validations';
import FormGenerator from './form-generation/FormGenerator';

const formGen = new FormGenerator();

formGen.sections = {
  userInfo: {
    next: 'additionalDetails',
    elements: [
      { 
        name: 'name',
        group: 'details',  
        component: BasicInput,
        additionalProps: { label: 'Name', placeholder: 'Enter your name...' },
        validations: [
          isMandatory('Please provide your name.')
        ]
      },
      { 
        name: 'test_field2', 
        component: BasicInput,
        additionalProps: { label: 'Test Field', placeholder: 'Text goes here...' },
      },
      { 
        name: 'test_field3', 
        group: 'details',
        component: BasicInput,
        additionalProps: { label: 'Test Field', placeholder: 'Text goes here...' }
      },
    ]
  },
  additionalDetails: {
    previous: 'userInfo',
    elements: [
      { name: 'test_field4',
       component: BasicInput,
       additionalProps: { label: 'Test Field', placeholder: 'Text goes here...' } 
      },
    ]
  }  
};
formGen.startOn = 'userInfo';

formGen.onStep = (formState: any) => {
  console.log(`Stepped to ${formState._section}`, formState);
}


const { FormComponent, formAction } = formGen.generate();

function App() {

  return (
    <div className="App">
      <h1>Header</h1>
        <FormComponent/>
        <button onClick={() => formAction('previous')}>Back</button>
        <button onClick={() => formAction('next')}>Next</button>
      <h1>Footer</h1>
      
    </div>
  )
}

export default App
